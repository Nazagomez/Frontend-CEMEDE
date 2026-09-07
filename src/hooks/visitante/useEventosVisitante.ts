import { useEffect, useState } from 'react'
import { usePlayasList } from '@/hooks/usePlayasList'
import { getEventosActivosPorPlaya, reportarEventoAmbiental } from '@/services/visitante/eventosService'
import type { EventoActivo, ReportarEventoPayload } from '@/types/Visitante/eventos'

export function useEventosVisitante() {
  const { playas, isLoading: cargandoPlayas } = usePlayasList()
  const [playaId, setPlayaId] = useState<number | null>(null)
  const [eventos, setEventos] = useState<EventoActivo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [enviarError, setEnviarError] = useState<string | null>(null)

  useEffect(() => {
    if (playaId === null && playas.length > 0) {
      setPlayaId(playas[0].id)
    }
  }, [playas, playaId])

  useEffect(() => {
    if (playaId === null) return
    setIsLoading(true)
    setError(null)
    getEventosActivosPorPlaya(playaId)
      .then(setEventos)
      .catch(() => setError('No se pudieron cargar los eventos activos.'))
      .finally(() => setIsLoading(false))
  }, [playaId])

  async function reportar(payload: Omit<ReportarEventoPayload, 'playaId' | 'areaUtilM2'>) {
    const playa = playas.find((p) => p.id === playaId)
    if (!playa) return
    setEnviando(true)
    setEnviado(false)
    setEnviarError(null)
    try {
      await reportarEventoAmbiental({ ...payload, playaId: playa.id, areaUtilM2: playa.areaUtilM2 })
      setEnviado(true)
    } catch {
      setEnviarError('No se pudo enviar el reporte. Intentá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return { playas, cargandoPlayas, playaId, setPlayaId, eventos, isLoading, error, enviando, enviado, enviarError, reportar }
}