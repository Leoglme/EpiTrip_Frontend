<template>
  <Body class="bg-slate-100">
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
  </Body>
</template>
<script setup lang="ts">
import EpiNavbar from '~/components/navigations/EpiNavbar.vue'
import LoginModal from '~/components/modals/LoginModal.vue'
import RegisterModal from '~/components/modals/RegisterModal.vue'

import 'notyf/notyf.min.css'

/* PROPS */
const showLoginModal = ref(false)
const showRegisterModal = ref(false)

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
