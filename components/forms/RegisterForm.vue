<template>
  <div class="relative flex flex-col items-center justify-center">
    <Logo class="mb-6" />
    <h2 class="mb-10 text-2xl font-bold text-gray-800">Inscription</h2>
    <VeeForm
      class="w-full max-w-md"
      @submit.prevent="handleRegister"
    >
      <EpiInput
        v-model:value="credentials.email"
        name="email"
        type="email"
        label="Adresse mail"
        placeholder="example@epitrip.com"
        rules="required|email"
        class="mb-8"
      />

      <EpiInput
        v-model:value="credentials.username"
        name="username"
        type="username"
        label="Nom d'utilisateur"
        placeholder="Choisir un nom d'utilisateur"
        rules="required"
        class="mb-8"
      />

      <EpiInput
        v-model:value="credentials.password"
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="Créer un mot de passe"
        rules="required|min:6"
        class="mb-8"
      />

      <EpiInput
        v-model:value="credentials.passwordConfirmation"
        name="confirm_password"
        type="password"
        label="Mot de passe"
        placeholder="Créer un mot de passe"
        rules="required|min:6|confirmed:password"
        class="mb-8"
      />

      <EpiButton
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
import Logo from '@/components/ui/EpiLogo.vue'
import EpiInput from '~/components/inputs/EpiInput.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'
/* EMITS */
const emit = defineEmits<{
  'click:login': []
}>()

/*  REACTIVE  */
const credentials = reactive({
  email: '',
  username: '',
  password: '',
  passwordConfirmation: '',
})

/* METHODS */
const handleRegister = () => {
  console.log("Tentative d'inscription avec:", credentials)
}
</script>
