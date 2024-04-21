<template>
  <div class="grid grid-cols-3 bg-white py-0 sticky top-0 border-b z-50">
    <button
      v-for="category in suggestions"
      :key="category.name"
      :title="category.name"
      :class="{
        'bg-secondary-600 text-white': suggestionStore.activeTabId === category.id,
        'text-secondary-700 bg-gray-100 hover:bg-gray-200': suggestionStore.activeTabId !== category.id,
      }"
      class="w-full py-3 px-2 transition-colors duration-300 ease-in-out border-r border-b flex flex-wrap justify-center gap-2 items-center"
      @click="suggestionStore.setActiveTabId(category.id)"
    >
      <i
        class="text-md"
        :class="category.iconClass"
      ></i>
      <span class="font-medium text-md">
        {{ category.name }}
      </span>
    </button>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { useSuggestionStore } from '~/stores/suggestion.store'
import type { SuggestionTab } from '~/stores/suggestion.store'

/* STORES */
const suggestionStore = useSuggestionStore()
/* REFS */
const suggestions: Ref<SuggestionTab[]> = ref(suggestionStore.suggestions)
</script>
