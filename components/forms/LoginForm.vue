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
      <div class="mb-8">
        <label
          class="block mb-2 text-sm font-bold text-gray-800"
          for="username"
          >Pseudo ou adresse mail</label
        >
        <Field
          v-model="credentials.username"
          name="username"
          type="text"
          class="w-full px-4 py-3 mb-3 text-gray-700 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
          placeholder="Entrer votre pseudo ou adresse mail"
          rules="required|email"
        />
        <ErrorMessage
          name="username"
          class="text-red-600"
        />
      </div>
      <div class="mb-8">
        <label
          class="block mb-2 text-sm font-bold text-gray-800"
          for="password"
          >Mot de passe</label
        >
        <Field
          v-model="credentials.password"
          name="password"
          type="password"
          class="w-full px-4 py-3 text-gray-700 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
          placeholder="Entrer votre mot de passe"
          rules="required|min:6"
        />
        <ErrorMessage
          name="password"
          class="text-red-600"
        />
        <a
          href="#"
          class="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >Mot de passe oublié?</a
        >
      </div>
      <button
        class="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Se connecter
      </button>
    </VeeForm>
    <p class="mt-8 text-sm">
      Vous n'avez pas de compte ?
      <a
        href="/register"
        class="font-bold text-blue-600 hover:text-blue-800 hover:underline"
        >Inscrivez-vous</a
      >
    </p>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import Logo from '@/components/ui/EpiLogo.vue'

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage,
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
