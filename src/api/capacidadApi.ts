import { httpClient } from '@/api/httpClient'
import type { EstimacionPublicaRaw } from '@/types/Visitante/capacidad'

export async function fetchEstimacionPublica(playaId: number): Promise<EstimacionPublicaRaw> {
  const { data } = await httpClient.get<EstimacionPublicaRaw>(`/capacidad/publico/${playaId}`)
  return data
}