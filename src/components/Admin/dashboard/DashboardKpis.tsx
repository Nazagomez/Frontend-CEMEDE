import { MapPin, Users, Activity, FileWarning } from 'lucide-react'
import type { DashboardGeneral } from '@/types/Admin/dashboard'

interface DashboardKpisProps {
  data: DashboardGeneral
}

export function DashboardKpis({ data }: DashboardKpisProps) {
  const kpis = [
    { label: 'Playas activas', value: data.totalPlayas, icon: MapPin },
    { label: 'Visitantes actuales', value: data.totalVisitantes, icon: Users },
    { label: 'Ocupación promedio', value: `${data.promedioOcupacion}%`, icon: Activity },
    { label: 'Eventos activos', value: data.totalEventosActivos, icon: FileWarning },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-ink-500">{label}</p>
            <Icon className="h-4 w-4 text-ink-500" aria-hidden />
          </div>
          <p className="mt-2 text-2xl font-semibold text-navy-900">{value}</p>
        </div>
      ))}
    </div>
  )
}