<template>
  <div class="flex items-center gap-2">
    <div class="flex items-center gap-1">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 32.000000 40.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
          stroke="none"
          fill="#4163F9"
        >
          <path
            d="M93 380 c-83 -37 -105 -126 -59 -227 29 -61 101 -143 126 -143 25 0 97 82 126 143 30 65 31 130 4 175 -22 35 -88 72 -130 72 -14 0 -44 -9 -67 -20z m67 -73 c14 0 35 4 47 8 22 7 22 6 12 -25 -8 -22 -9 -42 -2 -64 l10 -32 -67 0 -67 0 10 32 c7 22 6 42 -2 64 -10 31 -10 32 12 25 12 -4 33 -8 47 -8z"
          />
        </g>
      </svg>

      <div class="flex items center gap-2">
        <span class="font-medium"> Étape {{ props.stepIndex + 1 }} </span>
      </div>
    </div>

    <!-- NUMBER OF ÉTAPE / NAME OF PLACE / DISTANCE / TEMPS TRAJET VOITURE   -->
    <div class="flex items-center justify-between mt-4">
      <div>
        <div
          v-if="props.distance"
          class="flex items-center gap-2"
        >
          <i class="fas fa-route"></i>
          <span class="text-gray-500">{{ props.distance }}</span>
        </div>

        <div
          v-if="props.duration"
          class="flex items-center gap-2"
        >
          <i class="fas fa-car"></i>
          <span class="text-gray-500">{{ props.duration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { GoogleEvent } from '~/core/types/google-places'
/* PROPS */
const props = defineProps({
  stepIndex: {
    type: Number as PropType<number>,
    required: true,
  },
  place: {
    type: Object as PropType<GoogleEvent>,
    required: true,
  },
  distance: {
    type: String as PropType<string>,
    default: '',
  },
  duration: {
    type: String as PropType<string>,
    default: '',
  },
})
</script>
