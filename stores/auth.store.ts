import { defineStore } from 'pinia'
import type { SignInPayload, TokenResponse, SignUpPayload, User } from '~/core/types/auth'
import type { ErrorResponse } from '~/core/types/response'
import { useAppStore } from '@/stores/app.store'
import CookieService from '@/core/services/CookieService'
import AuthService from '~/core/services/AuthService'
import { useNotyfStore } from '~/stores/notyf.store'

const user: string | undefined = CookieService.getCookie('user')
const authToken: string | undefined = CookieService.getCookie('authToken')

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: (user ? JSON.parse(user) : undefined) as User | undefined,
    authToken: authToken as string | undefined,
  }),
  actions: {
    setUser(user: User | undefined): void {
      console.log('SET USER', user)
      if (user) {
        CookieService.setCookie('user', JSON.stringify(user))
        this.user = user
      } else {
        CookieService.deleteCookie('user')
        this.user = undefined
      }
    },
    setAuthToken(token: string | undefined): void {
      console.log('set Auth token', token)
      if (token) {
        CookieService.setCookie('authToken', token)
      } else {
        CookieService.deleteCookie('authToken')
      }

      this.authToken = token
    },
    /* API */
    async signIn(payload: SignInPayload): Promise<TokenResponse | null> {
      try {
        return await useAppStore().execWithPending<TokenResponse>(async (): Promise<TokenResponse> => {
          const result: ErrorResponse | TokenResponse | undefined = await AuthService.signIn(payload)

          if (result && 'token' in result) {
            console.log('RESULT LOGIN', result)
            this.setAuthToken(result.token)
            await this.fetchUser()
            useNotyfStore().success('Successful sign in !')
            return result
          } else {
            throw result
          }
        })
      } catch (e) {
        useNotyfStore().responseError(e as ErrorResponse, 'Failed to sign in')
        throw e
      }
    },
    async signUp(payload: SignUpPayload): Promise<TokenResponse | null> {
      try {
        return await useAppStore().execWithPending<TokenResponse>(async (): Promise<TokenResponse> => {
          const result: ErrorResponse | TokenResponse | undefined = await AuthService.signUp(payload)

          if (result && 'token' in result) {
            this.setAuthToken(result.token)
            await this.fetchUser()
            useNotyfStore().success('Successful registration !')
            return result
          } else {
            throw result
          }
        })
      } catch (e) {
        useNotyfStore().responseError(e as ErrorResponse, 'Failed to sign up')
        throw e
      }
    },
    async fetchUser(): Promise<User | null> {
      console.log('fetchUser', this.authToken)
      if (!this.authToken) return null
      try {
        return await useAppStore().execWithPending<User>(async (): Promise<User> => {
          const result: User = await AuthService.getUser()
          this.setUser(result)
          return result
        })
      } catch (e) {
        this.setAuthToken(undefined)
        this.setUser(undefined)
        console.error(e)
        return null
      }
    },
    signOut(): void {
      this.setAuthToken(undefined)
      this.setUser(undefined)
    },
  },
  getters: {
    isConnected(): boolean {
      return !!this.authToken && !!this.user
    },
    userFullName(): User | undefined {
      return this.user
    },
  },
})
