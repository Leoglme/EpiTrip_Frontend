<template>
  <aside class="text-gray-800 h-full w-full top-0 left-0 overflow-auto bg-gray-50 flex flex-col">
    <!-- HEADER -->
    <EpiTabPlace />
    <!-- TABS   -->
    <RestaurantsStep v-if="suggestionStore.activeTabId === 1" />
    <BarsStep v-if="suggestionStore.activeTabId === 2" />
    <HotelsStep v-if="suggestionStore.activeTabId === 3" />
    <EventsStep v-if="suggestionStore.activeTabId === 4" />
    <TransportsStep v-if="suggestionStore.activeTabId === 5" />
    <RoadTripStep v-if="suggestionStore.activeTabId === 6" />
  </aside>
</template>

<script lang="ts" setup>
import EpiTabPlace from '~/components/navigations/EpiSuggestionDrawer/Tabs/EpiTabPlace.vue'
import RestaurantsStep from '~/components/navigations/EpiSuggestionDrawer/Steps/RestaurantsStep.vue'
import BarsStep from '~/components/navigations/EpiSuggestionDrawer/Steps/BarsStep.vue'
import HotelsStep from '~/components/navigations/EpiSuggestionDrawer/Steps/HotelsStep.vue'
import EventsStep from '~/components/navigations/EpiSuggestionDrawer/Steps/EventsStep.vue'
import TransportsStep from '~/components/navigations/EpiSuggestionDrawer/Steps/TransportsStep.vue'
import RoadTripStep from '~/components/navigations/EpiSuggestionDrawer/Steps/RoadTripStep.vue'
import { useSuggestionStore } from '~/stores/suggestion.store'

/* STORES */
const suggestionStore = useSuggestionStore()
</script>
