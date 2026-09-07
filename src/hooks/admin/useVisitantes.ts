import { useCallback, useEffect, useState } from 'react'
import { usePlayasList } from '@/hooks/usePlayasList'
import { getOcupacionActual, getHistorial, crearEntrada, cerrarSalida } from '@/services/admin/visitantesService'
import type { Ocupacion, RegistroVisitante, HistorialFiltro, EntradaPayload } from '@/types/Admin/visitantes'

export function useVisitantes() {
  const { playas } = usePlayasList()
  const [playaId, setPlayaId] = useState<number | null>(null)
  const [ocupacion, setOcupacion] = useState<Ocupacion | null>(null)
  const [cargandoOcupacion, setCargandoOcupacion] = useState(false)

  const [registros, setRegistros] = useState<RegistroVisitante[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 20
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('')
  const [filtroFechaFin, setFiltroFechaFin] = useState('')
  const [cargandoHistorial, setCargandoHistorial] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  useEffect(() => {
    if (playaId === null && playas.length > 0) {
      setPlayaId(playas[0].id)
    }
  }, [playas, playaId])

  const cargarOcupacion = useCallback(() => {
    if (playaId === null) return
    setCargandoOcupacion(true)
    getOcupacionActual(playaId)
      .then(setOcupacion)
      .catch(() => setOcupacion(null))
      .finally(() => setCargandoOcupacion(false))
  }, [playaId])

  const cargarHistorial = useCallback(() => {
    setCargandoHistorial(true)
    setError(null)
    const filtro: HistorialFiltro = {
      playaId: playaId ?? undefined,
      fechaInicio: filtroFechaInicio || undefined,
      fechaFin: filtroFechaFin || undefined,
      page,
      limit,
    }
    getHistorial(filtro)
      .then((resp) => {
        setRegistros(resp.registros)
        setTotal(resp.total)
      })
      .catch(() => setError('No se pudo cargar el historial de visitantes.'))
      .finally(() => setCargandoHistorial(false))
  }, [playaId, filtroFechaInicio, filtroFechaFin, page])

  useEffect(() => {
    cargarOcupacion()
  }, [cargarOcupacion])

  useEffect(() => {
    cargarHistorial()
  }, [cargarHistorial])

  function cambiarPlaya(id: number) {
    setPlayaId(id)
    setPage(1)
  }

  function aplicarFiltrosFecha(inicio: string, fin: string) {
    setFiltroFechaInicio(inicio)
    setFiltroFechaFin(fin)
    setPage(1)
  }

  async function registrarEntradaVisitante(payload: EntradaPayload) {
    setSubmitting(true)
    setActionError(null)
    try {
      await crearEntrada(payload)
      cargarOcupacion()
      cargarHistorial()
      return true
    } catch {
      setActionError('No se pudo registrar la entrada.')
      return false
    } finally {
      setSubmitting(false)
    }
  }

  async function registrarSalidaVisitante(registroId: number) {
    setActionError(null)
    try {
      await cerrarSalida(registroId)
      cargarOcupacion()
      cargarHistorial()
    } catch {
      setActionError('No se pudo registrar la salida.')
    }
  }

  return {
    playas,
    playaId,
    cambiarPlaya,
    ocupacion,
    cargandoOcupacion,
    registros,
    total,
    page,
    limit,
    setPage,
    filtroFechaInicio,
    filtroFechaFin,
    aplicarFiltrosFecha,
    cargandoHistorial,
    error,
    submitting,
    actionError,
    registrarEntradaVisitante,
    registrarSalidaVisitante,
  }
}