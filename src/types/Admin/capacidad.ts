export type EstadoOcupacion = 'normal' | 'advertencia' | 'critico'

export interface EstimacionRaw {
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

export interface Estimacion {
  playaId: number
  playaNombre: string
  fechaCalculo: string
  ccf: number
  ccrFinal: number
  cce: number
  visitantesActuales: number
  porcentajeOcupacion: number
  eventosActivos: number
  estado: EstadoOcupacion
}

export interface EventoActivoDetalle {
  id: number
  tipo: string
  titulo: string
  factorCorreccion: number | null
}

export interface HistorialItemRaw {
  id: number
  fecha_calculo: string
  ccf: number
  ccr_final: number
  cce: number
  visitantes_actuales: number
  porcentaje_ocupacion: number
}

export interface HistorialItem {
  id: number
  fechaCalculo: string
  ccf: number
  ccrFinal: number
  cce: number
  visitantesActuales: number
  porcentajeOcupacion: number
}

export interface HistorialResponseRaw {
  playa_id: number
  total: number
  estimaciones: HistorialItemRaw[]
}