import { httpClient } from '@/api/httpClient'
import type { EventoActivoRaw, CrearEventoRequest } from '@/types/Visitante/eventos'

export async function fetchEventosActivos(playaId: number): Promise<EventoActivoRaw[]> {
  const { data } = await httpClient.get<EventoActivoRaw[]>(`/eventos/activos/${playaId}`)
  return data
}

export async function reportarEvento(payload: CrearEventoRequest): Promise<{ mensaje?: string | null }> {
  const { data } = await httpClient.post('/eventos', {
    playa_id: payload.playaId,
    tipo: payload.tipo,
    titulo: payload.titulo,
    descripcion: payload.descripcion,
    fecha_inicio: payload.fechaInicio,
    parte_afectada: payload.parteAfectada,
    totalidad_analizada: payload.totalidadAnalizada,
  })
  return data
}