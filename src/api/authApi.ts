import { httpClient } from '@/api/httpClient'
import type { AuthUser, LoginCredentials, LoginResponse } from '@/types/auth'

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await httpClient.post<LoginResponse>('/auth/login', credentials)
  return data
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const { data } = await httpClient.get<AuthUser>('/auth/me')
  return data
}