<template>
  <div class="min-h-screen bg-[#FFE9D3] text-gray-700 pb-16">
    <div class="absolute left-0 right-0 top-0 z-0 h-screen w-full mix-blend-multiply">
      <img
        class="w-full h-full object-cover opacity-[0.1]"
        src="/images/t2.jpg"
        alt=""
      />
    </div>

    <EpiNavbar />

    <div class="p-4">
      <section class="z-2 relative h-[80vh] flex flex-col justify-center gap-12">
        <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-tighter">
          Turn your road trip
          <br />
          into an
          <span class="underline-yellow">adventure</span>.
        </h1>

        <div class="w-full flex justify-center items-center">
          <div class="group bg-white px-5 py-8 shadow-lg rounded-lg flex w-full text-gray-700 min-w-[280px] max-w-3xl">
            <div class="flex flex-col md:flex-row items-center gap-4 w-full">
              <EpiCitySelectSuggestion
                icon="fa-flag"
                class="w-full"
                placeholder="Where are you starting?"
              />
              <EpiCitySelectSuggestion
                icon="fa-flag-checkered"
                class="w-full"
                placeholder="Where are you going?"
              />
              <EpiButton
                class="w-full md:w-fit"
                icon="fa-magnifying-glass"
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
import EpiNavbar from '~/components/navigations/EpiNavbar.vue'
/* META */
import EpiRoadTripCard from '~/components/cards/EpiRoadTripCard.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'
import EpiCitySelectSuggestion from '~/components/inputs/EpiCitySelectSuggestion.vue'

useHead({
  title: 'Bienvenue',
})
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
