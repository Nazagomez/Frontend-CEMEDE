import { getPlayas } from '@/services/playasService'
import { registrarVisitaPublica } from '@/services/visitantesService'
import { getEstimacionesTodasLasPlayas } from '@/services/visitante/capacidadService'
import type { Playa } from '@/types/playas'
import type { EstadoOcupacion } from '@/types/Visitante/capacidad'
import type { NivelOcupacion, OcupacionPlaya, RegistrarVisitaPayload } from '@/types/Visitante/home'

const ESTADO_A_NIVEL: Record<EstadoOcupacion, NivelOcupacion> = {
  normal: 'baja',
  advertencia: 'media',
  critico: 'alta',
}

export async function getPlayasDisponibles(): Promise<Playa[]> {
  return getPlayas()
}

export async function registrarVisita(payload: RegistrarVisitaPayload): Promise<{ ok: boolean }> {
  await registrarVisitaPublica({
    playaId: payload.playaId,
    cantidadPersonas: payload.cantidadPersonas,
    duracionEstimadaHoras: payload.duracionEstimadaHoras,
  })
  return { ok: true }
}

export async function getOcupacionActual(playas: Playa[]): Promise<OcupacionPlaya[]> {
  const estimaciones = await getEstimacionesTodasLasPlayas(playas)
  return estimaciones.map((e) => ({
    playaId: e.playaId,
    nombre: e.playaNombre,
    nivel: ESTADO_A_NIVEL[e.estado],
    actualizadoHace: 'justo ahora',
  }))
}