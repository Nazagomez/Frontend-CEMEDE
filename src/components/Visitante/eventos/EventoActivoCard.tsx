import { AlertTriangle } from 'lucide-react'
import type { EventoActivo } from '@/types/Visitante/eventos'
import { EventoTipoBadge } from '@/components/Admin/eventos/EventoTipoBadge'

export function EventoActivoCard({ evento }: { evento: EventoActivo }) {
  const fecha = new Date(evento.fechaInicio)
  return (
    <div className="rounded-xl border border-gray-200 border-l-4 border-l-alert-600 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-alert-600" aria-hidden />
          <div>
            <p className="font-semibold text-navy-900">{evento.titulo}</p>
            {evento.descripcion && <p className="mt-1 text-sm text-ink-500">{evento.descripcion}</p>}
          </div>
        </div>
        <EventoTipoBadge tipo={evento.tipo} />
      </div>
      <p className="mt-3 pl-6 text-xs text-ink-500">
        Vigente desde {fecha.toLocaleDateString('es-CR')} · {fecha.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  )
}