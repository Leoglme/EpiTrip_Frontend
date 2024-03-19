<template>
  <div class="relative flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl">
    <button
      class="absolute top-0 right-0 mt-4 mr-4"
      @click="closeForm"
    >
      <svg
        class="w-6 h-6 text-gray-800"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <Logo class="mb-12" />
    <h2 class="mb-10 text-2xl font-bold text-gray-800">Connexion</h2>
    <VeeForm
      class="w-full max-w-sm"
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
        href="/register"
        class="font-bold text-secondary-300 hover:text-secondary-400 hover:underline"
        >Inscrivez-vous</a
      >
    </p>
  </div>
</template>

<script>
import { Form as VeeForm, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import Logo from '@/components/ui/EpiLogo.vue'
import EpiInput from '~/components/inputs/EpiInput.vue'
import EpiButton from '~/components/buttons/EpiButton.vue'

export default {
  components: {
    EpiButton,
    EpiInput,
    VeeForm,
    Logo,
  },
  setup() {
    defineRule('required', required)
    defineRule('email', email)
    defineRule('min', min)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `Le champ ${ctx.field} est obligatoire.`,
          email: 'Veuillez entrer une adresse email valide.',
          min: `Le champ ${ctx.field} doit contenir au moins ${ctx.rule.params.length} caractères.`,
        }
        return messages[ctx.rule.name] ?? `Le champ ${ctx.field} est invalide.`
      },
      validateOnInput: true,
    })
  },
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    handleLogin() {
      console.log('Tentative de connexion avec:', this.credentials)
    },
    closeForm() {
      console.log('Fermeture du formulaire de connexion')
    },
  },
}
</script>
