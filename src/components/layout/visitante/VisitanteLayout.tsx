import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import { Home, TrendingUp, FileWarning, LogOut, Menu, X } from 'lucide-react'
import { InstitutionalLogos } from '@/components/brand/InstitutionalLogos'
import heroCosta from '@/assets/hero-costa.jpg'

const HERO_VIDEO = '/hero-pacifico.m4v'

const navLinks = [
  { to: '/visitante', label: 'Inicio', icon: Home, end: true },
  { to: '/visitante/capacidad', label: 'Ocupación y capacidad', icon: TrendingUp, end: false },
  { to: '/visitante/eventos', label: 'Eventos ambientales', icon: FileWarning, end: false },
]

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
  }`

const mobileNavItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
  }`

export function VisitanteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#062833]" aria-hidden>
        <img src={heroCosta} alt="" className="hero-still absolute inset-0 h-full w-full object-cover object-[center_40%]" />
        <video className="hero-video absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" poster={heroCosta}>
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#062833]/45" />
      </div>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#062833]/35 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <InstitutionalLogos tone="onDark" />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Visitante">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={navItemClass}>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 text-sm md:flex">
            <span className="text-white/80">Visitante</span>
            <Link to="/" className="flex items-center gap-1 font-medium text-white hover:text-white/80">
              <LogOut className="h-4 w-4" aria-hidden />
              Salir
            </Link>
          </div>

          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 md:hidden" aria-label="Visitante">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={mobileNavItemClass} onClick={() => setMenuOpen(false)}>
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </NavLink>
            ))}
            <Link
              to="/"
              className="mt-1 flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
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