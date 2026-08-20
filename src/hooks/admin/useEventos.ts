import { useCallback, useEffect, useState } from 'react'
import {
  getEventos,
  getEventosPendientes,
  aprobarEventoAmbiental,
  rechazarEventoAmbiental,
  cerrarEventoActivo,
  registrarEvento,
} from '@/services/admin/eventosService'
import type { EventoAmbiental, EstadoEvento, CrearEventoPayload } from '@/types/admin/eventos'

export type TabEventos = 'todos' | EstadoEvento

export function useEventos() {
  const [eventos, setEventos] = useState<EventoAmbiental[]>([])
  const [pendientesCount, setPendientesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [tab, setTab] = useState<TabEventos>('todos')

  const cargar = useCallback(() => {
    setIsLoading(true)
    setError(null)
    Promise.all([
      getEventos(tab === 'todos' ? undefined : { estado: tab }),
      getEventosPendientes(),
    ])
      .then(([lista, pendientes]) => {
        setEventos(lista)
        setPendientesCount(pendientes.length)
      })
      .catch(() => setError('No se pudieron cargar los eventos.'))
      .finally(() => setIsLoading(false))
  }, [tab])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function aprobar(eventoId: number) {
    setActionError(null)
    try {
      await aprobarEventoAmbiental(eventoId)
      cargar()
    } catch {
      setActionError('No se pudo aprobar el evento.')
    }
  }

  async function rechazar(eventoId: number) {
    setActionError(null)
    try {
      await rechazarEventoAmbiental(eventoId)
      cargar()
    } catch {
      setActionError('No se pudo rechazar el evento.')
    }
  }

  async function cerrar(eventoId: number) {
    setActionError(null)
    try {
      await cerrarEventoActivo(eventoId)
      cargar()
    } catch {
      setActionError('No se pudo finalizar el evento.')
    }
  }

  async function crear(payload: CrearEventoPayload) {
    setActionError(null)
    try {
      await registrarEvento(payload)
      cargar()
      return true
    } catch {
      setActionError('No se pudo registrar el evento.')
      return false
    }
  }

  return { eventos, pendientesCount, isLoading, error, actionError, tab, setTab, aprobar, rechazar, cerrar, crear }
}