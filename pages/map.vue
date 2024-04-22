<template>
  <div>
    <button
      class="z-[10000] absolute top-4 left-4 w-8 h-8 text-white bg-green-700 rounded-full shadow-lg focus:outline-none md:hidden flex items-center justify-center"
      @click="isDrawerOpen = !isDrawerOpen"
    >
      <i :class="isDrawerOpen ? 'fas fa-map' : 'fas fa-list'"></i>
    </button>

    <button
      v-if="!useAuthStore().isConnected"
      class="z-[10000] absolute top-4 right-4 w-8 h-8 text-white bg-green-700 rounded-full shadow-lg focus:outline-none md:hidden flex items-center justify-center"
      @click="showLoginModal = !showLoginModal"
    >
      <i class="fas fa-user"></i>
    </button>

    <LoginModal
      :show="showLoginModal"
      @click:register="openRegisterModal"
      @update:show="showLoginModal = $event"
    />
    <RegisterModal
      :show="showRegisterModal"
      @click:login="openLoginModal"
      @update:show="showRegisterModal = $event"
    />

    <div class="relative md:grid md:grid-cols-[500px,1fr] h-[calc(100vh-72px)]">
      <div
        v-if="mapIsLoading"
        class="absolute inset-0 z-20 flex items-center justify-center"
      >
        <i class="animate-spin text-4xl text-secondary-700 fas fa-spinner"></i>
      </div>

      <!-- EpiSuggestionDrawer -->
      <EpiSuggestionDrawer
        class="z-30 absolute inset-x-0 top-0 transform md:relative md:transform-none h-full overflow-auto"
        :open-suggest-drawer="isDrawerOpen"
        @remove-drawer="isDrawerOpen = false"
      />

      <!-- Map Div -->
      <div
        v-show="!mapIsLoading"
        class="absolute inset-0 md:relative"
      >
        <MapBox :is-loading="mapIsLoading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MapBox from '~/components/navigations/MapBox.vue'
import EpiSuggestionDrawer from '~/components/navigations/EpiSuggestionDrawer/EpiSuggestionDrawer.vue'
import { useAuthStore } from '~/stores/auth.store'
import LoginModal from '~/components/modals/LoginModal.vue'
import RegisterModal from '~/components/modals/RegisterModal.vue'

// Référence pour l'état de chargement de la carte
const mapIsLoading = ref(true)
const isDrawerOpen = ref(false)
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

const openLoginModal = () => {
  showRegisterModal.value = false
  showLoginModal.value = true
}

const openRegisterModal = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

// Simuler la fin de chargement
setTimeout(() => {
  mapIsLoading.value = false
}, 2000)
</script>
