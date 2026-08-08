export type EstadoOcupacion = 'normal' | 'advertencia' | 'critico'

export interface DashboardGeneralRaw {
  fecha_consulta: string
  total_playas: number
  playas: {
    id: number
    nombre: string
    visitantes_actuales: number
    porcentaje_ocupacion: number
    estado: EstadoOcupacion
    eventos_activos: number
  }[]
}

export interface DashboardPlayaRaw {
  playa: { id: number; nombre: string }
  ocupacion: { visitantes_actuales: number; porcentaje: number; estado: EstadoOcupacion }
  capacidad: { ccf: number; ccr: number; cce: number; metodo_ccr: string }
  eventos_activos: unknown[]
  ultimas_estimaciones: { fecha: string; porcentaje_ocupacion: number }[]
}

export interface PlayaResumenDashboard {
  id: number
  nombre: string
  visitantesActuales: number
  porcentajeOcupacion: number
  estado: EstadoOcupacion
  eventosActivos: number
}

export interface PuntoTendencia {
  fecha: string
  [nombrePlaya: string]: string | number
}

/** Preparado para cuando exista GET /dashboard/tendencia en el backend (todavía no se usa) */
export interface TendenciaRaw {
  dias: number
  playas: string[]
  datos: PuntoTendencia[]
}

export interface DashboardGeneral {
  fechaConsulta: string
  totalPlayas: number
  playas: PlayaResumenDashboard[]
  totalVisitantes: number
  promedioOcupacion: number
  totalEventosActivos: number
  tendencia: PuntoTendencia[]
}