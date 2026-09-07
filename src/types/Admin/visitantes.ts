export interface RegistroVisitanteRaw {
  id: number
  playa_id: number
  playa_nombre: string | null
  usuario_id: number
  fecha_entrada: string
  fecha_salida: string | null
  cantidad_personas: number
  duracion_estimada_horas: number | null
  observaciones: string | null
  mensaje?: string | null
}

export interface RegistroVisitante {
  id: number
  playaId: number
  playaNombre: string | null
  fechaEntrada: string
  fechaSalida: string | null
  cantidadPersonas: number
  duracionEstimadaHoras: number | null
  observaciones: string | null
}

export interface OcupacionRaw {
  playa_id: number
  playa_nombre: string
  total_visitantes: number
  registros_activos: number
  fecha_consulta: string
}

export interface Ocupacion {
  playaId: number
  playaNombre: string
  totalVisitantes: number
  registrosActivos: number
  fechaConsulta: string
}

export interface HistorialItemRaw {
  id: number
  playa_id: number
  playa_nombre: string | null
  fecha_entrada: string
  fecha_salida: string | null
  cantidad_personas: number
  duracion_estimada_horas: number | null
}

export interface HistorialResponseRaw {
  total: number
  page: number
  limit: number
  registros: HistorialItemRaw[]
}

export interface HistorialFiltro {
  playaId?: number
  fechaInicio?: string
  fechaFin?: string
  page?: number
  limit?: number
}

export interface EntradaPayload {
  playaId: number
  cantidadPersonas: number
  duracionEstimadaHoras?: number
  observaciones?: string
}