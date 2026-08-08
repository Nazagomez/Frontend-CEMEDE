import { Link } from 'react-router-dom'
import { Waves } from 'lucide-react'

export function LandingHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-navy-900">
            <Waves className="h-5 w-5 text-white" strokeWidth={2.25} aria-hidden />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-navy-900">SITEC</p>
            <p className="hidden text-[10px] text-ink-500 sm:block">Estimación de Capacidad Turística</p>
          </div>
        </div>
        <Link
          to="/login"
          className="shrink-0 rounded-md bg-navy-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800 sm:px-4"
        >
          Acceder
        </Link>
      </div>
    </header>
  )
}