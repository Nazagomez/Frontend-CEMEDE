import { fetchEstimacionPublica } from '@/api/capacidadApi'
import { fetchEventosActivos } from '@/api/eventosApi'
import type { Playa } from '@/types/playas'
import type { EstimacionPlaya, EstimacionPublicaRaw, FactorEvento, ResumenGeneral } from '@/types/Visitante/capacidad'

function mapEstimacion(raw: EstimacionPublicaRaw): EstimacionPlaya {
  return {
    playaId: raw.playa_id,
    playaNombre: raw.playa_nombre,
    ccf: raw.ccf,
    ccrFinal: raw.ccr_final,
    cce: raw.cce,
    visitantesActuales: raw.visitantes_actuales,
    porcentajeOcupacion: raw.porcentaje_ocupacion,
    eventosActivos: raw.eventos_activos,
    estado: raw.estado,
  }
}

export async function getEstimacionesTodasLasPlayas(playas: Playa[]): Promise<EstimacionPlaya[]> {
  const raws = await Promise.all(playas.map((playa) => fetchEstimacionPublica(playa.id)))
  return raws.map(mapEstimacion)
}

export function calcularResumenGeneral(estimaciones: EstimacionPlaya[]): ResumenGeneral {
  const totalVisitantes = estimaciones.reduce((sum, e) => sum + e.visitantesActuales, 0)
  const totalEventosActivos = estimaciones.reduce((sum, e) => sum + e.eventosActivos, 0)
  const ocupacionPromedio =
    estimaciones.length > 0
      ? Math.round((estimaciones.reduce((sum, e) => sum + e.porcentajeOcupacion, 0) / estimaciones.length) * 100) / 100
      : 0
  return { totalVisitantes, ocupacionPromedio, totalEventosActivos }
}

export async function getFactoresCorreccion(playas: Playa[]): Promise<FactorEvento[]> {
  const listas = await Promise.all(
    playas.map(async (playa) => {
      const eventos = await fetchEventosActivos(playa.id)
      return eventos.map((evento) => ({
        playaNombre: playa.nombre,
        tipo: evento.tipo,
        titulo: evento.titulo,
        factorCorreccion: evento.factor_correccion,
      }))
    })
  )
  return listas.flat()
}