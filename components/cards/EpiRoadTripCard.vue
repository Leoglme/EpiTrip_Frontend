<template>
  <div
    class="group bg-white px-4 py-3 shadow-lg rounded-lg flex w-full text-gray-700 min-w-[280px] max-w-xs cursor-pointer"
  >
    <div class="flex flex-col grow">
      <!--   IMAGE AND PLACEHOLDER   -->
      <div class="bg-gray-400 w-full overflow-hidden relative h-52">
        <img
          v-if="image"
          class="absolute w-full h-full object-cover transition-all duration-300 ease-in-out top-0 left-0 scale-100 hover:scale-110 hover:top-[4px] hover:left-[4px] group-hover:scale-110 group-hover:top-[4px] group-hover:left-[4px]"
          :src="image"
          :alt="name"
        />
      </div>

      <!--   TITLE   -->
      <h3 class="text-base font-semibold mb-1.5 mt-3.5 text-center">
        {{ name }}
      </h3>
      <h4 class="mb-3 font-normal text-sm text-center">
        {{ location }}
      </h4>

      <EpiCarButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EpiCarButton from '~/components/buttons/EpiCarButton.vue'

const name = 'Mount Rushmore National Memorial'
const image = 'https://roadtrippers.com/wp-content/uploads/2019/04/2011-10-01-on-3-20-13-PM.CR2_.jpg'
const location = 'Keystone, South Dakota'
</script>
