<template>
  <Body class="bg-slate-100">
    <div
      v-if="dataLoaderStore.fetchAppDataInProgress"
      class="flex justify-center items-center h-screen"
    >
      <EpiPendingLoading />
    </div>

    <div v-else>
      <EpiNavbar
        @click:login="openLoginModal"
        @click:register="openRegisterModal"
        @click:logout="logout"
      />
      <slot />

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
    </div>
  </Body>
</template>
<script setup lang="ts">
import type { ComputedRef } from 'vue'
import EpiNavbar from '~/components/navigations/EpiNavbar.vue'
import LoginModal from '~/components/modals/LoginModal.vue'
import RegisterModal from '~/components/modals/RegisterModal.vue'
import 'notyf/notyf.min.css'
import { useDataLoaderStore } from '~/stores/dataLoader.store'
import { useRouterStore } from '~/stores/router.store'
import EpiPendingLoading from '~/components/loading/EpiPendingLoading.vue'
import { useAuthStore, useRoute } from '#imports'

/* ROUTER */
const route = useRoute()

/* COMPUTED */
const currentRoutePath: ComputedRef<string> = computed((): string => route.path)

/* STORES */
const dataLoaderStore = useDataLoaderStore()
const routerStore = useRouterStore()

/* WATCHERS */
watch(
  currentRoutePath,
  async (newVal) => {
    console.log('WATCHER', {
      newVal,
    })
    if (newVal === '/map') {
      const startRouteQuery = route.query.start as string
      const endRouteQuery = route.query.end as string
      routerStore.setCoordinates(startRouteQuery, endRouteQuery)
      await dataLoaderStore.fetchData()
    }
  },
  { immediate: true },
)

/* PROPS */
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

onMounted(() => {
  if (!useAuthStore().isConnected) {
    openLoginModal()
  }
})

/* METHODS */
const openLoginModal = () => {
  showRegisterModal.value = false
  showLoginModal.value = true
}

const openRegisterModal = () => {
  showLoginModal.value = false
  showRegisterModal.value = true
}

const logout = () => {
  useAuthStore().signOut()
}
</script>
