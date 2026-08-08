export type TipoEvento =
  | 'arribada_tortugas'
  | 'marea_roja'
  | 'marea_alta'
  | 'condicion_climatica'
  | 'restriccion_acceso'
  | 'cierre_temporal'
  | 'otro'

export const TIPO_EVENTO_LABEL: Record<TipoEvento, string> = {
  arribada_tortugas: 'Arribada de tortugas',
  marea_roja: 'Marea roja',
  marea_alta: 'Marea alta',
  condicion_climatica: 'Condición climática',
  restriccion_acceso: 'Restricción de acceso',
  cierre_temporal: 'Cierre temporal',
  otro: 'Otro',
}

export interface EventoAmbientalRaw {
  id: number
  playa_id: number
  playa_nombre: string | null
  tipo: TipoEvento
  titulo: string
  descripcion: string | null
  fecha_inicio: string
  fecha_fin: string | null
  factor_correccion: number
  activo: boolean
  mensaje: string | null
}

export interface EventoAmbiental {
  id: number
  playaId: number
  playaNombre: string | null
  tipo: TipoEvento
  titulo: string
  descripcion: string | null
  fechaInicio: string
  fechaFin: string | null
  factorCorreccion: number
  activo: boolean
}

export interface EventosFiltro {
  playaId?: number
  tipo?: TipoEvento
  activo?: boolean
}

export interface CrearEventoPayload {
  playaId: number
  tipo: TipoEvento
  titulo: string
  descripcion?: string
  fechaInicio: string
  parteAfectada: number
  totalidadAnalizada: number
}