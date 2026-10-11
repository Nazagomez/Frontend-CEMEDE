import { useEffect, useState } from 'react'
import { getClimaActual } from '@/services/climaService'
import type { ClimaActual } from '@/types/clima'

interface UseClimaParams {
  latitud: number | null
  longitud: number | null
  lugar: string | null
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

/** Loads live weather for the selected beach coordinates. */
export function useClima({ latitud, longitud, lugar }: UseClimaParams) {
  const [clima, setClima] = useState<ClimaActual | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)
    setError(null)
    getClimaActual({ latitud, longitud, lugar, signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setClima(data)
      })
      .catch((err: unknown) => {
        if (isAbortError(err) || controller.signal.aborted) return
        setError('No se pudo consultar el clima.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })
    return () => controller.abort()
  }, [latitud, longitud, lugar])
  return { clima, isLoading, error }
}
