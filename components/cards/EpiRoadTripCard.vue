<template>
  <div
    v-if="props.roadtrip && props.roadtrip.startLocation && props.roadtrip.endLocation"
    class="group bg-white px-4 py-3 shadow-lg rounded-lg flex w-full text-gray-700 h-full max-w-xs cursor-pointer"
  >
    <div class="flex flex-col grow">
      <!--   IMAGE AND PLACEHOLDER   -->
      <div class="bg-gray-400 w-full overflow-hidden relative h-52">
        <img
          v-if="props.roadtrip.endLocation.imageUrl"
          class="absolute w-full h-full object-cover transition-all duration-300 ease-in-out top-0 left-0 scale-100 hover:scale-110 hover:top-[4px] hover:left-[4px] group-hover:scale-110 group-hover:top-[4px] group-hover:left-[4px]"
          :src="props.roadtrip.endLocation.imageUrl"
          :alt="props.roadtrip.endLocation.name"
        />
      </div>

      <div class="flex-1">
        <!--   TITLE   -->
        <h3 class="text-base font-semibold mb-1.5 mt-3.5 text-center">
          {{ props.roadtrip.startLocation.name }} - {{ props.roadtrip.endLocation.name }}
        </h3>
      </div>

      <EpiCarButton
        v-if="startCoords && endCoords"
        :start-coords="startCoords"
        :end-coords="endCoords"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, ComputedRef } from 'vue'
import EpiCarButton from '~/components/buttons/EpiCarButton.vue'
import type { Roadtrip } from '~/core/types/roadtrip'
import type { Coordinates } from '~/core/types/roadtrip'

/* PROPS */
const props = defineProps({
  roadtrip: {
    type: Object as PropType<Roadtrip>,
    required: true,
  },
})

/* COMPUTED */
const startCoords: ComputedRef<Coordinates | null> = computed(() => {
  if (!props.roadtrip || !props.roadtrip.startLocation) return null
  return {
    latitude: props.roadtrip.startLocation.latitude,
    longitude: props.roadtrip.startLocation.longitude,
  }
})

const endCoords: ComputedRef<Coordinates | null> = computed(() => {
  if (!props.roadtrip || !props.roadtrip.endLocation) return null
  return {
    latitude: props.roadtrip.endLocation.latitude,
    longitude: props.roadtrip.endLocation.longitude,
  }
})
</script>
