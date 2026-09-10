import { fetchEstimacion, postCalcular, fetchHistorial } from '@/api/admin/capacidadApi'
import { fetchEventosActivos } from '@/api/eventosApi'
import type { Estimacion, EstimacionRaw, EventoActivoDetalle, HistorialItem, HistorialItemRaw } from '@/types/Admin/capacidad'

function mapEstimacion(raw: EstimacionRaw): Estimacion {
  return {
    playaId: raw.playa_id,
    playaNombre: raw.playa_nombre,
    fechaCalculo: raw.fecha_calculo,
    ccf: raw.ccf,
    ccrFinal: raw.ccr_final,
    cce: raw.cce,
    visitantesActuales: raw.visitantes_actuales,
    porcentajeOcupacion: raw.porcentaje_ocupacion,
    eventosActivos: raw.eventos_activos,
    estado: raw.estado,
  }
}

function mapHistorialItem(raw: HistorialItemRaw): HistorialItem {
  return {
    id: raw.id,
    fechaCalculo: raw.fecha_calculo,
    ccf: raw.ccf,
    ccrFinal: raw.ccr_final,
    cce: raw.cce,
    visitantesActuales: raw.visitantes_actuales,
    porcentajeOcupacion: raw.porcentaje_ocupacion,
  }
}

export async function getEstimacion(playaId: number): Promise<Estimacion> {
  const raw = await fetchEstimacion(playaId)
  return mapEstimacion(raw)
}

export async function getEventosActivosDetalle(playaId: number): Promise<EventoActivoDetalle[]> {
  const raw = await fetchEventosActivos(playaId)
  return raw.map((evento) => ({
    id: evento.id,
    tipo: evento.tipo,
    titulo: evento.titulo,
    factorCorreccion: evento.factor_correccion,
  }))
}

export async function getHistorial(playaId: number): Promise<HistorialItem[]> {
  const raw = await fetchHistorial(playaId)
  return raw.estimaciones.map(mapHistorialItem)
}

export async function recalcularEstimacion(playaId: number): Promise<void> {
  await postCalcular(playaId)
}