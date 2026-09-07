import type { UserRole } from '@/types/auth'

/**
 * Matriz de acceso por rol:
 * - Dashboard, Visitantes, Eventos, Notificaciones: acceso completo para ambos roles.
 * - Playas: administrador gestiona (crear/editar/dar de baja), investigador solo ve.
 * - Capacidad de Carga: administrador ve y recalcula/edita parámetros, investigador solo ve.
 * - ML (futuro): administrador ve y entrena/configura, investigador solo ve.
 * - Usuarios (futuro): solo administrador tiene acceso.
 */

export function esAdministrador(rol: UserRole): boolean {
  return rol === 'administrador'
}

export function puedeGestionarPlayas(rol: UserRole): boolean {
  return esAdministrador(rol)
}

export function puedeGestionarCapacidad(rol: UserRole): boolean {
  return esAdministrador(rol)
}

export function puedeGestionarML(rol: UserRole): boolean {
  return esAdministrador(rol)
}

export function puedeAccederUsuarios(rol: UserRole): boolean {
  return esAdministrador(rol)
}

/** Etiqueta visible en pantalla. El valor guardado en BD/enum sigue siendo 'investigador'. */
export const ROL_LABEL: Record<UserRole, string> = {
  administrador: 'Administrador',
  investigador: 'Asistente Investigador',
}