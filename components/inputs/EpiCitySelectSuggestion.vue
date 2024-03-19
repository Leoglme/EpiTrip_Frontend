<template>
  <EpiSelectSuggestion
    :search-term="searchTerm"
    :items="cities"
    :search-keys="['name']"
    :label-keys="['name']"
    :icon="props.icon"
    hide-add-element
    :placeholder="props.placeholder"
    @update:search-term="updateSearchTerm"
    @item-selected="handleItemSelected"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import EpiSelectSuggestion from '@/components/inputs/EpiSelectSuggestion.vue'

// Typage pour une ville
interface City {
  id: number
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

/* DATAS */
// Liste simulée des villes
const cities: City[] = [
  { id: 1, name: 'Paris' },
  { id: 2, name: 'Lyon' },
  { id: 3, name: 'Marseille' },
]

/* REFS */
// Référence pour searchTerm
const searchTerm: Ref<string> = ref('')

/* METHODS */
// Fonction pour mettre à jour searchTerm
const updateSearchTerm = (value: string) => {
  searchTerm.value = value
}

// Fonction pour gérer la sélection d'un item
const handleItemSelected = (city: City) => {
  console.log('Ville sélectionnée:', city)
  updateSearchTerm(city.name)
}
</script>
