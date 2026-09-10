import type { EstadoOcupacion } from '@/types/Admin/capacidad'

export type { EstadoOcupacion }

export interface EstimacionPublicaRaw {
  playa_id: number
  playa_nombre: string
  fecha_calculo: string
  ccf: number
  ccr_formula: number
  ccr_ml: number | null
  ccr_final: number
  cce: number
  metodo_ccr: string
  visitantes_actuales: number
  porcentaje_ocupacion: number
  eventos_activos: number
  estado: EstadoOcupacion
}

export interface EstimacionPlaya {
  playaId: number
  playaNombre: string
  ccf: number
  ccrFinal: number
  cce: number
  visitantesActuales: number
  porcentajeOcupacion: number
  eventosActivos: number
  estado: EstadoOcupacion
}

export interface ResumenGeneral {
  totalVisitantes: number
  ocupacionPromedio: number
  totalEventosActivos: number
}

export interface FactorEvento {
  playaNombre: string
  tipo: string
  titulo: string
  factorCorreccion: number | null
}