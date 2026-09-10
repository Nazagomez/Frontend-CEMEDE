import { useCallback, useEffect, useState } from 'react'
import { getDashboardGeneral } from '@/services/admin/dashboardService'
import { getEventosRecientes } from '@/services/admin/eventosService'
import type { DashboardGeneral } from '@/types/Admin/dashboard'
import type { EventoAmbiental } from '@/types/Admin/eventos'

const POLL_INTERVAL_MS = 30000

interface UseDashboardResult {
  data: DashboardGeneral | null
  eventosRecientes: EventoAmbiental[]
  isLoading: boolean
  error: string | null
  refrescar: () => void
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<DashboardGeneral | null>(null)
  const [eventosRecientes, setEventosRecientes] = useState<EventoAmbiental[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(() => {
    setError(null)
    Promise.all([getDashboardGeneral(), getEventosRecientes()])
      .then(([dashboard, eventos]) => {
        setData(dashboard)
        setEventosRecientes(eventos)
      })
      .catch(() => setError('No se pudo cargar el dashboard.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  useEffect(() => {
    const intervalo = setInterval(cargar, POLL_INTERVAL_MS)
    return () => clearInterval(intervalo)
  }, [cargar])

  return { data, eventosRecientes, isLoading, error, refrescar: cargar }
}