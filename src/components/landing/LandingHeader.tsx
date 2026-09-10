import { Link } from 'react-router-dom'
import { Waves } from 'lucide-react'

const navLinks = [
  { id: 'playas', label: 'Playas' },
  { id: 'calculadora', label: 'Calculadora' },
  { id: 'funcionalidades', label: 'Funcionalidades' },
]

function irASeccion(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-navy-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10">
            <Waves className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">SITEC</p>
            <p className="hidden text-[10px] text-white/60 sm:block">Estimación de Capacidad Turística</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Landing">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => irASeccion(link.id)}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <Link
          to="/login"
          className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:bg-white/90"
        >
          Acceder
        </Link>
      </div>
    </header>
  )
}