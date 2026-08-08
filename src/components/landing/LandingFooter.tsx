import { Waves } from 'lucide-react'

export function LandingFooter() {
  return (
    <footer className="mt-auto bg-navy-900 px-6 py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-white/70 sm:flex-row">
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4" aria-hidden />
          <div className="leading-tight">
            <p className="font-medium text-white">SITEC</p>
            <p>Estimación de Capacidad Turística</p>
          </div>
        </div>
        <p>Sistema de Información para la Estimación de Capacidad Turística</p>
        <p>2026 SITEC</p>
      </div>
    </footer>
  )
}