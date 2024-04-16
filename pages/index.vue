<template>
  <div class="min-h-screen bg-[#FFE9D3] text-gray-700 pb-16">
    <div class="absolute left-0 right-0 top-0 z-0 h-screen w-full mix-blend-multiply">
      <img
        class="w-full h-full object-cover opacity-[0.1]"
        src="/images/t2.jpg"
        alt=""
      />
    </div>

    <div class="p-4">
      <section class="z-2 relative h-[80vh] flex flex-col justify-center gap-12">
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-tighter">
          Transformer votre voyage
          <br />
          en une
          <span class="underline-yellow">aventure</span>.
        </h1>

        <div class="w-full flex justify-center items-center">
          <div class="group bg-white px-5 py-8 shadow-lg rounded-lg flex w-full text-gray-700 min-w-[280px] max-w-3xl">
            <div class="flex flex-col md:flex-row items-center gap-4 w-full">
              <EpiCitySelectSuggestion
                icon="fa-flag"
                class="w-full"
                placeholder="Où commencez-vous ?"
                @on-mapbox-selected="setStartPlace($event)"
              />
              <EpiCitySelectSuggestion
                icon="fa-flag-checkered"
                class="w-full"
                placeholder="Où allez-vous ?"
                @on-mapbox-selected="setEndPlace($event)"
              />
              <EpiButton
                class="w-full md:w-fit"
                icon="fa-magnifying-glass"
                :disabled="!startMapboxPlace || !endMapboxPlace"
                @click="redirectToMap"
              >
                GO
              </EpiButton>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="flex justify-center items-start z-2 relative">
      <div
        class="flex md:grid grid-cols-3 overflow-x-scroll pb-24 md:overflow-x-hidden xl:grid-cols-4 gap-6 items-start max-w-6xl"
      >
        <EpiRoadTripCard
          v-for="n in 14"
          :key="n"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useRouter } from '#app'
import EpiRoadTripCard from '~/components/cards/EpiRoadTripCard.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'
import EpiCitySelectSuggestion from '~/components/inputs/EpiCitySelectSuggestion.vue'
import type { MapboxPlace } from '~/core/types/mapbox'

/* METAS */
useHead({
  title: 'Bienvenue',
})

/* HOOKS */
const router = useRouter()

/* REFS */
const startMapboxPlace: Ref<MapboxPlace | undefined> = ref(undefined)
const endMapboxPlace: Ref<MapboxPlace | undefined> = ref(undefined)

/* METHODS */
const setStartPlace = (place: MapboxPlace | undefined) => {
  startMapboxPlace.value = place
}

const setEndPlace = (place: MapboxPlace | undefined) => {
  endMapboxPlace.value = place
}

// redirect to /map?start=...&end=...
const redirectToMap = () => {
  if (!startMapboxPlace.value || !endMapboxPlace.value) return console.error('Missing start or end place')

  if (!startMapboxPlace.value || !endMapboxPlace.value) {
    return console.error('Missing start or end place')
  }

  const query = {
    start: `${startMapboxPlace.value.coordinates.latitude},${startMapboxPlace.value.coordinates.longitude}`,
    end: `${endMapboxPlace.value.coordinates.latitude},${endMapboxPlace.value.coordinates.longitude}`,
  }

  router.push({
    name: 'map',
    query,
  })
}
</script>

<style>
.underline-yellow {
  position: relative;
  display: inline-block;
  z-index: 1;
}

.underline-yellow::after {
  content: '';
  position: absolute;
  top: 100%;
  right: -2px;
  left: -2px;
  height: 10px;
  border-radius: 6.75px;
  margin-top: -6px;
  background-color: #ffd400;
  z-index: 0;
}
</style>
