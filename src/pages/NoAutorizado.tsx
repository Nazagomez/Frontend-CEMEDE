import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

export function NoAutorizado() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <ShieldAlert className="h-10 w-10 text-alert-600" aria-hidden />
      <h1 className="text-xl font-semibold text-navy-900">No tenés acceso a esta sección</h1>
      <p className="max-w-sm text-sm text-ink-500">Esta página está reservada para administradores.</p>
      <Link to="/admin/dashboard" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800">
        Volver al panel
      </Link>
    </div>
  )
}