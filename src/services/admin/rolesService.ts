import { fetchPermisosCatalogo, fetchRoles, putRolPermisos } from '@/api/admin/rolesApi'
import type { PermisoCatalogo, RolPermisos } from '@/types/Admin/roles'

export async function getPermisosCatalogo(): Promise<PermisoCatalogo[]> {
  return fetchPermisosCatalogo()
}

export async function getRoles(): Promise<RolPermisos[]> {
  return fetchRoles()
}

export async function actualizarPermisosRol(rol: string, permisos: string[]): Promise<RolPermisos> {
  return putRolPermisos(rol, permisos)
}