<template>
  <aside
    :class="openConnectDrawer ? 'translate-x-0' : '-translate-x-full'"
    class="text-gray-800 h-full w-wull top-0 left-0 overflow-auto bg-gray-50 flex flex-col"
  >
    <div class="p-4 flex flex-col">
      <button
        class="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="onLogin"
      >
        Connexion
      </button>
    </div>
  </aside>
</template>
<script setup lang="ts">
defineProps({
  openConnectDrawer: Boolean,
})

const router = useRouter()
const onLogin = () => {
  router.push('/home')
}
</script>
