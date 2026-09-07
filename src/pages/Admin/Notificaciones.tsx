import { Bell, CheckCheck } from 'lucide-react'
import { useNotificaciones } from '@/hooks/admin/useNotificaciones'
import { NotificacionesTabs } from '@/components/Admin/notificaciones/NotificacionesTabs'
import { NotificacionesList } from '@/components/Admin/notificaciones/NotificacionesList'

export function Notificaciones() {
  const { notificaciones, filtro, setFiltro, isLoading, error, actionError, marcarLeida, marcarTodas, noLeidasCount } =
    useNotificaciones()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold text-navy-900">
            <Bell className="h-5 w-5" aria-hidden />
            Notificaciones
          </h1>
          <p className="text-sm text-ink-500">Alertas de eventos ambientales y ocupación.</p>
        </div>
        {noLeidasCount > 0 && (
          <button
            onClick={marcarTodas}
            className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-gray-50"
          >
            <CheckCheck className="h-4 w-4" aria-hidden />
            Marcar todas como leídas
          </button>
        )}
      </div>

      <NotificacionesTabs filtro={filtro} onChange={setFiltro} />

      {isLoading && <p className="text-sm text-ink-500">Cargando notificaciones…</p>}
      {error && <p className="text-sm text-alert-600">{error}</p>}
      {actionError && <p className="text-sm text-alert-600">{actionError}</p>}

      {!isLoading && !error && <NotificacionesList notificaciones={notificaciones} onMarcarLeida={marcarLeida} />}
    </div>
  )
}