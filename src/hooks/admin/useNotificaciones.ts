import { useCallback, useEffect, useState } from 'react'
import { getNotificaciones, marcarComoLeida, marcarTodasComoLeidas } from '@/services/admin/notificacionesService'
import type { Notificacion, NotificacionesFiltroLeida } from '@/types/Admin/notificaciones'

const POLL_INTERVAL_MS = 20000

const LEIDA_PARAM: Record<NotificacionesFiltroLeida, boolean | undefined> = {
  todas: undefined,
  no_leidas: false,
  leidas: true,
}

export function useNotificaciones() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [filtro, setFiltro] = useState<NotificacionesFiltroLeida>('todas')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const cargar = useCallback(() => {
    setIsLoading(true)
    setError(null)
    getNotificaciones(LEIDA_PARAM[filtro])
      .then(setNotificaciones)
      .catch(() => setError('No se pudieron cargar las notificaciones.'))
      .finally(() => setIsLoading(false))
  }, [filtro])

  useEffect(() => {
    cargar()
  }, [cargar])

  useEffect(() => {
    const intervalo = setInterval(cargar, POLL_INTERVAL_MS)
    return () => clearInterval(intervalo)
  }, [cargar])

  async function marcarLeida(id: number) {
    setActionError(null)
    try {
      await marcarComoLeida(id)
      cargar()
    } catch {
      setActionError('No se pudo marcar la notificación como leída.')
    }
  }

  async function marcarTodas() {
    setActionError(null)
    try {
      await marcarTodasComoLeidas()
      cargar()
    } catch {
      setActionError('No se pudieron marcar las notificaciones como leídas.')
    }
  }

  const noLeidasCount = notificaciones.filter((n) => !n.leida).length

  return { notificaciones, filtro, setFiltro, isLoading, error, actionError, marcarLeida, marcarTodas, noLeidasCount }
}