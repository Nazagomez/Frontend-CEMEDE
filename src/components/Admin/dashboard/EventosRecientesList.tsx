import type { EventoAmbiental } from '@/types/Admin/eventos'
import { TIPO_EVENTO_LABEL } from '@/types/Admin/eventos'

interface EventosRecientesListProps {
  eventos: EventoAmbiental[]
}

export function EventosRecientesList({ eventos }: EventosRecientesListProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="font-semibold text-navy-900">Eventos recientes</h2>
      <p className="mt-1 text-xs text-ink-500">Actividad reciente del sistema.</p>

      <div className="mt-4 flex flex-col gap-2">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className={`rounded-md border-l-4 px-4 py-2.5 text-sm ${
              evento.activo ? 'border-alert-600 bg-alert-600/5' : 'border-navy-700 bg-gray-50'
            }`}
          >
            <p className="font-medium text-navy-900">{TIPO_EVENTO_LABEL[evento.tipo]}</p>
            <p className="text-xs text-ink-500">
              {evento.playaNombre ?? 'Sin playa'} · {new Date(evento.fechaInicio).toLocaleDateString('es-CR')}
            </p>
          </div>
        ))}
        {eventos.length === 0 && <p className="text-sm text-ink-500">No hay eventos registrados todavía.</p>}
      </div>
    </div>
  )
}