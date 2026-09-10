import { Users, Activity, AlertTriangle } from 'lucide-react'
import type { ResumenGeneral } from '@/types/Visitante/capacidad'

interface ResumenGeneralKpisProps {
  resumen: ResumenGeneral
}

export function ResumenGeneralKpis({ resumen }: ResumenGeneralKpisProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
        <div>
          <p className="text-2xl font-semibold text-navy-900">{resumen.totalVisitantes}</p>
          <p className="text-xs text-ink-500">Visitantes ahora</p>
        </div>
        <Users className="h-6 w-6 text-ink-500" aria-hidden />
      </div>
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
        <div>
          <p className="text-2xl font-semibold text-navy-900">{resumen.ocupacionPromedio}%</p>
          <p className="text-xs text-ink-500">Ocupación promedio</p>
        </div>
        <Activity className="h-6 w-6 text-ink-500" aria-hidden />
      </div>
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5">
        <div>
          <p className="text-2xl font-semibold text-navy-900">{resumen.totalEventosActivos}</p>
          <p className="text-xs text-ink-500">Eventos activos</p>
        </div>
        <AlertTriangle className="h-6 w-6 text-ink-500" aria-hidden />
      </div>
    </div>
  )
}