import { useCallback, useEffect, useRef, useState } from 'react'
import { usePlayasList } from '@/hooks/usePlayasList'
import { getEstimacion, getEventosActivosDetalle, getHistorial, recalcularEstimacion } from '@/services/admin/capacidadService'
import type { Estimacion, EventoActivoDetalle, HistorialItem } from '@/types/Admin/capacidad'

export const HISTORIAL_PAGE_SIZE = 10

export function useCapacidad() {
  const { playas } = usePlayasList()
  const [playaId, setPlayaId] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [historialTotal, setHistorialTotal] = useState(0)
  const [estimacion, setEstimacion] = useState<Estimacion | null>(null)
  const [eventosDetalle, setEventosDetalle] = useState<EventoActivoDetalle[]>([])
  const [historial, setHistorial] = useState<HistorialItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recalculando, setRecalculando] = useState(false)
  const [recalcularError, setRecalcularError] = useState<string | null>(null)
  const [recalculado, setRecalculado] = useState(false)
  const mostrarCargaCompleta = useRef(true)

  useEffect(() => {
    if (playaId === null && playas.length > 0) {
      setPlayaId(playas[0].id)
    }
  }, [playas, playaId])

  const cargar = useCallback(() => {
    if (playaId === null) return
    if (mostrarCargaCompleta.current) setIsLoading(true)
    setError(null)
    Promise.all([getEstimacion(playaId), getEventosActivosDetalle(playaId), getHistorial(playaId, page, HISTORIAL_PAGE_SIZE)])
      .then(([est, eventos, hist]) => {
        setEstimacion(est)
        setEventosDetalle(eventos)
        setHistorial(hist.items)
        setHistorialTotal(hist.total)
      })
      .catch(() => setError('No se pudo cargar la estimación de capacidad.'))
      .finally(() => {
        mostrarCargaCompleta.current = false
        setIsLoading(false)
      })
  }, [playaId, page])

  useEffect(() => {
    cargar()
  }, [cargar])

  function cambiarPlaya(id: number) {
    mostrarCargaCompleta.current = true
    setPage(1)
    setPlayaId(id)
  }

  async function recalcular() {
    if (playaId === null) return
    setRecalculando(true)
    setRecalcularError(null)
    setRecalculado(false)
    try {
      await recalcularEstimacion(playaId)
      if (page !== 1) {
        setPage(1)
      } else {
        cargar()
      }
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
    cambiarPlaya,
    estimacion,
    eventosDetalle,
    historial,
    historialTotal,
    page,
    pageSize: HISTORIAL_PAGE_SIZE,
    setPage,
    isLoading,
    error,
    recalculando,
    recalcularError,
    recalculado,
    recalcular,
    cargar,
  }
}