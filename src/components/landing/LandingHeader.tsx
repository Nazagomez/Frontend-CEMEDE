import { Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { InstitutionalLogos } from '@/components/brand/InstitutionalLogos'

const navLinks = [
  { id: 'proyecto', label: 'El proyecto' },
  { id: 'playas', label: 'Playas' },
  { id: 'calculadora', label: 'Calculadora' },
  { id: 'funcionalidades', label: 'Funcionalidades' },
]

function irASeccion(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function LandingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-navy-950/35 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <InstitutionalLogos tone="onDark" />

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
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15"
        >
          <LogIn className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          Acceder
        </Link>
      </div>
    </header>
  )
}