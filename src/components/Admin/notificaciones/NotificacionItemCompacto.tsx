import type { Notificacion } from '@/types/Admin/notificaciones'

interface NotificacionItemCompactoProps {
  notificacion: Notificacion
  onClick: (id: number) => void
}

export function NotificacionItemCompacto({ notificacion, onClick }: NotificacionItemCompactoProps) {
  const fecha = new Date(notificacion.createdAt)
  return (
    <button
      onClick={() => onClick(notificacion.id)}
      className={`flex w-full items-start gap-2 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
        notificacion.leida ? '' : 'bg-navy-900/5'
      }`}
    >
      <span
        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${notificacion.leida ? 'bg-transparent' : 'bg-alert-600'}`}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-navy-900">{notificacion.titulo}</p>
        <p className="mt-0.5 line-clamp-2 text-xs text-ink-500">{notificacion.mensaje}</p>
        <p className="mt-1 text-[11px] text-ink-500">
          {notificacion.playaNombre} · {fecha.toLocaleDateString('es-CR')} {fecha.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </button>
  )
}