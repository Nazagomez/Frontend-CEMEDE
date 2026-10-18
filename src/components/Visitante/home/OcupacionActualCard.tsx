import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { OcupacionPlaya, NivelOcupacion } from '@/types/Visitante/home'

interface OcupacionActualCardProps {
  ocupacion: OcupacionPlaya[]
}

const nivelStyles: Record<NivelOcupacion, string> = {
  baja: 'bg-white/10 text-white',
  media: 'bg-white/10 text-white',
  alta: 'bg-white/10 text-white',
}

const nivelLabel: Record<NivelOcupacion, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
}

export function OcupacionActualCard({ ocupacion }: OcupacionActualCardProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <MapPin className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Ocupación actual</h2>
      </div>
      <p className="mt-1 text-xs text-white">Estado de ocupación en tiempo real.</p>

      <div className="mt-5 flex flex-col gap-3">
        {ocupacion.map((playa) => (
          <div key={playa.playaId} className="flex items-center justify-between rounded-lg border border-white/15 bg-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">{playa.nombre}</p>
              <p className="text-xs text-white">Actualizado {playa.actualizadoHace}</p>
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${nivelStyles[playa.nivel]}`}>
              {nivelLabel[playa.nivel]}
            </span>
          </div>
        ))}
      </div>

      <Link
        to="/visitante/capacidad"
        className="mt-4 block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/15"
      >
        Ver detalles completos
      </Link>
    </div>
  )
}