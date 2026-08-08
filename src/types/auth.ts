export type UserRole = 'investigador' | 'administrador'

export interface AuthUser {
  id: number
  nombre: string
  email: string
  rol: UserRole
  activo: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  usuario: AuthUser
}

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}