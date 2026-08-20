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

export type EstadoEvento = 'pendiente' | 'aprobado' | 'rechazado' | 'cerrado'

export const ESTADO_EVENTO_LABEL: Record<EstadoEvento, string> = {
  pendiente: 'Pendiente',
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
  cerrado: 'Cerrado',
}

export type OrigenEvento = 'visitante' | 'investigador' | 'administrador'

export interface EventoAmbientalRaw {
  id: number
  playa_id: number
  playa_nombre: string | null
  tipo: TipoEvento
  titulo: string
  descripcion: string | null
  fecha_inicio: string
  fecha_fin: string | null
  factor_correccion: number | null
  activo: boolean
  estado: EstadoEvento
  origen: OrigenEvento
  reportado_por: string | null
  mensaje?: string | null
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
  factorCorreccion: number | null
  activo: boolean
  estado: EstadoEvento
  origen: OrigenEvento
  reportadoPor: string | null
}

export interface EventosFiltro {
  playaId?: number
  tipo?: TipoEvento
  activo?: boolean
  estado?: EstadoEvento
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