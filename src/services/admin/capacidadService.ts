import { fetchEstimacion } from '@/api/admin/capacidadApi'
import type { EstimacionCapacidad, EstimacionCapacidadRaw } from '@/types/admin/capacidad'

function mapEstimacion(raw: EstimacionCapacidadRaw): EstimacionCapacidad {
  return {
    playaId: raw.playa_id,
    ccf: raw.capacidad.ccf,
    ccrFinal: raw.capacidad.ccr_final,
    cce: raw.capacidad.cce,
    metodoCcr: raw.capacidad.metodo_ccr,
    visitantesActuales: raw.ocupacion.visitantes_actuales,
    porcentajeOcupacion: raw.ocupacion.porcentaje_ocupacion,
  }
}

export async function getEstimacion(playaId: number): Promise<EstimacionCapacidad> {
  const raw = await fetchEstimacion(playaId)
  return mapEstimacion(raw)
}