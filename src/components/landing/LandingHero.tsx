import { Link } from 'react-router-dom'

export function LandingHero() {
  return (
    <section className="px-4 py-14 text-center sm:px-6 sm:py-20">
      <h1 className="mx-auto max-w-2xl text-2xl font-semibold text-navy-900 sm:text-3xl lg:text-4xl">
        Sistema de Información para la Estimación de Capacidad Turística
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm text-ink-500">
        Monitorea la ocupación y capacidad turística en Playa Junquillal y Playa Grande
        para apoyar un turismo más sostenible.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/visitante"
          className="w-full rounded-md bg-navy-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 sm:w-auto"
        >
          Continuar como visitante
        </Link>
        <Link
          to="/login"
          className="w-full rounded-md border border-navy-900 px-5 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-white sm:w-auto"
        >
          Acceso investigador
        </Link>
      </div>
    </section>
  )
}