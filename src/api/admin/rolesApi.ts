import { httpClient } from '@/api/httpClient'
import type { PermisoCatalogo, RolPermisos } from '@/types/Admin/roles'

export async function fetchPermisosCatalogo(): Promise<PermisoCatalogo[]> {
  const { data } = await httpClient.get<PermisoCatalogo[]>('/roles/permisos')
  return data
}

export async function fetchRoles(): Promise<RolPermisos[]> {
  const { data } = await httpClient.get<RolPermisos[]>('/roles')
  return data
}

export async function putRolPermisos(rol: string, permisos: string[]): Promise<RolPermisos> {
  const { data } = await httpClient.put<RolPermisos>(`/roles/${rol}/permisos`, { permisos })
  return data
}