import { useCallback, useEffect, useState } from 'react'
import { usePlayasList } from '@/hooks/usePlayasList'
import { getEstimacion, getEventosActivosDetalle, getHistorial, recalcularEstimacion } from '@/services/admin/capacidadService'
import type { Estimacion, EventoActivoDetalle, HistorialItem } from '@/types/Admin/capacidad'

export function useCapacidad() {
  const { playas } = usePlayasList()
  const [playaId, setPlayaId] = useState<number | null>(null)
  const [estimacion, setEstimacion] = useState<Estimacion | null>(null)
  const [eventosDetalle, setEventosDetalle] = useState<EventoActivoDetalle[]>([])
  const [historial, setHistorial] = useState<HistorialItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recalculando, setRecalculando] = useState(false)
  const [recalcularError, setRecalcularError] = useState<string | null>(null)
  const [recalculado, setRecalculado] = useState(false)

  useEffect(() => {
    if (playaId === null && playas.length > 0) {
      setPlayaId(playas[0].id)
    }
  }, [playas, playaId])

  const cargar = useCallback(() => {
    if (playaId === null) return
    setIsLoading(true)
    setError(null)
    Promise.all([getEstimacion(playaId), getEventosActivosDetalle(playaId), getHistorial(playaId)])
      .then(([est, eventos, hist]) => {
        setEstimacion(est)
        setEventosDetalle(eventos)
        setHistorial(hist)
      })
      .catch(() => setError('No se pudo cargar la estimación de capacidad.'))
      .finally(() => setIsLoading(false))
  }, [playaId])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function recalcular() {
    if (playaId === null) return
    setRecalculando(true)
    setRecalcularError(null)
    setRecalculado(false)
    try {
      await recalcularEstimacion(playaId)
      cargar()
      setRecalculado(true)
    } catch {
      setRecalcularError('No se pudo recalcular la capacidad de carga.')
    } finally {
      setRecalculando(false)
    }
  }

  return {
    playas,
    playaId,
    setPlayaId,
    estimacion,
    eventosDetalle,
    historial,
    isLoading,
    error,
    recalculando,
    recalcularError,
    recalculado,
    recalcular,
  }
}