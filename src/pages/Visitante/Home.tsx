import { useState } from 'react'
import { BienvenidaSection } from '@/components/Visitante/home/BienvenidaSection'
import { WeatherBanner } from '@/components/Visitante/home/WeatherBanner'
import { RegistrarVisitaForm } from '@/components/Visitante/home/RegistrarVisitaForm'
import { OcupacionActualCard } from '@/components/Visitante/home/OcupacionActualCard'
import { useClima } from '@/hooks/useClima'
import { useHomeVisitante } from '@/hooks/visitante/useHomeVisitante'

export function Home() {
  const { playas, ocupacion, isLoading, error, enviando, enviado, enviarVisita } = useHomeVisitante()
  const [playaId, setPlayaId] = useState<number | null>(null)
  const playaActiva = playas.find((playa) => playa.id === playaId) ?? playas[0] ?? null
  const lugar = playaActiva ? `${playaActiva.nombre}, ${playaActiva.provincia}` : null
  const { clima, isLoading: climaLoading, error: climaError } = useClima({
    latitud: playaActiva?.latitud ?? null,
    longitud: playaActiva?.longitud ?? null,
    lugar,
  })
  return (
    <div>
      <BienvenidaSection />
      <WeatherBanner clima={clima} isLoading={climaLoading} error={climaError} />
      {isLoading && <p className="mt-6 text-sm text-white">Cargando…</p>}
      {error && <p className="mt-6 text-sm text-red-200">{error}</p>}
      {!isLoading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RegistrarVisitaForm
            playas={playas}
            enviando={enviando}
            enviado={enviado}
            onSubmit={enviarVisita}
            onPlayaChange={setPlayaId}
          />
          <OcupacionActualCard ocupacion={ocupacion} />
        </div>
      )}
    </div>
  )
}
