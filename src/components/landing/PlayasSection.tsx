import { Link } from 'react-router-dom'

const playas = [
  { nombre: 'Playa Grande', ubicacion: 'Santa Cruz, Guanacaste' },
  { nombre: 'Playa Junquillal', ubicacion: 'La Cruz, Guanacaste' },
]

export function PlayasSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-xl font-semibold text-navy-900">Playas Monitoreadas</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-ink-500">
          Red de playas de Guanacaste integradas al sistema de monitoreo.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {playas.map((playa) => (
            <Link
              key={playa.nombre}
              to="/visitante"
              className="rounded-xl border border-navy-900/25 bg-white px-6 py-6 text-center transition-colors hover:bg-navy-900/5"
            >
              <p className="font-semibold text-navy-900">{playa.nombre}</p>
              <p className="mt-1 text-xs text-ink-500">{playa.ubicacion}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}