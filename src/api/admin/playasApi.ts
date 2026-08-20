import { httpClient } from '@/api/httpClient'
import type { PlayaRaw } from '@/types/playas'
import type {
  ConfiguracionCcfRaw,
  CrearPlayaPayload,
  ActualizarConfiguracionPayload,
} from '@/types/admin/playas'

export async function fetchConfiguracion(playaId: number): Promise<ConfiguracionCcfRaw> {
  const { data } = await httpClient.get<ConfiguracionCcfRaw>(`/playas/${playaId}/configuracion`)
  return data
}

export async function crearPlaya(payload: CrearPlayaPayload): Promise<PlayaRaw> {
  const { data } = await httpClient.post<PlayaRaw>('/playas', {
    nombre: payload.nombre,
    descripcion: payload.descripcion,
    area_util_m2: payload.areaUtilM2,
    canton: payload.canton,
    provincia: payload.provincia,
    latitud: payload.latitud,
    longitud: payload.longitud,
    area_por_visitante_m2: payload.areaPorVisitanteM2,
    periodo_horas: payload.periodoHoras,
    tiempo_permanencia_horas: payload.tiempoPermanenciaHoras,
    capacidad_manejo: payload.capacidadManejo,
  })
  return data
}

export async function actualizarConfiguracion(
  playaId: number,
  payload: ActualizarConfiguracionPayload
): Promise<ConfiguracionCcfRaw> {
  const { data } = await httpClient.put<ConfiguracionCcfRaw>(`/playas/${playaId}/configuracion`, {
    area_por_visitante_m2: payload.areaPorVisitanteM2,
    periodo_horas: payload.periodoHoras,
    tiempo_permanencia_horas: payload.tiempoPermanenciaHoras,
    capacidad_manejo: payload.capacidadManejo,
  })
  return data
}

export async function darDeBajaPlaya(playaId: number): Promise<PlayaRaw> {
  const { data } = await httpClient.delete<PlayaRaw>(`/playas/${playaId}`)
  return data
}