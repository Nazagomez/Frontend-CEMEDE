import { TrendingUp } from 'lucide-react'
import { useCapacidadVisitante } from '@/hooks/visitante/useCapacidadVisitante'
import { QueEsCapacidadInfo } from '@/components/Visitante/capacidad/QueEsCapacidadInfo'
import { ResumenGeneralKpis } from '@/components/Visitante/capacidad/ResumenGeneralKpis'
import { EstimacionPlayaCard } from '@/components/Visitante/capacidad/EstimacionPlayaCard'
import { EventosQueAfectanList } from '@/components/Visitante/capacidad/EventosQueAfectanList'

export function Capacidad() {
  const { estimaciones, factores, resumen, isLoading, error } = useCapacidadVisitante()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-white">
          <TrendingUp className="h-5 w-5" aria-hidden />
          Capacidad de Carga Turística
        </h1>
        <p className="text-sm text-white">Estado actual de ocupación y capacidad de cada playa monitoreada.</p>
      </div>

      <QueEsCapacidadInfo />

      {isLoading && <p className="text-sm text-white">Cargando…</p>}
      {error && <p className="text-sm text-red-200">{error}</p>}

      {!isLoading && !error && (
        <>
          <ResumenGeneralKpis resumen={resumen} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {estimaciones.map((e) => (
              <EstimacionPlayaCard key={e.playaId} estimacion={e} />
            ))}
          </div>

          <EventosQueAfectanList factores={factores} />
        </>
      )}
    </div>
  )
}