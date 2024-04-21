<template>
  <div class="relative mb-1">
    <div
      class="text-xs flex items-center cursor-pointer gap-1 select-none"
      @click.stop="toggleOpen"
    >
      <p
        class="font-medium"
        :class="{
          'text-red-600': !openingHoursFormat.openNow,
          'text-green-700': openingHoursFormat.openNow,
        }"
      >
        {{ openingHoursFormat.openNow ? 'Ouvert' : 'Fermé' }}
      </p>

      <span class="text-lg">⋅</span>

      <p>
        {{ openingHoursFormat.openNow ? 'Ferme' : 'Ouvre' }} {{ !findNextOpeningClosingTimeContainDay ? 'à' : null }}
        {{ findNextOpeningClosingTime }}
      </p>
    </div>

    <!--  MENU  -->
    <div
      v-if="isOpen"
      ref="menuRef"
      class="px-3 py-3 shadow-lg border rounded-lg absolute bg-white z-40"
    >
      <div class="grid gap-3">
        <div
          v-for="day in formattedOpeningHours"
          :key="day.name"
          class="grid grid-cols-2"
        >
          <p class="text-xs font-medium capitalize">
            {{ day.name }}
          </p>
          <p class="text-xs text-gray-600">{{ day.value || 'Fermé' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref, PropType, ComputedRef } from 'vue'
import type { GooglePeriod, RegularOpeningHours } from '~/core/types/google-details'

type GooglePeriodFormat = {
  day: number
  hour: number
  minute: number
}

interface RegularOpeningHoursFormat {
  openNow: boolean
  periods: {
    close?: GooglePeriodFormat
    open?: GooglePeriodFormat
  }[]
}

/* PROPS */
const props = defineProps({
  openingHours: {
    type: Object as PropType<RegularOpeningHours>,
    required: true,
  },
})

/* REFS */
const isOpen: Ref<boolean> = ref(false)
const menuRef = ref<HTMLElement | null>(null)

/* DATA */
const weekDays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const today = new Date()
const todayDayIndex = today.getDay() // Day of the week (0 = Sunday, 1 = Monday, etc.)

/* COMPUTED */
// Transform RegularOpeningHours to RegularOpeningHoursFormat
const openingHoursFormat: ComputedRef<RegularOpeningHoursFormat> = computed(() => {
  const formatted: RegularOpeningHoursFormat = {
    openNow: props.openingHours.open_now,
    periods: props.openingHours.periods.map((period) => ({
      open: period.open ? formatPeriod(period.open) : undefined,
      close: period.close ? formatPeriod(period.close) : undefined,
    })),
  }
  return formatted
})

// Calculation of the next opening or closing time
const findNextOpeningClosingTime: ComputedRef<string | null> = computed(() => {
  // Chercher les périodes pour aujourd'hui
  const todayPeriods = openingHoursFormat.value.periods.find((period) => period.open?.day === todayDayIndex)

  // If no schedule for today, search for the next open day
  if (!todayPeriods || !todayPeriods.open || !todayPeriods.close) {
    const futurePeriods = openingHoursFormat.value.periods.find(
      (period) => period.open && period.open.day > todayDayIndex,
    )
    if (!futurePeriods || !futurePeriods.open) return null // No other open days found
    return `${weekDays[futurePeriods.open.day]} à ${formatHour(futurePeriods.open.hour, futurePeriods.open.minute)}`
  }

  const now = today.getHours() * 60 + today.getMinutes() // Current time in minutes since midnight
  if (openingHoursFormat.value.openNow) {
    // Find closing time if open
    const closeMinutes = todayPeriods.close.hour * 60 + todayPeriods.close.minute
    if (closeMinutes > now) return formatHour(todayPeriods.close.hour, todayPeriods.close.minute)
  } else {
    // Find opening time if closed
    const openMinutes = todayPeriods.open.hour * 60 + todayPeriods.open.minute
    if (openMinutes > now) return formatHour(todayPeriods.open.hour, todayPeriods.open.minute)
  }
  return null
})

const findNextOpeningClosingTimeContainDay: ComputedRef<boolean> = computed(() => {
  return findNextOpeningClosingTime.value !== null && findNextOpeningClosingTime.value.includes('à')
})

const formattedOpeningHours: ComputedRef<{ name: string; value: string | null }[]> = computed(() => {
  const schedules: { [key: number]: string[] } = {}

  // Collecting schedules for each day
  openingHoursFormat.value.periods.forEach((period) => {
    if (period.open && period.close && period.open.day !== undefined) {
      const openDay = period.open.day
      const openTime = formatTime(period.open.hour, period.open.minute)
      let closeTime = formatTime(period.close.hour, period.close.minute)

      // Check if closing time is the next day
      if (period.close.hour < period.open.hour) {
        closeTime = `${closeTime} (+1)`
      }

      if (!schedules[openDay]) {
        schedules[openDay] = []
      }

      schedules[openDay].push(`${openTime}–${closeTime}`)
    }
  })

  // Building the final result
  return weekDays.map((name, index) => {
    const schedule = schedules[index]
    return {
      name,
      value: schedule ? schedule.join(', ') : null,
    }
  })
})

/* METHODS */
function formatPeriod(period: GooglePeriod): GooglePeriodFormat {
  const hour = parseInt(period.time.substring(0, 2))
  const minute = parseInt(period.time.substring(2, 4))
  return {
    day: period.day,
    hour,
    minute,
  }
}

// Close the menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (isOpen.value && menuRef.value && !menuRef.value.contains(event.target as Node)) {
    console.log('click outside')
    isOpen.value = false
  }
}

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const formatHour = (hour: number, minute: number) => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

// Function to format time in HH:MM format
const formatTime = (hour: number, minute: number): string => {
  if (hour >= 24) {
    hour -= 24 // Adjust hour if it goes into the next day
  }
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

/* LIFECYCLE */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
