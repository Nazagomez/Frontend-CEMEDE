import { Bell, BellRing } from 'lucide-react'
import type { Notificacion } from '@/types/Admin/notificaciones'

interface NotificacionCardProps {
  notificacion: Notificacion
  onMarcarLeida: (id: number) => void
}

export function NotificacionCard({ notificacion, onMarcarLeida }: NotificacionCardProps) {
  const fecha = new Date(notificacion.createdAt)
  const Icono = notificacion.leida ? Bell : BellRing

  return (
    <div className={`rounded-xl border border-gray-200 p-4 ${notificacion.leida ? 'bg-white' : 'bg-navy-900/5'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <Icono className={`mt-0.5 h-4 w-4 shrink-0 ${notificacion.leida ? 'text-ink-500' : 'text-navy-900'}`} aria-hidden />
          <div>
            <p className="font-semibold text-navy-900">{notificacion.titulo}</p>
            <p className="mt-1 text-sm text-ink-700">{notificacion.mensaje}</p>
          </div>
        </div>
        {!notificacion.leida && (
          <span className="shrink-0 rounded-full bg-alert-600 px-2 py-0.5 text-[10px] font-semibold text-white">Nueva</span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between pl-6 text-xs text-ink-500">
        <div className="flex items-center gap-3">
          <span className="font-medium text-navy-900">{notificacion.playaNombre}</span>
          <span>{fecha.toLocaleDateString('es-CR')} · {fecha.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        {!notificacion.leida && (
          <button
            onClick={() => onMarcarLeida(notificacion.id)}
            className="rounded-full border border-gray-300 px-3 py-1 font-medium text-ink-700 hover:bg-gray-50"
          >
            Marcar como leída
          </button>
        )}
      </div>
    </div>
  )
}