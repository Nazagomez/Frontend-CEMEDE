import { httpClient } from '@/api/httpClient'
import type { RegistroVisitanteRaw } from '@/types/Admin/visitantes'

export interface EntradaVisitanteRequest {
  playaId: number
  cantidadPersonas: number
  duracionEstimadaHoras?: number
  observaciones?: string
}

export async function postEntradaVisitante(payload: EntradaVisitanteRequest): Promise<RegistroVisitanteRaw> {
  const { data } = await httpClient.post<RegistroVisitanteRaw>('/visitantes/entrada', {
    playa_id: payload.playaId,
    cantidad_personas: payload.cantidadPersonas,
    duracion_estimada_horas: payload.duracionEstimadaHoras,
    observaciones: payload.observaciones,
  })
  return data
}

export async function putSalidaVisitante(registroId: number): Promise<RegistroVisitanteRaw> {
  const { data } = await httpClient.put<RegistroVisitanteRaw>(`/visitantes/${registroId}/salida`, {})
  return data
}