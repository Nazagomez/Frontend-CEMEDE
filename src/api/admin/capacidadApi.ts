import { httpClient } from '@/api/httpClient'
import type { EstimacionRaw, HistorialResponseRaw } from '@/types/Admin/capacidad'

export async function fetchEstimacion(playaId: number): Promise<EstimacionRaw> {
  const { data } = await httpClient.get<EstimacionRaw>(`/capacidad/estimacion/${playaId}`)
  return data
}

export async function postCalcular(playaId: number): Promise<{ estimacion_id: number; ccf: number; ccr_final: number; cce: number }> {
  const { data } = await httpClient.post(`/capacidad/calcular/${playaId}`)
  return data
}

export async function fetchHistorial(playaId: number, limit = 30): Promise<HistorialResponseRaw> {
  const { data } = await httpClient.get<HistorialResponseRaw>(`/capacidad/historial/${playaId}`, { params: { limit } })
  return data
}