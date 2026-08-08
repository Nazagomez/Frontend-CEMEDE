import { httpClient } from '@/api/httpClient'
import type { EventoAmbientalRaw, EventosFiltro, CrearEventoPayload } from '@/types/Admin/eventos'

export async function fetchEventos(filtro?: EventosFiltro): Promise<EventoAmbientalRaw[]> {
  const { data } = await httpClient.get<EventoAmbientalRaw[]>('/eventos', {
    params: {
      playa_id: filtro?.playaId,
      tipo: filtro?.tipo,
      activo: filtro?.activo,
    },
  })
  return data
}

export async function crearEvento(payload: CrearEventoPayload): Promise<EventoAmbientalRaw> {
  const { data } = await httpClient.post<EventoAmbientalRaw>('/eventos', {
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

export async function cerrarEvento(eventoId: number): Promise<EventoAmbientalRaw> {
  const { data } = await httpClient.put<EventoAmbientalRaw>(`/eventos/${eventoId}/cerrar`)
  return data
}