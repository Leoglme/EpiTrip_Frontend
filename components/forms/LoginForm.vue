<template>
  <div class="relative flex flex-col items-center justify-center">
    <Logo class="mb-6" />
    <h2 class="mb-10 text-2xl font-bold text-gray-800">Connexion</h2>
    <VeeForm
      class="w-full max-w-md"
      @submit.prevent="handleLogin"
    >
      <EpiInput
        v-model:value="credentials.username"
        name="username"
        type="text"
        label="Pseudo ou adresse mail"
        placeholder="Entrer votre pseudo ou adresse mail"
        rules="required|email"
        class="mb-8"
      />

      <EpiInput
        v-model:value="credentials.password"
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="Entrer votre mot de passe"
        rules="required|min:6"
        class="mb-8"
      />

      <EpiButton
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
        >Inscrivez-vous</a
      >
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
  'click:register': []
}>()

/*  REACTIVE  */
const credentials = reactive({
  username: '',
  password: '',
})

/* METHODS */
const handleLogin = () => {
  console.log('Tentative de connexion avec:', credentials)
}
</script>
