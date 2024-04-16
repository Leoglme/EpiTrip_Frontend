<template>
  <EpiSelectSuggestion
    v-model:searchTerm="searchTerm"
    :items="places"
    :enabled-filter-by-search-text="false"
    :search-keys="['name']"
    :label-keys="['name']"
    :icon="props.icon"
    hide-add-element
    :placeholder="props.placeholder"
    @item-selected="handleItemSelected"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import EpiSelectSuggestion from '@/components/inputs/EpiSelectSuggestion.vue'
import { useMapboxStore } from '~/stores/mapbox.store'
import type { MapboxPlace } from '~/core/types/mapbox'

// Typage pour une ville
interface Place {
  id: string
  name: string
}

/* PROPS */
const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
  icon: {
    type: String,
    required: false,
    default: 'fa-magnifying-glass',
  },
})

/* REFS */
// Référence pour searchTerm
const searchTerm: Ref<string> = ref('')
const mapboxStore = useMapboxStore()

// Watch for changes in searchTerm and trigger Mapbox search
watch(searchTerm, async (newValue: string) => {
  if (newValue.length > 0) {
    await mapboxStore.searchPlaces(newValue)
  }
})

/* COMPUTED */
// Convert MapboxPlace to Place to be compatible with EpiSelectSuggestion
const places = computed(() => {
  return mapboxStore.places.map((place) => ({
    id: place.id,
    name: place.placeName,
  }))
})

/* EMITS */
const emit = defineEmits<{
  onMapboxSelected: [MapboxPlace | undefined]
}>()

/* METHODS */
// Fonction pour mettre à jour searchTerm
const updateSearchTerm = (value: string) => {
  searchTerm.value = value
}

// Fonction pour gérer la sélection d'un item
const handleItemSelected = (place: Place) => {
  updateSearchTerm(place.name)
  const mapboxPlace: MapboxPlace | undefined = mapboxStore.places.find((p) => p.id === place.id)
  emit('onMapboxSelected', mapboxPlace)
}
</script>
