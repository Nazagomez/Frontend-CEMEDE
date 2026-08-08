export interface PlayaVisitante {
  id: number
  nombre: string
  ubicacion: string
}

export type NivelOcupacion = 'baja' | 'media' | 'alta'

export interface OcupacionPlaya {
  playaId: number
  nombre: string
  ubicacion: string
  nivel: NivelOcupacion
  actualizadoHace: string
}

export interface RegistrarVisitaForm {
  playaId: number | null
  cantidadPersonas: number
  tiempoEstimado?: string
}