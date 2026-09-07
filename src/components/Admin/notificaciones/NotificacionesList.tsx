import type { Notificacion } from '@/types/Admin/notificaciones'
import { NotificacionCard } from '@/components/Admin/notificaciones/NotificacionCard'

interface NotificacionesListProps {
  notificaciones: Notificacion[]
  onMarcarLeida: (id: number) => void
}

export function NotificacionesList({ notificaciones, onMarcarLeida }: NotificacionesListProps) {
  if (notificaciones.length === 0) {
    return <p className="text-sm text-ink-500">No hay notificaciones en esta categoría.</p>
  }
  return (
    <div className="flex flex-col gap-3">
      {notificaciones.map((n) => (
        <NotificacionCard key={n.id} notificacion={n} onMarcarLeida={onMarcarLeida} />
      ))}
    </div>
  )
}