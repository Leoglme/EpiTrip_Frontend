<template>
  <div class="p-4 text-black">
    <EpiLogo
      :width="40"
      :height="40"
    />
    <EpiLogo large />
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
  </div>
</template>

<script lang="ts" setup>
import EpiLogo from '~/components/ui/EpiLogo.vue'
/* META */
useHead({
  title: 'Bienvenue',
})
</script>
