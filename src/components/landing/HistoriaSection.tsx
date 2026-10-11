import { Link } from 'react-router-dom'
import { Compass, ExternalLink, Landmark, Leaf, Sprout, Users, Waves, type LucideIcon } from 'lucide-react'
import costaPunta from '@/assets/costa-punta.jpg'
import costaPlaya from '@/assets/costa-playa.jpg'
import costaGolfo from '@/assets/costa-golfo.jpg'

const CEMEDE_URL = 'https://www.cemede.una.ac.cr/'

interface BloqueHistoria {
  icon: LucideIcon
  titulo: string
  texto: string
}

const bloques: BloqueHistoria[] = [
  {
    icon: Compass,
    titulo: 'De qué trata el proyecto',
    texto: 'Es un sistema de información para la capacidad turística de playas de Guanacaste. Reúne ocupación, eventos ambientales y la estimación de cuántas visitas conviene no superar.',
  },
  {
    icon: Sprout,
    titulo: 'Por qué nace',
    texto: 'En el Pacífico norte el turismo crece más rápido que la información para cuidarlo. SITEC nace para que CEMEDE y quienes visitan la costa decidan con datos, no a ciegas.',
  },
  {
    icon: Landmark,
    titulo: 'Qué es CEMEDE',
    texto: 'Unidad académica de la Universidad Nacional que atiende la problemática ambiental, social y cultural de la región Chorotega y del Trópico Seco.',
  },
]

const acciones = [
  { icon: Users, label: 'Registrar visita', to: '/visitante' },
  { icon: Waves, label: 'Ver capacidad', to: '/visitante/capacidad' },
  { icon: Leaf, label: 'Reportar evento', to: '/visitante/eventos' },
] as const

const vistas = [
  { src: costaPunta, titulo: 'Una costa con límite', texto: 'Cada punta y playa aguanta una cantidad distinta de visitas.' },
  { src: costaPlaya, titulo: 'Playas que se miden', texto: 'La ocupación y los eventos cambian cuánta gente puede entrar.' },
  { src: costaGolfo, titulo: 'El Pacífico norte', texto: 'El proyecto nace en la región Chorotega, junto al trópico seco.' },
] as const

export function HistoriaSection() {
  return (
    <section id="proyecto" className="relative px-4 pb-16 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">La historia</p>
        <h2 className="mt-2 max-w-xl text-2xl font-semibold text-white sm:text-3xl">De dónde sale SITEC</h2>
        <p className="mt-3 max-w-2xl text-sm text-white/75">
          SITEC, Sistema de Información para la Estimación de Capacidad Turística, cuida la costa de Guanacaste. Lo impulsa CEMEDE en la Sede Regional Chorotega.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {bloques.map(({ icon: Icon, titulo, texto }) => (
            <article key={titulo} className="rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                <Icon className="h-5 w-5 text-white" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{texto}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid items-center gap-6 rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/65">Centro Mesoamericano de Desarrollo Sostenible del Trópico Seco</p>
            <h3 className="mt-2 text-2xl font-semibold">CEMEDE</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Es una unidad estratégica, académica, integral, disciplinaria e interdisciplinaria, que articula sistemáticamente subprogramas, proyectos y actividades para atender y dar soluciones a la problemática económica, social, ambiental, política y cultural de la región Chorotega y, por similitud de condiciones, con proyección al Trópico Seco Mesoamericano. Trabaja con otras unidades académicas de la Universidad Nacional, otras universidades, entes estatales y organizaciones públicas y privadas de carácter nacional e internacional.
            </p>
            <a
              href={CEMEDE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              Ir al sitio de CEMEDE
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {acciones.map(({ icon: Icon, label, to }) => (
              <Link
                key={label}
                to={to}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-[#0a3944]/50 px-2 py-4 text-center text-xs font-medium text-white transition-colors hover:bg-white/15"
              >
                <Icon className="h-5 w-5" aria-hidden />
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {vistas.map((vista) => (
            <article key={vista.titulo} className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-md">
              <img src={vista.src} alt={vista.titulo} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-semibold">{vista.titulo}</h3>
                <p className="mt-1.5 text-sm text-white/75">{vista.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
