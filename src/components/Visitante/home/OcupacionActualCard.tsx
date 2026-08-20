import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { OcupacionPlaya, NivelOcupacion } from '@/types/visitante/home'

interface OcupacionActualCardProps {
  ocupacion: OcupacionPlaya[]
}

const nivelStyles: Record<NivelOcupacion, string> = {
  baja: 'bg-green-100 text-green-700',
  media: 'bg-yellow-100 text-yellow-700',
  alta: 'bg-alert-600/10 text-alert-600',
}

const nivelLabel: Record<NivelOcupacion, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
}

export function OcupacionActualCard({ ocupacion }: OcupacionActualCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-1.5 text-navy-900">
        <MapPin className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Ocupación actual</h2>
      </div>
      <p className="mt-1 text-xs text-ink-500">Estado de ocupación en tiempo real.</p>

      <div className="mt-5 flex flex-col gap-3">
        {ocupacion.map((playa) => (
          <div key={playa.playaId} className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-navy-900">{playa.nombre}</p>
              <p className="text-xs text-ink-500">Actualizado {playa.actualizadoHace}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${nivelStyles[playa.nivel]}`}>
              {nivelLabel[playa.nivel]}
            </span>
          </div>
        ))}
      </div>

      <Link
        to="/visitante/ocupacion"
        className="mt-4 block rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium text-ink-700 transition-colors hover:bg-gray-50"
      >
        Ver detalles completos
      </Link>
    </div>
  )
}