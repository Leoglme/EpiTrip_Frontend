import BaseApiService from '@/core/services/BaseApiService'
import type { SignInPayload, TokenResponse, SignUpPayload, User } from '~/core/types/auth'
import type { ErrorResponse } from '~/core/types/response'

export default class AuthService extends BaseApiService {
  static async signIn(payload: SignInPayload): Promise<ErrorResponse | TokenResponse | undefined> {
    return await this.post('/auth/sign-in', payload)
  }

  static async signUp(payload: SignUpPayload): Promise<ErrorResponse | TokenResponse | undefined> {
    return await this.post('/auth/sign-up', payload)
  }

  static async getUser(): Promise<User> {
    return await this.get('/auth/user')
  }
}
