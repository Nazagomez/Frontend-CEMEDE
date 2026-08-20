import { ESTADO_EVENTO_LABEL, type EstadoEvento } from '@/types/admin/eventos'

const estadoStyles: Record<EstadoEvento, string> = {
  pendiente: 'bg-alert-600/10 text-alert-600',
  aprobado: 'bg-navy-900/10 text-navy-900',
  rechazado: 'bg-gray-200 text-ink-700',
  cerrado: 'bg-gray-100 text-ink-500',
}

export function EventoEstadoBadge({ estado }: { estado: EstadoEvento }) {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${estadoStyles[estado]}`}>
      {ESTADO_EVENTO_LABEL[estado]}
    </span>
  )
}