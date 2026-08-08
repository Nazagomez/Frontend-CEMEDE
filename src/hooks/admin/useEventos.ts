import { useCallback, useEffect, useState } from 'react'
import { getEventos, cerrarEventoActivo } from '@/services/admin/eventosService'
import type { EventoAmbiental, TipoEvento } from '@/types/Admin/eventos'

export function useEventos() {
  const [eventos, setEventos] = useState<EventoAmbiental[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tipo, setTipo] = useState<TipoEvento | 'todos'>('todos')
  const [activo, setActivo] = useState<'todos' | 'activos' | 'cerrados'>('todos')

  const cargar = useCallback(() => {
    setIsLoading(true)
    getEventos({
      tipo: tipo === 'todos' ? undefined : tipo,
      activo: activo === 'todos' ? undefined : activo === 'activos',
    })
      .then(setEventos)
      .catch(() => setError('No se pudieron cargar los eventos.'))
      .finally(() => setIsLoading(false))
  }, [tipo, activo])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function cerrar(eventoId: number) {
    await cerrarEventoActivo(eventoId)
    cargar()
  }

  return { eventos, isLoading, error, tipo, setTipo, activo, setActivo, cerrar }
}