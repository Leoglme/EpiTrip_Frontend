<template>
  <div class="px-2 py-4">
    <span class="text-sm font-medium text-gray-800">
      <b>{{ events.length }}</b> événements trouvés
    </span>
    <div class="flex items-start gap-2 my-4">
      <!-- SEARCH BAR   -->
      <EpiInput
        class="flex-1"
        :value="search"
        name="search"
        type="search"
        placeholder="Rechercher un événement"
        @update:value="searchEvents($event)"
      />
      <!-- REFRESH BUTTON -->
      <EpiButton
        button-type="fill"
        class="w-[50px] h-[50px] rounded-md"
        title="Rafraîchir les événements"
        @click="refreshEvents"
      >
        <i class="fa-solid fa-arrows-rotate"></i>
      </EpiButton>
    </div>

    <div
      v-if="events.length > 0 && !suggestionStore.isRefreshing"
      class="grid gap-4"
    >
      <EpiPlaceCard
        v-for="(event, i) in events"
        :key="`event-${i}`"
        :place="event"
        :is-added-to-road-trip="roadtripStore.isStepAdded(event)"
        @view-on-map="onViewOnMap($event)"
        @add-to-road-trip="onAddToRoadTrip($event)"
        @remove-from-road-trip="onRemoveFromRoadTrip($event)"
      />
    </div>

    <div
      v-if="suggestionStore.isRefreshing"
      class="h-full relative flex items-center justify-center"
    >
      <i class="animate-spin text-4xl text-secondary-700 fas fa-spinner"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type { GoogleEvent } from '~/core/types/google-places'
import EpiPlaceCard from '~/components/navigations/EpiSuggestionDrawer/Cards/EpiPlaceCard.vue'
import { useSuggestionStore } from '~/stores/suggestion.store'
import { useGoogleApiStore } from '~/stores/googleApi.store'
import { useRouterStore } from '~/stores/router.store'
import EpiInput from '~/components/inputs/EpiInput.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'
import { useRoadtripStore } from '~/stores/roadtrip.store'

/* STORES */
const googlePlaceStore = useGoogleApiStore()
const suggestionStore = useSuggestionStore()
const routerStore = useRouterStore()
const roadtripStore = useRoadtripStore()

/* REFS */
const events: Ref<GoogleEvent[]> = ref(googlePlaceStore.events)
const search: Ref<string> = ref('')

/* METHODS */
const onViewOnMap = (event: GoogleEvent) => {
  suggestionStore.setSelectedCoordinates(event.location)
}

const onAddToRoadTrip = (event: GoogleEvent) => {
  roadtripStore.addStep(event)
}

const onRemoveFromRoadTrip = (event: GoogleEvent) => {
  roadtripStore.removeStep(event)
}

const searchEvents = (searchValue: string) => {
  search.value = searchValue
  events.value = googlePlaceStore.events.filter((event) =>
    event.name.toLowerCase().includes(search.value.toLowerCase()),
  )
}

const refreshEvents = async () => {
  if (routerStore.startCoordinates && routerStore.endCoordinates) {
    suggestionStore.setIsRefreshing(true)
    search.value = ''
    await googlePlaceStore.fetchEvents(routerStore.startCoordinates, routerStore.endCoordinates)
    events.value = googlePlaceStore.events
    suggestionStore.setIsRefreshing(false)
  }
}
</script>
