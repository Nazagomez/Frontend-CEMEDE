export type RolUsuario = 'administrador' | 'investigador' | 'asistente'

export interface UsuarioRaw {
  id: number
  nombre: string
  email: string
  rol: RolUsuario
  activo: boolean
  debe_cambiar_password: boolean
  mensaje?: string | null
}

export interface Usuario {
  id: number
  nombre: string
  email: string
  rol: RolUsuario
  activo: boolean
  debeCambiarPassword: boolean
}

export interface UsuarioCreatePayload {
  nombre: string
  email: string
  rol: RolUsuario
}

export interface UsuarioCreateResultado extends Usuario {
  mensaje: string | null
}