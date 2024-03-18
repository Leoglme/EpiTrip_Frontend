<template>
  <div class="p-4 min-h-screen bg-[#FFE9D3] text-gray-700 py-16">
    <div class="absolute left-0 right-0 top-0 z-0 h-[80vh] w-full mix-blend-multiply">
      <img
        class="w-full h-full object-cover opacity-[0.05]"
        src="/images/t2.jpg"
        alt=""
      />
    </div>

    <EpiNavbar />
    <div class="z-2 relative mb-32">
      <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 tracking-tighter">
        Turn your road trip
        <br />
        into an
        <span class="underline-yellow">adventure</span>.
      </h1>

      <EpiButton
        button-type="fill"
        icon="fa-solid fa-car"
        icon-position="left"
      >
        Start Trip
      </EpiButton>

      <EpiButton
        button-type="outline"
        icon="fa-solid fa-car"
        icon-position="left"
      >
        Start Trip
      </EpiButton>
    </div>

    <div class="flex justify-center items-start z-2 relative">
      <div class="flex md:grid grid-cols-3 lg:grid-cols-4 gap-6 items-start max-w-6xl overflow-x-scroll">
        <EpiRoadTripCard
          v-for="n in 14"
          :key="n"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EpiNavbar from '~/components/navigations/EpiNavbar.vue'
/* META */
import EpiRoadTripCard from '~/components/cards/EpiRoadTripCard.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'

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
