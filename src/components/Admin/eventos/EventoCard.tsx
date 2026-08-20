import { AlertTriangle } from 'lucide-react'
import type { EventoAmbiental, EstadoEvento } from '@/types/admin/eventos'
import { EventoEstadoBadge } from '@/components/Admin/eventos/EventoEstadoBadge'

interface EventoCardProps {
  evento: EventoAmbiental
  onVerDetalle: () => void
}

const borderColor: Record<EstadoEvento, string> = {
  pendiente: 'border-l-alert-600',
  aprobado: 'border-l-navy-900',
  rechazado: 'border-l-gray-300',
  cerrado: 'border-l-gray-300',
}

function nombreReportante(evento: EventoAmbiental): string {
  if (evento.reportadoPor) return evento.reportadoPor
  if (evento.origen === 'visitante') return 'Visitante anónimo'
  return evento.origen === 'administrador' ? 'Administrador' : 'Investigador'
}

export function EventoCard({ evento, onVerDetalle }: EventoCardProps) {
  const fecha = new Date(evento.fechaInicio)

  return (
    <div className={`rounded-xl border border-gray-200 border-l-4 ${borderColor[evento.estado]} bg-white p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-alert-600" aria-hidden />
          <div>
            <p className="font-semibold text-navy-900">{evento.titulo}</p>
            {evento.descripcion && <p className="mt-1 text-sm text-ink-500">{evento.descripcion}</p>}
          </div>
        </div>
        <EventoEstadoBadge estado={evento.estado} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 pl-6 text-xs text-ink-500">
        <span className="font-medium text-navy-900">{evento.playaNombre ?? '—'}</span>
        <span>{fecha.toLocaleDateString('es-CR')}</span>
        <span>{fecha.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}</span>
        <span>{nombreReportante(evento)}</span>
        <button
          onClick={onVerDetalle}
          className="ml-auto rounded-full border border-gray-300 px-3 py-1 font-medium text-ink-700 hover:bg-gray-50"
        >
          Ver detalle
        </button>
      </div>
    </div>
  )
}