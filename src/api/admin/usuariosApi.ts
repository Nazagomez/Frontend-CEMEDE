import { httpClient } from '@/api/httpClient'
import type { UsuarioRaw, UsuarioCreatePayload } from '@/types/Admin/usuarios'

export async function fetchUsuarios(): Promise<UsuarioRaw[]> {
  const { data } = await httpClient.get<UsuarioRaw[]>('/usuarios')
  return data
}

export async function postUsuario(payload: UsuarioCreatePayload): Promise<UsuarioRaw> {
  const { data } = await httpClient.post<UsuarioRaw>('/usuarios', payload)
  return data
}

export async function putUsuarioActivo(id: number): Promise<UsuarioRaw> {
  const { data } = await httpClient.put<UsuarioRaw>(`/usuarios/${id}/activo`)
  return data
}

export async function putUsuarioRol(id: number, rol: string): Promise<UsuarioRaw> {
  const { data } = await httpClient.put<UsuarioRaw>(`/usuarios/${id}/rol`, { rol })
  return data
}

export async function putUsuarioPassword(id: number, password: string): Promise<UsuarioRaw> {
  const { data } = await httpClient.put<UsuarioRaw>(`/usuarios/${id}/password`, { password })
  return data
}