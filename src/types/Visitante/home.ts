export type NivelOcupacion = 'baja' | 'media' | 'alta'

export interface OcupacionPlaya {
  playaId: number
  nombre: string
  nivel: NivelOcupacion
  actualizadoHace: string
}

export interface RegistrarVisitaPayload {
  playaId: number
  cantidadPersonas: number
  tiempoEstimado?: string
}