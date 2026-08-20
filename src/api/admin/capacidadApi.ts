import { httpClient } from '@/api/httpClient'
import type { EstimacionCapacidadRaw } from '@/types/admin/capacidad'

export async function fetchEstimacion(playaId: number): Promise<EstimacionCapacidadRaw> {
  const { data } = await httpClient.get<EstimacionCapacidadRaw>(`/capacidad/estimacion/${playaId}`)
  return data
}