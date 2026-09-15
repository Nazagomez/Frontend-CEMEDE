import { RefreshCw, TrendingUp } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { tienePermiso } from '@/services/auth/permissions'
import { useCapacidad } from '@/hooks/admin/useCapacidad'
import { CapacidadPlayaSelector } from '@/components/Admin/capacidad/CapacidadPlayaSelector'
import { EstimacionCard } from '@/components/Admin/capacidad/EstimacionCard'
import { EventosActivosDetalle } from '@/components/Admin/capacidad/EventosActivosDetalle'
import { HistorialTable } from '@/components/Admin/capacidad/HistorialTable'

export function Capacidad() {
  const { user } = useAuth()
  const puedeRecalcular = user ? tienePermiso(user.permisos, 'capacidad.gestionar') : false
  const {
    playas,
    playaId,
    setPlayaId,
    estimacion,
    eventosDetalle,
    historial,
    isLoading,
    error,
    recalculando,
    recalcularError,
    recalculado,
    recalcular,
  } = useCapacidad()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold text-navy-900">
            <TrendingUp className="h-5 w-5" aria-hidden />
            Capacidad de Carga
          </h1>
          <p className="text-sm text-ink-500">Estimación actual de CCF, CCR y CCE por playa (metodología Cifuentes, 1999).</p>
        </div>
        {puedeRecalcular && (
          <button
            onClick={recalcular}
            disabled={recalculando || playaId === null}
            className="flex items-center gap-1.5 rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            {recalculando ? 'Recalculando…' : 'Recalcular y guardar'}
          </button>
        )}
      </div>

      {!puedeRecalcular && (
        <p className="rounded-md bg-navy-900/5 px-3 py-2 text-sm text-ink-700">
          Tu rol tiene acceso de solo lectura a esta sección.
        </p>
      )}

      <CapacidadPlayaSelector playas={playas} playaId={playaId} onChange={setPlayaId} />

      {isLoading && <p className="text-sm text-ink-500">Calculando…</p>}
      {error && <p className="text-sm text-alert-600">{error}</p>}
      {recalcularError && <p className="text-sm text-alert-600">{recalcularError}</p>}
      {recalculado && <p className="text-sm text-ink-500">Estimación guardada en el historial correctamente.</p>}

      {!isLoading && !error && estimacion && (
        <>
          <EstimacionCard estimacion={estimacion} />
          <EventosActivosDetalle eventos={eventosDetalle} />
          <HistorialTable historial={historial} />
        </>
      )}
    </div>
  )
}