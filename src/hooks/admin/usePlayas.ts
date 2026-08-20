import { useCallback, useEffect, useState } from 'react'
import {
  getPlayasConConfiguracion,
  registrarPlaya,
  actualizarConfiguracionPlaya,
  darDeBaja,
} from '@/services/admin/playasService'
import type {
  PlayaConConfiguracion,
  CrearPlayaPayload,
  ActualizarConfiguracionPayload,
} from '@/types/admin/playas'

export function usePlayas() {
  const [playas, setPlayas] = useState<PlayaConConfiguracion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const cargar = useCallback(() => {
    setIsLoading(true)
    setError(null)
    getPlayasConConfiguracion()
      .then(setPlayas)
      .catch(() => setError('No se pudieron cargar las playas.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function crear(payload: CrearPlayaPayload) {
    setActionError(null)
    try {
      await registrarPlaya(payload)
      cargar()
      return true
    } catch {
      setActionError('No se pudo registrar la playa. Verificá los datos.')
      return false
    }
  }

  async function actualizarConfiguracion(playaId: number, payload: ActualizarConfiguracionPayload) {
    setActionError(null)
    try {
      await actualizarConfiguracionPlaya(playaId, payload)
      cargar()
      return true
    } catch {
      setActionError('No se pudo actualizar la configuración.')
      return false
    }
  }

  async function eliminar(playaId: number) {
    setActionError(null)
    try {
      await darDeBaja(playaId)
      cargar()
      return true
    } catch {
      setActionError('No se pudo dar de baja — puede que tenga visitantes activos.')
      return false
    }
  }

  return { playas, isLoading, error, actionError, crear, actualizarConfiguracion, eliminar }
}