<template>
  <div class="grid grid-cols-[500px,1fr] h-[calc(100vh-72px)]">
    <EpiSuggestionDrawer class="z-10 max-h-[calc(100vh-72px)]" />

    <!-- Loader Div -->
    <div
      v-if="mapIsLoading"
      class="h-full relative flex items-center justify-center"
    >
      <i class="animate-spin text-4xl text-secondary-700 fas fa-spinner"></i>
    </div>

    <!-- Map Div -->
    <div
      v-show="!mapIsLoading"
      class="h-[calc(100vh-72px)]"
    >
      <MapBox :is-loading="mapIsLoading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MapBox from '~/components/navigations/MapBox.vue'
import EpiSuggestionDrawer from '~/components/navigations/EpiSuggestionDrawer/EpiSuggestionDrawer.vue'

// Référence pour l'état de chargement de la carte
const mapIsLoading = ref(true)

// Simuler la fin de chargement
setTimeout(() => {
  mapIsLoading.value = false
}, 2000) // Supposer que la carte finit de charger après 2 secondes
</script>
