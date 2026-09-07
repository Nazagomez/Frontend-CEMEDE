import type { TipoEvento } from '@/types/Admin/eventos'

export type { TipoEvento }
export { TIPO_EVENTO_LABEL } from '@/types/Admin/eventos'

export interface EventoActivoRaw {
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
  estado: string
  origen: string
  reportado_por: string | null
}

export interface EventoActivo {
  id: number
  tipo: TipoEvento
  titulo: string
  descripcion: string | null
  fechaInicio: string
}

export interface ReportarEventoPayload {
  playaId: number
  tipo: TipoEvento
  descripcion?: string
  areaUtilM2: number
}

export interface CrearEventoRequest {
  playaId: number
  tipo: TipoEvento
  titulo: string
  descripcion?: string
  fechaInicio: string
  parteAfectada: number
  totalidadAnalizada: number
}