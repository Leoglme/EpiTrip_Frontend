type TokenResponse = {
  type: 'bearer'
  name: null | string
  token: string
  abilities: string[]
  lastUsedAt: null | string
  expiresAt: string
}

type User = {
  id: number
  username: string
  email: string
}

type SignInPayload = {
  email: string
  password: string
}

type SignUpPayload = {
  email: string
  username: string
  password: string
}

export type { TokenResponse, SignInPayload, SignUpPayload, User }
