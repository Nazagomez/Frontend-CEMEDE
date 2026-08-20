import type { Playa } from '@/types/playas'

export interface ConfiguracionCcfRaw {
  playa_id: number
  area_por_visitante_m2: number
  periodo_horas: number
  tiempo_permanencia_horas: number
  capacidad_manejo: number
  updated_at: string | null
  mensaje?: string | null
}

export interface ConfiguracionCcf {
  playaId: number
  areaPorVisitanteM2: number
  periodoHoras: number
  tiempoPermanenciaHoras: number
  capacidadManejo: number
}

export interface PlayaConConfiguracion extends Playa {
  configuracion: ConfiguracionCcf | null
  cce: number | null
}

export interface CrearPlayaPayload {
  nombre: string
  descripcion?: string
  areaUtilM2: number
  canton: string
  provincia?: string
  latitud?: number
  longitud?: number
  areaPorVisitanteM2: number
  periodoHoras: number
  tiempoPermanenciaHoras: number
  capacidadManejo: number
}

export interface ActualizarConfiguracionPayload {
  areaPorVisitanteM2: number
  periodoHoras: number
  tiempoPermanenciaHoras: number
  capacidadManejo: number
}