import { useCallback, useEffect, useState } from 'react'
import { usePlayasList } from '@/hooks/usePlayasList'
import { getEstimacionesTodasLasPlayas, calcularResumenGeneral, getFactoresCorreccion } from '@/services/visitante/capacidadService'
import type { EstimacionPlaya, FactorEvento, ResumenGeneral } from '@/types/Visitante/capacidad'

const POLL_INTERVAL_MS = 30000

export function useCapacidadVisitante() {
  const { playas, isLoading: cargandoPlayas } = usePlayasList()
  const [estimaciones, setEstimaciones] = useState<EstimacionPlaya[]>([])
  const [factores, setFactores] = useState<FactorEvento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(() => {
    if (playas.length === 0) return
    setError(null)
    Promise.all([getEstimacionesTodasLasPlayas(playas), getFactoresCorreccion(playas)])
      .then(([est, fact]) => {
        setEstimaciones(est)
        setFactores(fact)
      })
      .catch(() => setError('No se pudo cargar la información de capacidad.'))
      .finally(() => setIsLoading(false))
  }, [playas])

  useEffect(() => {
    cargar()
  }, [cargar])

  useEffect(() => {
    const intervalo = setInterval(cargar, POLL_INTERVAL_MS)
    return () => clearInterval(intervalo)
  }, [cargar])

  const resumen: ResumenGeneral = calcularResumenGeneral(estimaciones)

  return { estimaciones, factores, resumen, isLoading: isLoading || cargandoPlayas, error }
}