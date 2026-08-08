import { loginRequest, fetchCurrentUser } from '@/api/authApi'
import { getToken, setToken as persistToken, clearSession } from '@/api/tokenStorage'
import { isTokenValid } from '@/api/jwt'
import type { AuthUser, LoginCredentials } from '@/types/auth'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 6

export interface LoginFieldErrors {
  email?: string
  password?: string
}

export function validateLoginCredentials(email: string, password: string): LoginFieldErrors {
  const errors: LoginFieldErrors = {}

  if (!email.trim()) {
    errors.email = 'El correo es obligatorio.'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Ingresá un correo válido.'
  }

  if (!password) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`
  }

  return errors
}

export async function loginService(credentials: LoginCredentials): Promise<AuthUser> {
  const { access_token, usuario } = await loginRequest(credentials)
  persistToken(access_token)
  return usuario
}

export async function restoreSessionService(): Promise<AuthUser | null> {
  const token = getToken()
  if (!token || !isTokenValid(token)) {
    clearSession()
    return null
  }
  try {
    return await fetchCurrentUser()
  } catch {
    clearSession()
    return null
  }
}

export function logoutService(): void {
  clearSession()
}