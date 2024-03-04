module.exports = {
  plugins: [require('tailwindcss-debug-screens')],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: 'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    },
    screens: {
      xs: '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '70rem',
        '2xl': '70rem',
      },
    },
    extend: {
      colors: {
        primary: {
          400: '#0077B6',
        },
        secondary: {
          400: '#2d6a4f',
        },
        slate: {
          100: '#F5F8FF',
        },
        black: '#131A20',
      },
      spacing: {},
    },
  },
}
