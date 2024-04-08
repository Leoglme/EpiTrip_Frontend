<template>
  <div class="relative flex flex-col items-center justify-center">
    <Logo class="mb-6" />
    <h2 class="mb-10 text-2xl font-bold text-gray-800">Connexion</h2>
    <VeeForm
      v-slot="{ meta }"
      class="w-full max-w-md grid gap-4"
      @submit="handleLogin"
    >
      <EpiInput
        v-model:value="credentials.email"
        name="email"
        type="email"
        label="Email"
        placeholder="example@epitrip.com"
        rules="required|email"
      />

      <EpiInput
        v-model:value="credentials.password"
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        rules="required|min:6"
      />

      <EpiButton
        :disabled="!meta.valid || buttonIsLoading"
        :icon="buttonIsLoading ? 'fa-spinner fa-spin' : ''"
        class="w-full"
        type="submit"
      >
        Se connecter
      </EpiButton>
    </VeeForm>
    <p class="mt-8 text-sm">
      Vous n'avez pas de compte ?
      <a
        class="font-bold text-secondary-600 hover:text-secondary-500 hover:underline cursor-pointer"
        @click.stop="emit('click:register')"
      >
        Inscrivez-vous
      </a>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Form as VeeForm } from 'vee-validate'
import type { Ref } from 'vue'
import Logo from '@/components/ui/EpiLogo.vue'
import EpiInput from '~/components/inputs/EpiInput.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'
import { useAuthStore } from '~/stores/auth.store'

type LoginCredentials = {
  email: string
  password: string
}

/* REFS */
const buttonIsLoading: Ref<boolean> = ref(false)
const credentials: Ref<LoginCredentials> = ref({
  email: '',
  password: '',
})

/* EMITS */
const emit = defineEmits<{
  'click:register': []
  ok: []
}>()

/* METHODS */
const resetCredentials = () => {
  credentials.value = {
    email: '',
    password: '',
  }
}
const handleLogin = async () => {
  buttonIsLoading.value = true
  try {
    await useAuthStore().signIn(credentials.value)
    resetCredentials()
    emit('ok')
  } catch (e) {
    console.log(e)
  }
  buttonIsLoading.value = false
}
</script>
