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
    <section id="funcionalidades" className="bg-transparent px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">Una mirada integral</p>
        <h2 className="mx-auto mt-2 max-w-xl text-2xl font-semibold text-white sm:text-3xl">Información para cuidar mejor</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/75">SITEC conecta datos ambientales y turísticos para que cada decisión tenga contexto.</p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description, to }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-2xl border border-white/15 bg-white/10 p-6 text-left text-white backdrop-blur-md transition-colors hover:bg-white/15"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <Icon className="h-5 w-5 text-white" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-white/75">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}