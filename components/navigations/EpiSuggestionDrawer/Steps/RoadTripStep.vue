<template>
  <div class="px-4 py-4 bg-gray-50 h-full overflow-auto">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Mon Roadtrip</h2>

    <div
      v-if="roadTripStore.orderedSteps.length > 0"
      class="grid gap-4"
    >
      <div
        v-for="(step, i) in roadTripStore.orderedSteps"
        :key="`step-${i}`"
        class="grid gap-3"
      >
        <RoadTripStepHeader
          v-if="step"
          :step-index="i"
          :place="step"
        />

        <EpiPlaceCard
          v-if="step"
          :place="step"
          :is-added-to-road-trip="roadTripStore.isStepAdded(step)"
          @view-on-map="onViewOnMap($event)"
          @add-to-road-trip="onAddToRoadTrip($event)"
          @remove-from-road-trip="onRemoveFromRoadTrip($event)"
        />
      </div>
    </div>
    <div
      v-else
      class="text-center py-10"
    >
      <h3 class="text-gray-900 font-medium">Votre roadtrip est vide</h3>
      <p class="text-gray-500">Ajoutez des lieux pour commencer votre aventure !</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EpiPlaceCard from '~/components/navigations/EpiSuggestionDrawer/Cards/EpiPlaceCard.vue'
import RoadTripStepHeader from '~/components/navigations/EpiSuggestionDrawer/Steps/Sections/RoadTripStepHeader.vue'
import type { GooglePlace } from '~/core/types/google-places'
import { useRoadtripStore } from '~/stores/roadtrip.store'
import { useSuggestionStore } from '~/stores/suggestion.store'
/* STORE */
const roadTripStore = useRoadtripStore()
const suggestionStore = useSuggestionStore()

/* METHODS */
const onViewOnMap = (step: GooglePlace) => {
  suggestionStore.setSelectedCoordinates(step.location)
}

const onAddToRoadTrip = (step: GooglePlace) => {
  roadTripStore.addStep(step)
}

const onRemoveFromRoadTrip = (step: GooglePlace) => {
  roadTripStore.removeStep(step)
}
</script>
