import { BienvenidaSection } from '@/components/Visitante/home/BienvenidaSection'
import { WeatherBanner } from '@/components/Visitante/home/WeatherBanner'
import { RegistrarVisitaForm } from '@/components/Visitante/home/RegistrarVisitaForm'
import { OcupacionActualCard } from '@/components/Visitante/home/OcupacionActualCard'
import { useHomeVisitante } from '@/hooks/visitante/useHomeVisitante'

export function Home() {
  const { playas, ocupacion, isLoading, error, enviando, enviado, enviarVisita } = useHomeVisitante()

  return (
    <div>
      <BienvenidaSection />
      <WeatherBanner />

      {isLoading && <p className="mt-6 text-sm text-ink-500">Cargando…</p>}
      {error && <p className="mt-6 text-sm text-alert-600">{error}</p>}

      {!isLoading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RegistrarVisitaForm playas={playas} enviando={enviando} enviado={enviado} onSubmit={enviarVisita} />
          <OcupacionActualCard ocupacion={ocupacion} />
        </div>
      )}
    </div>
  )
}