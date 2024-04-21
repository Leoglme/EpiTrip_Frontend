<template>
  <div class="px-4 grid gap-8">
    <template v-for="(option, mode) in props.transportOptions">
      <div
        v-if="option"
        :key="mode"
      >
        <div class="grid items-center grid-cols-[40px,1fr]">
          <i
            :class="getIconClass(mode)"
            class="text-xl"
          ></i>
          <div>
            <h5 class="text-gray-900 text-sm font-medium capitalize">{{ translateMode(mode) }}</h5>
            <p class="text-gray-600 text-xs">
              {{ option.distance.text }} - {{ translateDuration(option.duration.text) }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { TransportOptions } from '~/core/types/google-directions'

/* PROPS */
const props = defineProps({
  transportOptions: {
    type: Object as PropType<TransportOptions>,
    required: true,
  },
})

/* FUNCTIONS */
const translateMode = (mode: string): string => {
  switch (mode) {
    case 'driving':
      return 'Voiture'
    case 'transit':
      return 'Transports en commun'
    case 'bicycling':
      return 'Vélo'
    case 'walking':
      return 'Marche'
    default:
      return 'Inconnu'
  }
}

// Formatting and translating durations
const translateDuration = (duration: string): string => {
  return duration
    .replace('hour', 'heure')
    .replace('hours', 'heures')
    .replace('day', 'jour')
    .replace('days', 'jours')
    .replace('min', 'minute')
    .replace('mins', 'minutes')
    .replace('sec', 'seconde')
    .replace('secs', 'secondes')
    .replace('week', 'semaine')
    .replace('weeks', 'semaines')
    .replace('months', 'mois')
    .replace('month', 'mois')
}

// Returns the appropriate icon class based on transport mode, including color
const getIconClass = (mode: string): string => {
  switch (mode) {
    case 'driving':
      return 'fas fa-car text-blue-500'
    case 'transit':
      return 'fas fa-subway text-red-500'
    case 'bicycling':
      return 'fas fa-bicycle text-green-500'
    case 'walking':
      return 'fas fa-walking text-yellow-500'
    default:
      return 'fas fa-question text-gray-500'
  }
}
</script>
