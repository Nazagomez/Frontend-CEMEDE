import { Users, Activity, AlertTriangle } from 'lucide-react'
import type { ResumenGeneral } from '@/types/Visitante/capacidad'

interface ResumenGeneralKpisProps {
  resumen: ResumenGeneral
}

export function ResumenGeneralKpis({ resumen }: ResumenGeneralKpisProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
        <div>
          <p className="text-2xl font-semibold">{resumen.totalVisitantes}</p>
          <p className="text-xs text-white">Visitantes ahora</p>
        </div>
        <Users className="h-6 w-6 text-white" aria-hidden />
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
        <div>
          <p className="text-2xl font-semibold">{resumen.ocupacionPromedio}%</p>
          <p className="text-xs text-white">Ocupación promedio</p>
        </div>
        <Activity className="h-6 w-6 text-white" aria-hidden />
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
        <div>
          <p className="text-2xl font-semibold">{resumen.totalEventosActivos}</p>
          <p className="text-xs text-white">Eventos activos</p>
        </div>
        <AlertTriangle className="h-6 w-6 text-white" aria-hidden />
      </div>
    </div>
  )
}