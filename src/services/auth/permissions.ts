import type { UserRole } from '@/types/auth'

/** Etiqueta visible en pantalla para cada rol fijo del sistema. */
export const ROL_LABEL: Record<UserRole, string> = {
  administrador: 'Administrador',
  investigador: 'Investigador',
  asistente: 'Asistente',
}

/** Chequea si el usuario actual tiene un permiso configurable puntual. */
export function tienePermiso(permisos: string[], clave: string): boolean {
  return permisos.includes(clave)
}