import { useEffect, useState } from 'react'
import { getDashboardGeneral } from '@/services/admin/dashboardService'
import { getEventosRecientes } from '@/services/admin/eventosService'
import type { DashboardGeneral } from '@/types/admin/dashboard'
import type { EventoAmbiental } from '@/types/admin/eventos'

interface UseDashboardResult {
  data: DashboardGeneral | null
  eventosRecientes: EventoAmbiental[]
  isLoading: boolean
  error: string | null
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<DashboardGeneral | null>(null)
  const [eventosRecientes, setEventosRecientes] = useState<EventoAmbiental[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    Promise.all([getDashboardGeneral(), getEventosRecientes()])
      .then(([dashboard, eventos]) => {
        if (cancelled) return
        setData(dashboard)
        setEventosRecientes(eventos)
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo cargar el dashboard.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { data, eventosRecientes, isLoading, error }
}