<template>
  <div class="px-2 py-4">
    <span class="text-sm font-medium text-gray-800">
      <b>{{ hotels.length }}</b> hotels trouvés
    </span>
    <div class="flex items-start gap-2 my-4">
      <!-- SEARCH BAR   -->
      <EpiInput
        class="flex-1"
        :value="search"
        name="search"
        type="search"
        placeholder="Rechercher un hotel"
        @update:value="searchHotels($event)"
      />
      <!-- REFRESH BUTTON -->
      <EpiButton
        button-type="fill"
        class="w-[50px] h-[50px] rounded-md"
        title="Rafraîchir les hotels"
        @click="refreshHotels"
      >
        <i class="fa-solid fa-arrows-rotate"></i>
      </EpiButton>
    </div>

    <div
      v-if="hotels.length > 0 && !suggestionStore.isRefreshing"
      class="grid gap-4"
    >
      <EpiPlaceCard
        v-for="(hotel, i) in hotels"
        :key="`hotel-${i}`"
        :place="hotel"
        @view-on-map="onViewOnMap($event)"
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
import type { GoogleHotel } from '~/core/types/google-places'
import EpiPlaceCard from '~/components/navigations/EpiSuggestionDrawer/Cards/EpiPlaceCard.vue'
import { useSuggestionStore } from '~/stores/suggestion.store'
import { useGoogleApiStore } from '~/stores/googleApi.store'
import { useRouterStore } from '~/stores/router.store'
import EpiInput from '~/components/inputs/EpiInput.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'

/* STORES */
const googlePlaceStore = useGoogleApiStore()
const suggestionStore = useSuggestionStore()
const routerStore = useRouterStore()

/* REFS */
const hotels: Ref<GoogleHotel[]> = ref(googlePlaceStore.hotels)
const search: Ref<string> = ref('')

/* METHODS */
const onViewOnMap = (event: GoogleHotel) => {
  suggestionStore.setSelectedCoordinates(event.location)
}

const searchHotels = (searchValue: string) => {
  search.value = searchValue
  hotels.value = googlePlaceStore.hotels.filter((event) =>
    event.name.toLowerCase().includes(search.value.toLowerCase()),
  )
}

const refreshHotels = async () => {
  if (routerStore.startCoordinates && routerStore.endCoordinates) {
    suggestionStore.setIsRefreshing(true)
    search.value = ''
    await googlePlaceStore.fetchBars(routerStore.startCoordinates, routerStore.endCoordinates)
    hotels.value = googlePlaceStore.hotels
    suggestionStore.setIsRefreshing(false)
  }
}
</script>
