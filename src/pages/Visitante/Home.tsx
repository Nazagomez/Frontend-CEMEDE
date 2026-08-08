import { BienvenidaSection } from '@/components/Visitante/home/BienvenidaSection'
import { WeatherBanner } from '@/components/Visitante/home/WeatherBanner'
import { RegistrarVisitaForm } from '@/components/Visitante/home/RegistrarVisitaForm'
import { OcupacionActualCard } from '@/components/Visitante/home/OcupacionActualCard'

export function Home() {
  return (
    <div>
      <BienvenidaSection />
      <WeatherBanner />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RegistrarVisitaForm />
        <OcupacionActualCard />
      </div>
    </div>
  )
}