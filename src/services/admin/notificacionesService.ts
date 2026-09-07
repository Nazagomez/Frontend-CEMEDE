import { fetchNotificaciones, putNotificacionLeida, putTodasNotificacionesLeidas } from '@/api/admin/notificacionesApi'
import type { Notificacion, NotificacionRaw } from '@/types/Admin/notificaciones'

function mapNotificacion(raw: NotificacionRaw): Notificacion {
  return {
    id: raw.id,
    eventoId: raw.evento_id,
    playaId: raw.playa_id,
    playaNombre: raw.playa_nombre,
    titulo: raw.titulo,
    mensaje: raw.mensaje,
    leida: raw.leida,
    createdAt: raw.created_at,
  }
}

export async function getNotificaciones(leida?: boolean, playaId?: number): Promise<Notificacion[]> {
  const raw = await fetchNotificaciones(leida, playaId)
  return raw.map(mapNotificacion)
}

export async function marcarComoLeida(id: number): Promise<void> {
  await putNotificacionLeida(id)
}

export async function marcarTodasComoLeidas(): Promise<void> {
  await putTodasNotificacionesLeidas()
}