import { httpClient } from '@/api/httpClient'
import type { AuthUserRaw, LoginCredentials, LoginResponseRaw } from '@/types/auth'

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