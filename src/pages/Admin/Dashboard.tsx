import { RefreshCw } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useDashboard } from '@/hooks/admin/useDashboard'
import { ROL_LABEL } from '@/services/auth/permissions'
import { DashboardKpis } from '@/components/Admin/dashboard/DashboardKpis'
import { PlayasOcupacionList } from '@/components/Admin/dashboard/PlayasOcupacionList'
import { TendenciaChart } from '@/components/Admin/dashboard/TendenciaChart'
import { EventosRecientesList } from '@/components/Admin/dashboard/EventosRecientesList'

export function Dashboard() {
  const { user } = useAuth()
  const { data, eventosRecientes, isLoading, error, refrescar } = useDashboard()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Bienvenido, {user?.nombre}</h1>
          <p className="text-sm text-ink-500">Rol: {user ? ROL_LABEL[user.rol] : ''}</p>
        </div>
        <button
          onClick={refrescar}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Actualizar
        </button>
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