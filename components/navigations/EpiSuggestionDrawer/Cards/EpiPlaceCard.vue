<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-lg w-full h-[150px] grid grid-cols-[140px,1fr]">
    <img
      v-if="props.place.image"
      class="rounded-l-lg object-cover w-full h-full max-h-[148px]"
      :src="props.place.image"
      :alt="props.place.name"
    />
    <div
      v-else
      class="bg-gray-200 rounded-l-lg flex items-center justify-center"
    />
    <div class="grid grid-cols-[1fr,auto]">
      <div class="px-4 py-3">
        <h5 class="text-gray-900 text-md font-medium mb-2 line-clamp-2">
          {{ props.place.name }}
        </h5>

        <div
          v-if="props.place.rating || props.place.numberOfRatings"
          class="flex items-center mb-3"
        >
          <span
            v-if="props.place.rating"
            class="text-green-700 font-semibold text-xs"
          >
            {{ props.place.rating }}/5
          </span>

          <span
            v-if="props.place.numberOfRatings"
            class="text-gray-500 text-xs ml-2"
          >
            ({{ props.place.numberOfRatings }} avis)
          </span>
        </div>

        <OpeningHoursMenu
          v-if="props.place.openingHours"
          :opening-hours="props.place.openingHours"
        />

        <div
          v-if="props.place.telephone"
          class="text-gray-800 text-xs"
        >
          {{ props.place.telephone }}
        </div>
      </div>

      <!-- Actions Buttons -->
      <div class="flex flex-col justify-center gap-3 items-center border-l px-3">
        <EpiButton
          class="w-10 h-10"
          title="Voir sur la carte"
          @click="() => emit('view-on-map', props.place)"
        >
          <i class="fas fa-map-marker-alt"></i>
        </EpiButton>

        <EpiButton
          v-if="!isAddedToRoadTrip"
          button-type="outline"
          class="w-10 h-10"
          title="Ajouter au road trip"
          @click="() => emit('add-to-road-trip', props.place)"
        >
          <i class="fas fa-plus"></i>
        </EpiButton>

        <EpiButton
          v-else
          variant="red"
          button-type="fill"
          class="w-10 h-10"
          title="Retirer du road trip"
          @click="() => emit('remove-from-road-trip', props.place)"
        >
          <i class="fas fa-minus"></i>
        </EpiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import EpiButton from '~/components/buttons/EpiButton.vue'
import type { GooglePlace } from '~/core/types/google-places'
import OpeningHoursMenu from '~/components/menus/OpeningHoursMenu.vue'

/* PROPS */
const props = defineProps({
  place: {
    type: Object as PropType<GooglePlace>,
    required: true,
  },
  isAddedToRoadTrip: {
    type: Boolean,
    default: false,
  },
})

/* EMITS */
const emit = defineEmits<{
  'add-to-road-trip': [GooglePlace]
  'view-on-map': [GooglePlace]
  'remove-from-road-trip': [GooglePlace]
}>()
</script>

<style>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
