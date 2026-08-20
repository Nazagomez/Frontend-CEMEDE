import { getPlayas } from '@/services/playasService'
import { getEstimacion } from '@/services/admin/capacidadService'
import {
  fetchConfiguracion,
  crearPlaya,
  actualizarConfiguracion,
  darDeBajaPlaya,
} from '@/api/admin/playasApi'
import type { Playa } from '@/types/playas'
import type {
  ConfiguracionCcf,
  ConfiguracionCcfRaw,
  PlayaConConfiguracion,
  CrearPlayaPayload,
  ActualizarConfiguracionPayload,
} from '@/types/admin/playas'

function mapConfiguracion(raw: ConfiguracionCcfRaw): ConfiguracionCcf {
  return {
    playaId: raw.playa_id,
    areaPorVisitanteM2: raw.area_por_visitante_m2,
    periodoHoras: raw.periodo_horas,
    tiempoPermanenciaHoras: raw.tiempo_permanencia_horas,
    capacidadManejo: raw.capacidad_manejo,
  }
}

export async function getPlayasConConfiguracion(): Promise<PlayaConConfiguracion[]> {
  const playas: Playa[] = await getPlayas()

  return Promise.all(
    playas.map(async (playa) => {
      const [configResult, estimacionResult] = await Promise.allSettled([
        fetchConfiguracion(playa.id),
        getEstimacion(playa.id),
      ])

      return {
        ...playa,
        configuracion: configResult.status === 'fulfilled' ? mapConfiguracion(configResult.value) : null,
        cce: estimacionResult.status === 'fulfilled' ? estimacionResult.value.cce : null,
      }
    })
  )
}

export async function registrarPlaya(payload: CrearPlayaPayload): Promise<void> {
  await crearPlaya(payload)
}

export async function actualizarConfiguracionPlaya(
  playaId: number,
  payload: ActualizarConfiguracionPayload
): Promise<ConfiguracionCcf> {
  const raw = await actualizarConfiguracion(playaId, payload)
  return mapConfiguracion(raw)
}

export async function darDeBaja(playaId: number): Promise<void> {
  await darDeBajaPlaya(playaId)
}