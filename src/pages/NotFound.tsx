import { Link } from 'react-router-dom'
import { MapPinOff } from 'lucide-react'
import { InstitutionalLogos } from '@/components/brand/InstitutionalLogos'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <InstitutionalLogos size="md" tone="onLight" />
      <MapPinOff className="h-10 w-10 text-navy-700" aria-hidden />
      <h1 className="text-xl font-semibold text-navy-900">Página no encontrada</h1>
      <p className="max-w-sm text-sm text-ink-500">La dirección que abriste no existe en SITEC.</p>
      <div className="flex gap-3">
        <Link to="/" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800">
          Ir al inicio
        </Link>
        <Link to="/login" className="rounded-md border border-navy-900 px-4 py-2 text-sm font-medium text-navy-900 hover:bg-navy-900 hover:text-white">
          Iniciar sesión
        </Link>
      </div>
    </div>
  )
}
