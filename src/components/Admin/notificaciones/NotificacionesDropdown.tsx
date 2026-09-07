import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, CheckCheck } from 'lucide-react'
import { useNotificacionesDropdown } from '@/hooks/admin/useNotificacionesDropdown'
import { NotificacionItemCompacto } from '@/components/Admin/notificaciones/NotificacionItemCompacto'

export function NotificacionesDropdown() {
  const { preview, noLeidasCount, isLoading, marcarLeida, marcarTodas } = useNotificacionesDropdown()
  const [abierto, setAbierto] = useState(false)
  const contenedorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickFuera(e: MouseEvent) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(false)
      }
    }
    document.addEventListener('mousedown', handleClickFuera)
    return () => document.removeEventListener('mousedown', handleClickFuera)
  }, [])

  return (
    <div ref={contenedorRef} className="relative">
      <button
        onClick={() => setAbierto((v) => !v)}
        aria-label="Notificaciones"
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-gray-100"
      >
        <Bell className="h-5 w-5" aria-hidden />
        {noLeidasCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-alert-600 px-1 text-[10px] font-semibold leading-none text-white">
            {noLeidasCount > 9 ? '9+' : noLeidasCount}
          </span>
        )}
      </button>

      {abierto && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-semibold text-navy-900">Notificaciones</p>
            {noLeidasCount > 0 && (
              <button
                onClick={marcarTodas}
                className="flex items-center gap-1 text-xs font-medium text-ink-500 hover:text-navy-900"
              >
                <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                Marcar todas
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {isLoading && <p className="px-4 py-6 text-center text-sm text-ink-500">Cargando…</p>}
            {!isLoading && preview.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-ink-500">No hay notificaciones.</p>
            )}
            {!isLoading &&
              preview.map((n) => (
                <NotificacionItemCompacto key={n.id} notificacion={n} onClick={marcarLeida} />
              ))}
          </div>

          <Link
            to="/admin/notificaciones"
            onClick={() => setAbierto(false)}
            className="block border-t border-gray-100 px-4 py-2.5 text-center text-sm font-medium text-navy-900 hover:bg-gray-50"
          >
            Ver todas
          </Link>
        </div>
      )}
    </div>
  )
}