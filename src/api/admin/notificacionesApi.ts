import { httpClient } from '@/api/httpClient'
import type { NotificacionRaw } from '@/types/Admin/notificaciones'

export async function fetchNotificaciones(leida?: boolean, playaId?: number): Promise<NotificacionRaw[]> {
  const { data } = await httpClient.get<NotificacionRaw[]>('/notificaciones', {
    params: { leida, playa_id: playaId },
  })
  return data
}

export async function putNotificacionLeida(id: number): Promise<{ id: number; leida: boolean }> {
  const { data } = await httpClient.put<{ id: number; leida: boolean }>(`/notificaciones/${id}/leida`)
  return data
}

export async function putTodasNotificacionesLeidas(): Promise<void> {
  await httpClient.put('/notificaciones/leidas')
}