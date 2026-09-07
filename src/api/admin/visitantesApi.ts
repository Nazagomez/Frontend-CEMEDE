import { httpClient } from '@/api/httpClient'
import type { OcupacionRaw, HistorialResponseRaw, HistorialFiltro } from '@/types/Admin/visitantes'

export { postEntradaVisitante as registrarEntrada, putSalidaVisitante as registrarSalida } from '@/api/visitantesApi'

export async function fetchOcupacion(playaId: number): Promise<OcupacionRaw> {
  const { data } = await httpClient.get<OcupacionRaw>(`/visitantes/activos/${playaId}`)
  return data
}

export async function fetchHistorial(filtro: HistorialFiltro): Promise<HistorialResponseRaw> {
  const { data } = await httpClient.get<HistorialResponseRaw>('/visitantes/historial', {
    params: {
      playa_id: filtro.playaId,
      fecha_inicio: filtro.fechaInicio,
      fecha_fin: filtro.fechaFin,
      page: filtro.page ?? 1,
      limit: filtro.limit ?? 20,
    },
  })
  return data
}