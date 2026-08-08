import { httpClient } from '@/api/httpClient'
import type { DashboardGeneralRaw, DashboardPlayaRaw, TendenciaRaw } from '@/types/Admin/dashboard'

export async function fetchDashboardGeneral(): Promise<DashboardGeneralRaw> {
  const { data } = await httpClient.get<DashboardGeneralRaw>('/dashboard')
  return data
}

export async function fetchDashboardPlaya(playaId: number): Promise<DashboardPlayaRaw> {
  const { data } = await httpClient.get<DashboardPlayaRaw>(`/dashboard/${playaId}`)
  return data
}

/** Preparado para cuando el backend tenga GET /dashboard/tendencia. Todavía no se usa. */
export async function fetchDashboardTendencia(dias = 7): Promise<TendenciaRaw> {
  const { data } = await httpClient.get<TendenciaRaw>('/dashboard/tendencia', { params: { dias } })
  return data
}