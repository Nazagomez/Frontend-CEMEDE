import { getPlayas } from '@/services/playasService'
import { registrarVisitaPublica } from '@/services/visitantesService'
import type { Playa } from '@/types/playas'
import type { OcupacionPlaya, RegistrarVisitaPayload } from '@/types/Visitante/home'

export async function getPlayasDisponibles(): Promise<Playa[]> {
  return getPlayas()
}

/** Conectado a POST /api/visitantes/entrada. Si se indica duración estimada, el registro se cierra solo. */
export async function registrarVisita(payload: RegistrarVisitaPayload): Promise<{ ok: boolean }> {
  await registrarVisitaPublica({
    playaId: payload.playaId,
    cantidadPersonas: payload.cantidadPersonas,
    duracionEstimadaHoras: payload.duracionEstimadaHoras,
  })
  return { ok: true }
}

/**
 * TODO: no hay endpoint público de ocupación en vivo — GET /visitantes/activos/{id}
 * exige login. Placeholder hasta que se decida exponer una versión pública.
 */
export async function getOcupacionActual(playas: Playa[]): Promise<OcupacionPlaya[]> {
  return playas.map((playa, i) => ({
    playaId: playa.id,
    nombre: playa.nombre,
    nivel: i % 2 === 0 ? 'baja' : 'alta',
    actualizadoHace: 'hace 5min',
  }))
}