export interface NotificacionRaw {
  id: number
  evento_id: number | null
  playa_id: number
  playa_nombre: string
  titulo: string
  mensaje: string
  leida: boolean
  created_at: string
}

export interface Notificacion {
  id: number
  eventoId: number | null
  playaId: number
  playaNombre: string
  titulo: string
  mensaje: string
  leida: boolean
  createdAt: string
}

export type NotificacionesFiltroLeida = 'todas' | 'no_leidas' | 'leidas'