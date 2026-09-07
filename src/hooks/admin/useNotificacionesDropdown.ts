import { useCallback, useEffect, useState } from 'react'
import { getNotificaciones, marcarComoLeida, marcarTodasComoLeidas } from '@/services/admin/notificacionesService'
import type { Notificacion } from '@/types/Admin/notificaciones'

const POLL_INTERVAL_MS = 20000
const PREVIEW_LIMIT = 8

export function useNotificacionesDropdown() {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const cargar = useCallback(() => {
    getNotificaciones()
      .then(setNotificaciones)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  useEffect(() => {
    const intervalo = setInterval(cargar, POLL_INTERVAL_MS)
    return () => clearInterval(intervalo)
  }, [cargar])

  async function marcarLeida(id: number) {
    await marcarComoLeida(id)
    cargar()
  }

  async function marcarTodas() {
    await marcarTodasComoLeidas()
    cargar()
  }

  const noLeidasCount = notificaciones.filter((n) => !n.leida).length
  const preview = notificaciones.slice(0, PREVIEW_LIMIT)

  return { preview, noLeidasCount, isLoading, marcarLeida, marcarTodas }
}