import { useEffect, useState } from 'react'
import { getPlayas } from '@/services/playasService'
import type { Playa } from '@/types/playas'

/**
 * Hook transversal chico: solo la lista simple de playas (sin config CCF).
 * Lo usan formularios que necesitan un selector de playa — CrearEventoModal,
 * RegistrarVisitaForm (vía useHomeVisitante), etc. No confundir con
 * hooks/admin/playas/usePlayas.ts, que trae la config completa para la
 * pantalla de administración de playas.
 */
export function usePlayasList() {
  const [playas, setPlayas] = useState<Playa[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPlayas()
      .then(setPlayas)
      .finally(() => setIsLoading(false))
  }, [])

  return { playas, isLoading }
}