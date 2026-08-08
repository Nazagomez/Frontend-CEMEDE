import { Users, Activity, TrendingUp, FileWarning, type LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Users,
    title: 'Registro de Visitantes',
    description: 'Control y seguimiento de afluencia turística en tiempo real.',
  },
  {
    icon: Activity,
    title: 'Ocupación de Playas',
    description: 'Visualización del nivel de ocupación actual de cada playa.',
  },
  {
    icon: TrendingUp,
    title: 'Capacidad de Carga',
    description: 'Estimaciones de CCF, CCR y CCE para turismo sostenible.',
  },
  {
    icon: FileWarning,
    title: 'Eventos Ambientales',
    description: 'Alertas y reportes sobre condiciones ambientales.',
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-xl font-semibold text-navy-900">Funcionalidades del sistema</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-ink-500">
          Herramientas diseñadas para el monitoreo y gestión sostenible del turismo costero.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-gray-200 bg-white p-5 text-left">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-alert-600/10">
                <Icon className="h-4.5 w-4.5 text-alert-600" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-navy-900">{title}</h3>
              <p className="mt-1 text-xs text-ink-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}