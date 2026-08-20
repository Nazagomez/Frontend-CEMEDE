export interface EstimacionCapacidadRaw {
  playa_id: number
  playa_nombre: string
  fecha_calculo: string
  capacidad: {
    ccf: number
    ccr_formula: number | null
    ccr_ml: number | null
    ccr_final: number
    cce: number
    metodo_ccr: string
  }
  ocupacion: {
    visitantes_actuales: number
    porcentaje_ocupacion: number
    estado: string
  }
  eventos_activos: number
}

export interface EstimacionCapacidad {
  playaId: number
  ccf: number
  ccrFinal: number
  cce: number
  metodoCcr: string
  visitantesActuales: number
  porcentajeOcupacion: number
}