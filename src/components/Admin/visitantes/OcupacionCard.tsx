import { Users } from 'lucide-react'
import type { Ocupacion } from '@/types/Admin/visitantes'

interface OcupacionCardProps {
  ocupacion: Ocupacion | null
  cargando: boolean
}

export function OcupacionCard({ ocupacion, cargando }: OcupacionCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-1.5 text-navy-900">
        <Users className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Ocupación actual</h2>
      </div>
      {cargando && <p className="mt-2 text-sm text-ink-500">Calculando…</p>}
      {!cargando && ocupacion && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-semibold text-navy-900">{ocupacion.totalVisitantes}</p>
            <p className="text-xs text-ink-500">Visitantes activos</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-navy-900">{ocupacion.registrosActivos}</p>
            <p className="text-xs text-ink-500">Registros abiertos</p>
          </div>
        </div>
      )}
      {!cargando && !ocupacion && <p className="mt-2 text-sm text-ink-500">Seleccioná una playa.</p>}
    </div>
  )
}