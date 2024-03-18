<template>
  <div class="p-4 text-black min-h-screen bg-[#FFE9D3] py-16">
    <div class="absolute left-0 right-0 top-0 z-0 h-[80vh] w-full mix-blend-multiply">
      <img
        class="w-full h-full object-cover opacity-[0.05]"
        src="/images/t2.jpg"
        alt=""
      />
    </div>

    <EpiNavbar />
    <h1 class="text-3xl font-bold mb-4">Welcome</h1>
    <p class="mb-4">This is a simple example of a Nuxt page.</p>
    <p class="mb-4">This page is using the <code>useHead</code> composable to set the title of the page.</p>
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Click me
    </button>
    <UButton>Button</UButton>

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

useHead({
  title: 'Bienvenue',
})
</script>
