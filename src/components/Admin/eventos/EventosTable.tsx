import type { EventoAmbiental } from '@/types/Admin/eventos'
import { EventoTipoBadge } from '@/components/Admin/eventos/EventoTipoBadge'

interface EventosTableProps {
  eventos: EventoAmbiental[]
  onCerrar: (eventoId: number) => void
}

export function EventosTable({ eventos, onCerrar }: EventosTableProps) {
  if (eventos.length === 0) {
    return <p className="text-sm text-ink-500">No hay eventos con estos filtros.</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 text-xs text-ink-500">
          <tr>
            <th className="px-4 py-3 font-medium">Título</th>
            <th className="px-4 py-3 font-medium">Tipo</th>
            <th className="px-4 py-3 font-medium">Playa</th>
            <th className="px-4 py-3 font-medium">Fecha inicio</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 font-medium text-navy-900">{evento.titulo}</td>
              <td className="px-4 py-3">
                <EventoTipoBadge tipo={evento.tipo} />
              </td>
              <td className="px-4 py-3 text-ink-700">{evento.playaNombre ?? '—'}</td>
              <td className="px-4 py-3 text-ink-700">
                {new Date(evento.fechaInicio).toLocaleDateString('es-CR')}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    evento.activo ? 'bg-alert-600/10 text-alert-600' : 'bg-gray-100 text-ink-500'
                  }`}
                >
                  {evento.activo ? 'Activo' : 'Cerrado'}
                </span>
              </td>
              <td className="px-4 py-3">
                {evento.activo && (
                  <button
                    onClick={() => onCerrar(evento.id)}
                    className="text-xs font-medium text-navy-700 hover:underline"
                  >
                    Cerrar evento
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}