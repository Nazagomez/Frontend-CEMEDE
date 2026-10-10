import { httpClient } from '@/api/httpClient'
import type { HistoricoImportRaw, HistoricoSyncRaw } from '@/types/Admin/ml'

export async function postImportarExcel(): Promise<HistoricoImportRaw> {
  const { data } = await httpClient.post<HistoricoImportRaw>('/historico/importar-excel')
  return data
}

export async function postSincronizarEstimaciones(): Promise<HistoricoSyncRaw> {
  const { data } = await httpClient.post<HistoricoSyncRaw>('/historico/sincronizar-estimaciones')
  return data
}
