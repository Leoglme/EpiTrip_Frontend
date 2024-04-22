<template>
  <div class="px-4 py-4 bg-gray-50 h-full overflow-auto">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Mon Roadtrip</h2>
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="32.000000pt"
      height="40.000000pt"
      viewBox="0 0 32.000000 40.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
        stroke="none"
        fill="#4163F9"
      >
        <path
          d="M93 380 c-83 -37 -105 -126 -59 -227 29 -61 101 -143 126 -143 25 0 97 82 126 143 30 65 31 130 4 175 -22 35 -88 72 -130 72 -14 0 -44 -9 -67 -20z m67 -73 c14 0 35 4 47 8 22 7 22 6 12 -25 -8 -22 -9 -42 -2 -64 l10 -32 -67 0 -67 0 10 32 c7 22 6 42 -2 64 -10 31 -10 32 12 25 12 -4 33 -8 47 -8z"
        />
      </g>
    </svg>
    <div
      v-if="roadTripSteps.length > 0"
      class="space-y-4"
    >
      <div
        v-for="(step, index) in roadTripSteps"
        :key="index"
        class="bg-white rounded-lg border border-gray-200 shadow-sm"
      >
        <div class="grid grid-cols-[140px,1fr,auto] items-center">
          <img
            v-if="step.image"
            :src="step.image"
            alt=""
            class="object-cover w-full h-[100px] rounded-l-lg"
          />
          <div
            v-else
            class="bg-gray-200 h-[100px] w-full rounded-l-lg flex items-center justify-center"
          >
            <span class="text-sm text-gray-500">Pas d'image</span>
          </div>
          <div class="px-4 py-2">
            <h3 class="text-md font-medium text-gray-900">{{ step.name }}</h3>
            <p class="text-sm text-gray-500">{{ step.type }}</p>
          </div>
          <div class="flex flex-col gap-2 p-4">
            <button class="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-2 text-sm">
              Voir sur la carte
            </button>
            <button class="text-gray-800 border border-gray-300 hover:bg-gray-100 rounded-md px-3 py-2 text-sm">
              Retirer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="text-center py-10"
    >
      <h3 class="text-gray-900 font-medium">Votre roadtrip est vide</h3>
      <p class="text-gray-500">Ajoutez des lieux pour commencer votre aventure !</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const roadTripSteps = ref([
  {
    name: 'La Bella Napoli',
    type: 'Restaurant',
    image: 'https://via.placeholder.com/140',
  },
  {
    name: 'Musée du Louvre',
    type: 'Musée',
    image: null,
  },
  {
    name: 'Hôtel du Nord',
    type: 'Hôtel',
    image: 'https://via.placeholder.com/140',
  },
])
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire */
</style>
