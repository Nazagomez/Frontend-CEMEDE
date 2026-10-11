import axios from 'axios'
import { httpClient } from '@/api/httpClient'
import type { AuthUserRaw, LoginCredentials, LoginResponseRaw } from '@/types/auth'

const RECUPERACION_NO_DISPONIBLE = 'El servidor no tiene recuperación por correo. Pedile a un administrador que restablezca tu contraseña desde Usuarios.'
const RECUPERACION_FALLO = 'No se pudo enviar la solicitud. Intentá de nuevo o pedile a un administrador que restablezca tu contraseña.'

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponseRaw> {
  const { data } = await httpClient.post<LoginResponseRaw>('/auth/login', credentials)
  return data
}

export async function fetchCurrentUser(): Promise<AuthUserRaw> {
  const { data } = await httpClient.get<AuthUserRaw>('/auth/me')
  return data
}

export async function putCambiarPassword(passwordNueva: string): Promise<AuthUserRaw> {
  const { data } = await httpClient.put<AuthUserRaw>('/auth/password', { password_nueva: passwordNueva })
  return data
}

/** Asks the API to email password recovery instructions for the given account. */
export async function postRecuperarPassword(email: string): Promise<void> {
  try {
    await httpClient.post('/auth/recuperar-password', { email })
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && (error.response?.status === 404 || error.response?.status === 405)) {
      throw new Error(RECUPERACION_NO_DISPONIBLE)
    }
    throw new Error(RECUPERACION_FALLO)
  }
}