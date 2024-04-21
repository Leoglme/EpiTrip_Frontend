<template>
  <div
    v-if="transports"
    class="grid gap-4 px-2 py-4"
  >
    <EpiTransportsCard :transport-options="transports" />
  </div>
  <div
    v-else
    class="grid gap-4 px-2 py-4"
  >
    <p>Aucun transport trouvé</p>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import type { TransportOptions } from '~/core/types/google-directions'
import EpiTransportsCard from '~/components/navigations/EpiSuggestionDrawer/Cards/EpiTransportsCard.vue'

/* STORES */
const googlePlaceStore = useGoogleApiStore()

/* REFS */
const transports: Ref<TransportOptions | null> = ref(googlePlaceStore.transports)
</script>
