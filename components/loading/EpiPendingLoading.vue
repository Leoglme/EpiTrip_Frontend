<template>
  <div
    id="planning-page-loading"
    class="h-full w-full flex flex-col justify-center items-center text-base-800"
  >
    <div
      class="radial-progress relative inline-grid place-content-center rounded-full bg-transparent align-middle box-content text-secondary-700 text-center"
      :style="{
        '--value': dataLoaderStore.currentFetchCompletion,
        '--size': '12rem',
        '--thickness': '2rem',
      }"
    >
      <span class="text-center text-black"> {{ dataLoaderStore.currentFetchCompletion }}% </span>
    </div>
    <div class="mt-8">
      <p class="text-center text-black">Chargement des données en cours...</p>
      <p class="text-center">{{ dataLoaderStore.currentFetchType }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDataLoaderStore } from '~/stores/dataLoader.store'

/* STORE */
const dataLoaderStore = useDataLoaderStore()
</script>

<style scoped>
.radial-progress {
  height: var(--size);
  width: var(--size);
  --value: 0;
  --size: 5rem;
  --thickness: calc(var(--size) / 10);
}

.radial-progress::before {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background:
    radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness) var(--thickness) no-repeat,
    conic-gradient(currentColor calc(var(--value) * 1%), #0000 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(99% - var(--thickness)), #000 calc(100% - var(--thickness)));
  mask: radial-gradient(farthest-side, #0000 calc(99% - var(--thickness)), #000 calc(100% - var(--thickness)));
  position: absolute;
  border-radius: 9999px;
  content: '';
}

.radial-progress::after {
  inset: calc(50% - var(--thickness) / 2);
  transform: rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%));
  background-color: currentColor;
  position: absolute;
  border-radius: 9999px;
  content: '';
}
</style>
