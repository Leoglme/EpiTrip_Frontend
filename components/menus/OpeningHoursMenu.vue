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
import type { ComputedRef, PropType, Ref } from 'vue'
import { ref } from 'vue'
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
const today = new Date()
const todayDayIndex = today.getDay() // Day of the week (0 = Sunday, 1 = Monday, etc.)

/* COMPUTED */
// array of week days, starting from today
const weekDays: ComputedRef<string[]> = computed(() => {
  // const todayIndex = today.getDay()
  // return [...days.slice(todayIndex), ...days.slice(0, todayIndex)
  return ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
})

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

const findNextOpeningClosingTime: ComputedRef<string | null> = computed(() => {
  // Chercher les périodes pour aujourd'hui
  const now = today.getHours() * 60 + today.getMinutes() // Current time in minutes since midnight
  let periodsToday = openingHoursFormat.value.periods.filter(
    (period) => period.open && period.open.day === todayDayIndex,
  )

  // Handle wrap-around closing time, assuming close can be undefined
  periodsToday = periodsToday.map((period) => {
    if (period.close && period.close.day !== todayDayIndex) {
      return {
        open: period.open,
        close: {
          day: todayDayIndex,
          hour: 24,
          minute: 0,
        },
      }
    }
    return period
  })

  // Sort periods to get the next relevant opening or closing time
  periodsToday.sort((a, b) => {
    const aTime = a.open ? a.open.hour * 60 + a.open.minute : 1440
    const bTime = b.open ? b.open.hour * 60 + b.open.minute : 1440
    return aTime - bTime
  })

  for (const period of periodsToday) {
    if (openingHoursFormat.value.openNow && period.close) {
      const closeMinutes = period.close.hour * 60 + period.close.minute
      if (closeMinutes > now) {
        return `${formatHour(period.close.hour, period.close.minute)}`
      }
    } else if (!openingHoursFormat.value.openNow && period.open) {
      const openMinutes = period.open.hour * 60 + period.open.minute
      if (openMinutes > now) {
        return `${formatHour(period.open.hour, period.open.minute)}`
      }
    }
  }

  // If no schedule for today or if no future open or close found for today, search for the next open day
  let minDay = 7
  let nextPeriod = null
  for (const period of openingHoursFormat.value.periods) {
    if (period.open && period.open.day > todayDayIndex && period.open.day < minDay) {
      minDay = period.open.day
      nextPeriod = period
    }
  }

  if (nextPeriod && nextPeriod.open) {
    return `${weekDays.value[nextPeriod.open.day]} à ${formatHour(nextPeriod.open.hour, nextPeriod.open.minute)}`
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
    if (period.open && period.close) {
      const openDay = period.open.day
      const openTime = formatTime(period.open.hour, period.open.minute)
      const closeTime = formatTime(period.close.hour, period.close.minute)

      if (!schedules[openDay]) {
        schedules[openDay] = []
      }
      schedules[openDay].push(`${openTime}–${closeTime}`)
    }
  })

  // Building the final result
  return weekDays.value.map((name, index) => {
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
  // Adjust hour if it is 24 to wrap around to 0
  if (hour === 24 && minute === 0) {
    hour = 0
  }
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

// Function to format time in HH:MM format
const formatTime = (hour: number, minute: number): string => {
  // Adjust hour if it goes into the next day
  const nextDayShift = hour >= 24
  if (nextDayShift) {
    hour -= 24
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
