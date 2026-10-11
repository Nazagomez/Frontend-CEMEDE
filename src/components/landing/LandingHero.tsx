import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function LandingHero() {
  return (
    <section className="relative flex min-h-[88vh] items-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#062833]/75 via-[#062833]/30 to-transparent [mask-image:linear-gradient(to_bottom,black_60%,transparent)]" />
      <div className="hero-fade-up relative mx-auto w-full max-w-6xl px-4 py-32 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">SITEC · CEMEDE</p>
        <h1 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          Cuidar la costa empieza por conocer su límite
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
          SITEC estima cuánta gente puede recibir una playa hoy, para que la visita no comprometa el ecosistema ni la experiencia de quienes llegan.
        </p>
        <Link
          to="/visitante"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white/90"
        >
          Continuar como visitante
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  )
}
