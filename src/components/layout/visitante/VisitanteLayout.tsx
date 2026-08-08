import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import { Waves, Home, Activity, TrendingUp, FileWarning, LogOut, Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/visitante', label: 'Inicio', icon: Home, end: true },
  { to: '/visitante/ocupacion', label: 'Ocupación', icon: Activity, end: false },
  { to: '/visitante/capacidad', label: 'Capacidad de carga', icon: TrendingUp, end: false },
  { to: '/visitante/eventos', label: 'Eventos ambientales', icon: FileWarning, end: false },
]

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-navy-900 text-white' : 'text-ink-700 hover:bg-gray-100'
  }`

const mobileNavItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-navy-900 text-white' : 'text-ink-700 hover:bg-gray-100'
  }`

export function VisitanteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-900">
              <Waves className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-navy-900">SITEC</p>
              <p className="text-[10px] text-ink-500">Turismo ecológico</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Visitante">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={navItemClass}>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 text-sm md:flex">
            <span className="text-ink-500">Visitante</span>
            <Link to="/" className="flex items-center gap-1 font-medium text-ink-700 hover:text-navy-900">
              <LogOut className="h-4 w-4" aria-hidden />
              Salir
            </Link>
          </div>

          <button
            className="text-navy-900 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-gray-200 px-4 py-3 md:hidden" aria-label="Visitante">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={mobileNavItemClass} onClick={() => setMenuOpen(false)}>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </NavLink>
            ))}
            <Link
              to="/"
              className="mt-1 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Salir
            </Link>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}