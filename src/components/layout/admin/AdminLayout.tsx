import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Waves, LayoutDashboard, Users, FileWarning, TrendingUp, MapPin, LogOut, Menu, X, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { ROL_LABEL, tienePermiso } from '@/services/auth/permissions'
import { NotificacionesDropdown } from '@/components/Admin/notificaciones/NotificacionesDropdown'

const navItemsBase = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/visitantes', label: 'Visitantes', icon: Users },
  { to: '/admin/eventos', label: 'Eventos ambientales', icon: FileWarning },
  { to: '/admin/capacidad', label: 'Capacidad de Carga', icon: TrendingUp },
  { to: '/admin/playas', label: 'Playas monitoreadas', icon: MapPin },
]

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
  }`

export function AdminLayout() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    ...navItemsBase,
    ...(user && tienePermiso(user.permisos, 'usuarios.gestionar')
      ? [{ to: '/admin/usuarios', label: 'Usuarios', icon: ShieldCheck }]
      : []),
  ]

  const sidebarContent = (
    <>
      <div className="flex items-center gap-2 px-2 pb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
          <Waves className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">SITEC</p>
          <p className="text-[10px] text-white/60">Panel investigador</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Panel admin">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navItemClass} onClick={() => setMenuOpen(false)}>
            <Icon className="h-4 w-4" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="truncate px-2 text-sm font-medium text-white">{user?.nombre}</p>
        <p className="px-2 text-xs text-white/50">{user ? ROL_LABEL[user.rol] : ''}</p>
        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Cerrar sesión
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen md:flex">
      <div className="flex items-center justify-between bg-navy-900 px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <Waves className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden />
          <span className="text-sm font-semibold text-white">SITEC</span>
        </div>
        <div className="flex items-center gap-1">
          <NotificacionesDropdown />
          <button className="text-white" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-navy-900 px-3 py-4">
            {sidebarContent}
          </aside>
        </div>
      )}

      <aside className="hidden w-60 shrink-0 flex-col bg-navy-900 px-3 py-4 md:flex">
        {sidebarContent}
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="hidden items-center justify-end border-b border-gray-200 bg-white px-4 py-3 sm:px-8 md:flex">
          <NotificacionesDropdown />
        </header>
        <main className="flex-1 bg-gray-50 px-4 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}