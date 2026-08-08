import { useAuth } from '@/hooks/useAuth'
import { useDashboard } from '@/hooks/admin/useDashboard'
import { DashboardKpis } from '@/components/Admin/dashboard/DashboardKpis'
import { PlayasOcupacionList } from '@/components/Admin/dashboard/PlayasOcupacionList'
import { TendenciaChart } from '@/components/Admin/dashboard/TendenciaChart'
import { EventosRecientesList } from '@/components/Admin/dashboard/EventosRecientesList'

export function Dashboard() {
  const { user } = useAuth()
  const { data, eventosRecientes, isLoading, error } = useDashboard()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Bienvenido, {user?.nombre}</h1>
        <p className="text-sm text-ink-500 capitalize">Rol: {user?.rol}</p>
      </div>

      {isLoading && <p className="text-sm text-ink-500">Cargando dashboard…</p>}
      {error && <p className="text-sm text-alert-600">{error}</p>}

      {data && (
        <>
          <DashboardKpis data={data} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TendenciaChart tendencia={data.tendencia} nombresPlayas={data.playas.map((p) => p.nombre)} />
            <PlayasOcupacionList playas={data.playas} />
          </div>

          <EventosRecientesList eventos={eventosRecientes} />
        </>
      )}
    </div>
  )
}