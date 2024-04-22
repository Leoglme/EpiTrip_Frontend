<template>
  <div class="px-2 py-4">
    <span class="text-sm font-medium text-gray-800">
      <b>{{ restaurants.length }}</b> restaurants trouvés
    </span>
    <div class="flex items-start gap-2 my-4">
      <!-- SEARCH BAR   -->
      <EpiInput
        class="flex-1"
        :value="search"
        name="search"
        type="search"
        placeholder="Rechercher un restaurant"
        @update:value="searchRestaurants($event)"
      />
      <!-- REFRESH BUTTON -->
      <EpiButton
        button-type="fill"
        class="w-[50px] h-[50px] rounded-md"
        title="Rafraîchir les restaurants"
        @click="refreshRestaurants"
      >
        <i class="fa-solid fa-arrows-rotate"></i>
      </EpiButton>
    </div>

    <div
      v-if="restaurants.length > 0 && !suggestionStore.isRefreshing"
      class="grid gap-4"
    >
      <EpiPlaceCard
        v-for="(restaurant, i) in restaurants"
        :key="`restaurant-${i}`"
        :place="restaurant"
        :is-added-to-road-trip="roadtripStore.isStepAdded(restaurant)"
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
import { defineEmits } from 'vue'
import type { GoogleRestaurant } from '~/core/types/google-places'
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
const restaurants: Ref<GoogleRestaurant[]> = ref(googlePlaceStore.restaurants)
const search: Ref<string> = ref('')
const emits = defineEmits(['remove-drawer'])

/* METHODS */
const onViewOnMap = (restaurant: GoogleRestaurant) => {
  suggestionStore.setSelectedCoordinates(restaurant.location)
  emits('remove-drawer')
}

const onAddToRoadTrip = (restaurant: GoogleRestaurant) => {
  roadtripStore.addStep(restaurant)
}

const onRemoveFromRoadTrip = (restaurant: GoogleRestaurant) => {
  roadtripStore.removeStep(restaurant)
}

const searchRestaurants = (searchValue: string) => {
  search.value = searchValue
  restaurants.value = googlePlaceStore.restaurants.filter((event) =>
    event.name.toLowerCase().includes(search.value.toLowerCase()),
  )
}

const refreshRestaurants = async () => {
  if (routerStore.startCoordinates && routerStore.endCoordinates) {
    suggestionStore.setIsRefreshing(true)
    search.value = ''
    await googlePlaceStore.fetchRestaurants(routerStore.startCoordinates, routerStore.endCoordinates)
    restaurants.value = googlePlaceStore.restaurants
    suggestionStore.setIsRefreshing(false)
  }
}
</script>
