import { getPlayas } from '@/services/playasService'
import type { Playa } from '@/types/playas'
import type { OcupacionPlaya, RegistrarVisitaPayload } from '@/types/visitante/home'

export async function getPlayasDisponibles(): Promise<Playa[]> {
  return getPlayas()
}

/**
 * TODO: no hay endpoint público para registrar una visita —
 * POST /api/visitantes/entrada exige login. Reemplazar cuando exista.
 */
export async function registrarVisita(_payload: RegistrarVisitaPayload): Promise<{ ok: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return { ok: true }
}

/**
 * TODO: no hay endpoint público de ocupación en vivo. Placeholder
 * hasta que exista una versión pública.
 */
export async function getOcupacionActual(playas: Playa[]): Promise<OcupacionPlaya[]> {
  return playas.map((playa, i) => ({
    playaId: playa.id,
    nombre: playa.nombre,
    nivel: i % 2 === 0 ? 'baja' : 'alta',
    actualizadoHace: 'hace 5min',
  }))
}