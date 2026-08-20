import { useEffect, useState } from 'react'
import { getPlayasDisponibles, getOcupacionActual, registrarVisita } from '@/services/visitante/homeService'
import type { Playa } from '@/types/playas'
import type { OcupacionPlaya, RegistrarVisitaPayload } from '@/types/visitante/home'

export function useHomeVisitante() {
  const [playas, setPlayas] = useState<Playa[]>([])
  const [ocupacion, setOcupacion] = useState<OcupacionPlaya[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  useEffect(() => {
    getPlayasDisponibles()
      .then(async (data) => {
        setPlayas(data)
        setOcupacion(await getOcupacionActual(data))
      })
      .catch(() => setError('No se pudieron cargar las playas.'))
      .finally(() => setIsLoading(false))
  }, [])

  async function enviarVisita(payload: RegistrarVisitaPayload) {
    setEnviando(true)
    setEnviado(false)
    try {
      await registrarVisita(payload)
      setEnviado(true)
    } finally {
      setEnviando(false)
    }
  }

  return { playas, ocupacion, isLoading, error, enviando, enviado, enviarVisita }
}