import { useEffect, useState } from 'react'
import { usePlayasList } from '@/hooks/usePlayasList'
import { fetchEstimacionPublica } from '@/api/capacidadApi'
import type { EstadoOcupacion } from '@/types/Admin/capacidad'

export interface PlayaEstadoResumen {
  id: number
  nombre: string
  canton: string
  provincia: string
  descripcion: string | null
  latitud: number | null
  longitud: number | null
  estado: EstadoOcupacion | null
  visitantesActuales: number
  cce: number
  porcentajeOcupacion: number
}

export function useLandingPlayasEstado() {
  const { playas, isLoading: cargandoPlayas } = usePlayasList()
  const [resumen, setResumen] = useState<PlayaEstadoResumen[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (playas.length === 0) return
    Promise.all(
      playas.map(async (playa) => {
        try {
          const est = await fetchEstimacionPublica(playa.id)
          return {
            id: playa.id,
            nombre: playa.nombre,
            canton: playa.canton,
            provincia: playa.provincia,
            descripcion: playa.descripcion,
            latitud: playa.latitud,
            longitud: playa.longitud,
            estado: est.estado,
            visitantesActuales: est.visitantes_actuales,
            cce: est.cce,
            porcentajeOcupacion: est.porcentaje_ocupacion,
          }
        } catch {
          return {
            id: playa.id,
            nombre: playa.nombre,
            canton: playa.canton,
            provincia: playa.provincia,
            descripcion: playa.descripcion,
            latitud: playa.latitud,
            longitud: playa.longitud,
            estado: null,
            visitantesActuales: 0,
            cce: 0,
            porcentajeOcupacion: 0,
          }
        }
      })
    )
      .then(setResumen)
      .finally(() => setIsLoading(false))
  }, [playas])

  return { resumen, isLoading: isLoading || cargandoPlayas }
}