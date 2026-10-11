import { InstitutionalLogos } from '@/components/brand/InstitutionalLogos'

export function LandingFooter() {
  return (
    <footer className="mt-auto px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-white/70 sm:flex-row">
          <InstitutionalLogos size="sm" tone="onDark" />
          <p className="text-center">Sistema de Información para la Estimación de Capacidad Turística</p>
          <p>2026 SITEC · CEMEDE</p>
        </div>
    </footer>
  )
}