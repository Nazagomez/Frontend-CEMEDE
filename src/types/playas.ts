export interface PlayaRaw {
  id: number
  nombre: string
  descripcion: string | null
  area_util_m2: number
  canton: string
  provincia: string
  latitud: number | null
  longitud: number | null
  activa: boolean
  mensaje?: string | null
}

export interface Playa {
  id: number
  nombre: string
  descripcion: string | null
  areaUtilM2: number
  canton: string
  provincia: string
  latitud: number | null
  longitud: number | null
  activa: boolean
}