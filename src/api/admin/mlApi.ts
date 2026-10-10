import { httpClient } from '@/api/httpClient'
import type { MlEntrenarRaw, MlEstadoRaw } from '@/types/Admin/ml'

export async function fetchMlEstado(playaId: number): Promise<MlEstadoRaw> {
  const { data } = await httpClient.get<MlEstadoRaw>(`/ml/estado/${playaId}`)
  return data
}

export async function postMlEntrenar(playaId: number): Promise<MlEntrenarRaw> {
  const { data } = await httpClient.post<MlEntrenarRaw>(`/ml/entrenar/${playaId}`)
  return data
}
