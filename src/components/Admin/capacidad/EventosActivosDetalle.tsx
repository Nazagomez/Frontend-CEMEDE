import { AlertTriangle } from 'lucide-react'
import { TIPO_EVENTO_LABEL, type TipoEvento } from '@/types/Admin/eventos'
import type { EventoActivoDetalle } from '@/types/Admin/capacidad'

interface EventosActivosDetalleProps {
  eventos: EventoActivoDetalle[]
}

export function EventosActivosDetalle({ eventos }: EventosActivosDetalleProps) {
  if (eventos.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-semibold text-navy-900">Eventos afectando el cálculo</h2>
        <p className="mt-2 text-sm text-ink-500">No hay eventos ambientales activos para esta playa.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="font-semibold text-navy-900">Eventos afectando el cálculo</h2>
      <p className="mt-1 text-xs text-ink-500">Cada factor se multiplica sobre el CCF para obtener el CCR.</p>

      <div className="mt-4 flex flex-col gap-2">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="flex items-center justify-between rounded-md border-l-4 border-l-alert-600 bg-alert-600/5 px-4 py-2.5"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-alert-600" aria-hidden />
              <div>
                <p className="text-sm font-medium text-navy-900">{TIPO_EVENTO_LABEL[evento.tipo as TipoEvento] ?? evento.tipo}</p>
                <p className="text-xs text-ink-500">{evento.titulo}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-navy-900">
              FC = {evento.factorCorreccion !== null ? evento.factorCorreccion.toFixed(4) : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}