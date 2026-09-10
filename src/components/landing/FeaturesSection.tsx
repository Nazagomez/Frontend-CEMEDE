import { Link } from 'react-router-dom'
import { Users, Activity, FileWarning, type LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  to: string
}

const features: Feature[] = [
  { icon: Users, title: 'Registro de visitantes', description: 'Conocé la afluencia actual sin recolectar datos personales.', to: '/visitante' },
  { icon: Activity, title: 'Ocupación y capacidad', description: 'Entendé cuánta gente puede recibir cada playa hoy y por qué.', to: '/visitante/capacidad' },
  { icon: FileWarning, title: 'Eventos ambientales', description: 'Alertas y reportes sobre mareas, clima y condiciones que afectan la playa.', to: '/visitante/eventos' },
]

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-navy-700">Una mirada integral</p>
        <h2 className="mx-auto mt-2 max-w-xl text-2xl font-semibold text-navy-900 sm:text-3xl">Información para cuidar mejor</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink-500">SITEC conecta datos ambientales y turísticos para que cada decisión tenga contexto.</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-2xl border border-gray-200 bg-slate-50 p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-900/20 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-alert-600/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-alert-600/20">
                <Icon className="h-5 w-5 text-alert-600" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold text-navy-900">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-500">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}