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
    <h2 class="mb-10 text-2xl font-bold text-gray-800">Inscription</h2>
    <form
      class="w-full max-w-sm"
      @submit.prevent="handleRegister"
    >
      <div class="mb-8">
        <label
          class="block mb-2 text-sm font-bold text-gray-800"
          for="email"
        >
          Adresse mail
        </label>
        <input
          id="email"
          v-model="credentials.email"
          class="w-full px-4 py-3 mb-3 text-gray-700 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
          type="email"
          placeholder="Entrer votre adresse mail"
          required
        />
      </div>
      <div class="mb-8">
        <label
          class="block mb-2 text-sm font-bold text-gray-800"
          for="username"
        >
          Pseudo
        </label>
        <input
          id="username"
          v-model="credentials.username"
          class="w-full px-4 py-3 mb-3 text-gray-700 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
          type="text"
          placeholder="Choisir un pseudo"
          required
        />
      </div>
      <div class="mb-8">
        <label
          class="block mb-2 text-sm font-bold text-gray-800"
          for="password"
        >
          Mot de passe
        </label>
        <input
          id="password"
          v-model="credentials.password"
          class="w-full px-4 py-3 mb-3 text-gray-700 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
          type="password"
          placeholder="Créer un mot de passe"
          required
          minlength="6"
        />
      </div>
      <div class="mb-8">
        <label
          class="block mb-2 text-sm font-bold text-gray-800"
          for="passwordConfirmation"
        >
          Confirmer le mot de passe
        </label>
        <input
          id="passwordConfirmation"
          v-model="credentials.passwordConfirmation"
          class="w-full px-4 py-3 text-gray-700 bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
          type="password"
          placeholder="Confirmer votre mot de passe"
          required
          minlength="6"
        />
      </div>
      <button
        class="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        S'inscrire
      </button>
    </form>
    <p class="mt-8 text-sm">
      Vous avez déjà un compte ?
      <NuxtLink
        to="/login"
        class="font-bold text-blue-600 hover:text-blue-800 hover:underline"
      >
        Connectez-vous
      </NuxtLink>
    </p>
  </div>
</template>

<script>
import Logo from '@/components/ui/EpiLogo.vue'

export default {
  name: 'RegisterComponent',
  components: { Logo },
  data() {
    return {
      credentials: {
        email: '',
        username: '',
        password: '',
        passwordConfirmation: '',
      },
    }
  },
  methods: {
    handleRegister() {
      // Registration logic here
    },
    closeForm() {
      // Close form logic here
    },
  },
}
</script>
