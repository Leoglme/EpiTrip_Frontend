import CookieService from '~/core/services/CookieService'
import { useAuthStore } from '~/stores/auth.store'

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()
  const user: string | undefined = CookieService.getCookie('user')
  const authToken: string | undefined = CookieService.getCookie('authToken')

  authStore.setUser(user ? JSON.parse(user) : undefined)
  authStore.setAuthToken(authToken)

  if (authStore.authToken && !authStore.isConnected) {
    await authStore.fetchUser()
  } else {
    console.log('You are connected')
  }
})
