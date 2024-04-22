<template>
  <NuxtLink
    v-if="props.startCoords && props.endCoords"
    :to="{
      name: 'map',
      query: {
        start: `${props.startCoords.latitude},${props.startCoords.longitude}`,
        end: `${props.endCoords.latitude},${props.endCoords.longitude}`,
      },
    }"
    class="group bg-white hover:bg-secondary-600 hover:text-white flex items-center group-hover:bg-secondary-600 group-hover:text-white justify-center gap-2 rounded-full border border-secondary-600 text-secondary-600 py-1.5 px-2 text-[14px] font-medium transition-all duration-300 ease-in-out cursor-pointer"
  >
    <i
      class="fa-solid fa-car group-hover:animate-car text-base text-secondary-600 hover:text-white group-hover:text-white"
    />
    Découvrir
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Coordinates } from '~/core/types/roadtrip'

/* PROPS */
const props = defineProps({
  startCoords: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
  endCoords: {
    type: Object as PropType<Coordinates>,
    required: true,
  },
})
</script>
