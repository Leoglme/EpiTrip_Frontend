<template>
  <div class="px-2 py-4">
    <span class="text-sm font-medium text-gray-800">
      <b>{{ bars.length }}</b> bars trouvés
    </span>
    <div class="flex items-start gap-2 my-4">
      <!-- SEARCH BAR   -->
      <EpiInput
        class="flex-1"
        :value="search"
        name="search"
        type="search"
        placeholder="Rechercher un bar"
        @update:value="searchBars($event)"
      />
      <!-- REFRESH BUTTON -->
      <EpiButton
        button-type="fill"
        class="w-[50px] h-[50px] rounded-md"
        title="Rafraîchir les bars"
        @click="refreshBars"
      >
        <i class="fa-solid fa-arrows-rotate"></i>
      </EpiButton>
    </div>

    <div
      v-if="bars.length > 0 && !suggestionStore.isRefreshing"
      class="grid gap-4"
    >
      <EpiPlaceCard
        v-for="(bar, i) in bars"
        :key="`bar-${i}`"
        :place="bar"
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
import type { GoogleBar } from '~/core/types/google-places'
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
const bars: Ref<GoogleBar[]> = ref(googlePlaceStore.bars)
const search: Ref<string> = ref('')

/* METHODS */
const onViewOnMap = (event: GoogleBar) => {
  suggestionStore.setSelectedCoordinates(event.location)
}

const searchBars = (searchValue: string) => {
  search.value = searchValue
  bars.value = googlePlaceStore.bars.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()))
}

const refreshBars = async () => {
  if (routerStore.startCoordinates && routerStore.endCoordinates) {
    suggestionStore.setIsRefreshing(true)
    search.value = ''
    await googlePlaceStore.fetchBars(routerStore.startCoordinates, routerStore.endCoordinates)
    bars.value = googlePlaceStore.bars
    suggestionStore.setIsRefreshing(false)
  }
}
</script>
