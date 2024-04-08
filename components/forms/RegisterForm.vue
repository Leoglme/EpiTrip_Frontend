<template>
  <div class="relative flex flex-col items-center justify-center">
    <Logo class="mb-6" />
    <h2 class="mb-10 text-2xl font-bold text-gray-800">Inscription</h2>
    <VeeForm
      v-slot="{ meta }"
      class="w-full max-w-md grid gap-4"
      @submit="handleRegister"
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
        v-model:value="credentials.username"
        name="username"
        type="username"
        label="Nom d'utilisateur"
        placeholder="Choisissez un nom d'utilisateur"
        rules="required"
      />

      <EpiInput
        v-model:value="credentials.password"
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="Entrez votre mot de passe"
        rules="required|min:6"
      />

      <EpiInput
        v-model:value="credentials.passwordConfirmation"
        name="confirm_password"
        type="password"
        label="Confirmer le mot de passe"
        placeholder="Confirmez votre mot de passe"
        rules="required|min:6|confirmed:password"
      />

      <EpiButton
        :disabled="!meta.valid || buttonIsLoading"
        :icon="buttonIsLoading ? 'fa-spinner fa-spin' : ''"
        class="w-full"
        type="submit"
      >
        S'inscrire
      </EpiButton>
    </VeeForm>
    <p class="mt-8 text-sm">
      Vous avez déjà un compte ?
      <NuxtLink
        class="font-bold text-secondary-600 hover:text-secondary-500 hover:underline cursor-pointer"
        @click.stop="emit('click:login')"
      >
        Connectez-vous
      </NuxtLink>
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

type RegisterCredentials = {
  email: string
  username: string
  password: string
  passwordConfirmation: string
}

/* EMITS */
const emit = defineEmits<{
  'click:login': []
  ok: []
}>()

/* REFS */
const buttonIsLoading: Ref<boolean> = ref(false)
const credentials: Ref<RegisterCredentials> = ref({
  email: '',
  username: '',
  password: '',
  passwordConfirmation: '',
})

/* METHODS */
const resetCredentials = () => {
  credentials.value = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  }
}

const handleRegister = async () => {
  buttonIsLoading.value = true
  try {
    await useAuthStore().signUp(credentials.value)
    resetCredentials()
    emit('ok')
  } catch (e) {
    console.log(e)
  }
  buttonIsLoading.value = false
}
</script>
