import type { PlayaResumenDashboard, EstadoOcupacion } from '@/types/admin/dashboard'

interface PlayasOcupacionListProps {
  playas: PlayaResumenDashboard[]
}

const estadoStyles: Record<EstadoOcupacion, { bar: string; badge: string }> = {
  normal: { bar: 'bg-green-500', badge: 'bg-green-100 text-green-700' },
  advertencia: { bar: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-700' },
  critico: { bar: 'bg-alert-600', badge: 'bg-alert-600/10 text-alert-600' },
}

const estadoLabel: Record<EstadoOcupacion, string> = {
  normal: 'Normal',
  advertencia: 'Advertencia',
  critico: 'Crítico',
}

export function PlayasOcupacionList({ playas }: PlayasOcupacionListProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="font-semibold text-navy-900">Ocupación por playa</h2>
      <p className="mt-1 text-xs text-ink-500">Estado actual de cada playa monitoreada.</p>

      <div className="mt-5 flex flex-col gap-4">
        {playas.map((playa) => (
          <div key={playa.id}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-navy-900">{playa.nombre}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${estadoStyles[playa.estado].badge}`}>
                {estadoLabel[playa.estado]}
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full ${estadoStyles[playa.estado].bar}`}
                style={{ width: `${Math.min(playa.porcentajeOcupacion, 100)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-ink-500">
              {playa.visitantesActuales} visitantes · {playa.porcentajeOcupacion}% ocupación · {playa.eventosActivos} evento(s) activo(s)
            </p>
          </div>
        ))}
        {playas.length === 0 && <p className="text-sm text-ink-500">No hay playas activas configuradas.</p>}
      </div>
    </div>
  )
}