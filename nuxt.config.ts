// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          charset: 'utf-8',
        },
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/dcc05147de.js',
        },
      ],
      noscript: [],
      link: [],
    },
  },
  ssr: true,
  devtools: { enabled: true },
  components: true,
  modules: ['nuxt-simple-sitemap', 'nuxt-simple-robots', '@nuxtjs/google-fonts', '@nuxt/ui'],
  sitemap: {},
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
})
