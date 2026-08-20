import { X } from 'lucide-react'
import { TIPO_EVENTO_LABEL, type EventoAmbiental } from '@/types/admin/eventos'
import { EventoEstadoBadge } from '@/components/Admin/eventos/EventoEstadoBadge'

interface EventoDetalleModalProps {
  evento: EventoAmbiental
  onClose: () => void
  onAprobar: (id: number) => void
  onRechazar: (id: number) => void
  onFinalizar: (id: number) => void
}

const rowClass = 'flex items-center justify-between text-sm'
const labelClass = 'text-ink-500'
const valueClass = 'font-medium text-navy-900'

function nombreReportante(evento: EventoAmbiental): string {
  if (evento.reportadoPor) return evento.reportadoPor
  if (evento.origen === 'visitante') return 'Visitante anónimo'
  return evento.origen === 'administrador' ? 'Administrador' : 'Investigador'
}

export function EventoDetalleModal({ evento, onClose, onAprobar, onRechazar, onFinalizar }: EventoDetalleModalProps) {
  const fecha = new Date(evento.fechaInicio)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-navy-900">Detalle del reporte</h2>
          <button onClick={onClose} aria-label="Cerrar" className="text-ink-500 hover:text-ink-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className={rowClass}>
            <span className={labelClass}>Estado</span>
            <EventoEstadoBadge estado={evento.estado} />
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Tipo</span>
            <span className={valueClass}>{TIPO_EVENTO_LABEL[evento.tipo]}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Playa</span>
            <span className={valueClass}>{evento.playaNombre ?? '—'}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Fecha y hora</span>
            <span className={valueClass}>
              {fecha.toLocaleDateString('es-CR')} · {fecha.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Reportado por</span>
            <span className={valueClass}>{nombreReportante(evento)}</span>
          </div>
        </div>

        {evento.descripcion && (
          <div className="mt-4 rounded-lg bg-gray-50 p-3">
            <p className="text-xs font-medium text-ink-500">Descripción</p>
            <p className="mt-1 text-sm text-ink-700">{evento.descripcion}</p>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2">
          {evento.estado === 'pendiente' && (
            <div className="flex gap-2">
              <button
                onClick={() => onAprobar(evento.id)}
                className="flex-1 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800"
              >
                Aprobar
              </button>
              <button
                onClick={() => onRechazar(evento.id)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50"
              >
                Rechazar
              </button>
            </div>
          )}
          {evento.estado === 'aprobado' && (
            <button
              onClick={() => onFinalizar(evento.id)}
              className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800"
            >
              Marcar como finalizado
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}