import { AlertTriangle } from 'lucide-react'
import { TIPO_EVENTO_LABEL, type EventoActivo } from '@/types/Visitante/eventos'

export function EventoActivoCard({ evento }: { evento: EventoActivo }) {
  const fecha = new Date(evento.fechaInicio)
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
          <div>
            <p className="font-semibold">{evento.titulo}</p>
            {evento.descripcion && <p className="mt-1 text-sm text-white">{evento.descripcion}</p>}
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-white">
          {TIPO_EVENTO_LABEL[evento.tipo]}
        </span>
      </div>
      <p className="mt-3 pl-6 text-xs text-white">
        Vigente desde {fecha.toLocaleDateString('es-CR')} · {fecha.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  )
}