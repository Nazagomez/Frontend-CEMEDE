export type UserRole = 'investigador' | 'administrador' | 'asistente'

export interface AuthUserRaw {
  id: number
  nombre: string
  email: string
  rol: UserRole
  activo: boolean
  debe_cambiar_password: boolean
  permisos: string[]
}

export interface AuthUser {
  id: number
  nombre: string
  email: string
  rol: UserRole
  activo: boolean
  debeCambiarPassword: boolean
  permisos: string[]
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponseRaw {
  access_token: string
  token_type: string
  usuario: AuthUserRaw
}

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  cambiarPasswordForzado: (passwordNueva: string) => Promise<void>
}