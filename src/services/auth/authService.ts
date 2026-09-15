import { loginRequest, fetchCurrentUser, putCambiarPassword } from '@/api/authApi'
import { getToken, setToken as persistToken, clearSession } from '@/api/tokenStorage'
import { isTokenValid } from '@/api/jwt'
import type { AuthUser, AuthUserRaw, LoginCredentials } from '@/types/auth'

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

function mapAuthUser(raw: AuthUserRaw): AuthUser {
  return {
    id: raw.id,
    nombre: raw.nombre,
    email: raw.email,
    rol: raw.rol,
    activo: raw.activo,
    debeCambiarPassword: raw.debe_cambiar_password,
    permisos: raw.permisos,
  }
}

export async function loginService(credentials: LoginCredentials): Promise<AuthUser> {
  const { access_token, usuario } = await loginRequest(credentials)
  persistToken(access_token)
  return mapAuthUser(usuario)
}

export async function restoreSessionService(): Promise<AuthUser | null> {
  const token = getToken()
  if (!token || !isTokenValid(token)) {
    clearSession()
    return null
  }
  try {
    const raw = await fetchCurrentUser()
    return mapAuthUser(raw)
  } catch {
    clearSession()
    return null
  }
}

export async function cambiarPasswordForzadoService(passwordNueva: string): Promise<AuthUser> {
  const raw = await putCambiarPassword(passwordNueva)
  return mapAuthUser(raw)
}

export function logoutService(): void {
  clearSession()
}