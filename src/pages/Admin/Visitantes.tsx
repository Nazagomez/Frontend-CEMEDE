import { Users } from 'lucide-react'
import { useVisitantes } from '@/hooks/admin/useVisitantes'
import { OcupacionCard } from '@/components/Admin/visitantes/OcupacionCard'
import { RegistrarEntradaForm } from '@/components/Admin/visitantes/RegistrarEntradaForm'
import { HistorialFiltros } from '@/components/Admin/visitantes/HistorialFiltros'
import { HistorialTable } from '@/components/Admin/visitantes/HistorialTable'

export function Visitantes() {
  const {
    playas,
    playaId,
    cambiarPlaya,
    ocupacion,
    cargandoOcupacion,
    registros,
    total,
    page,
    limit,
    setPage,
    filtroFechaInicio,
    filtroFechaFin,
    aplicarFiltrosFecha,
    cargandoHistorial,
    error,
    submitting,
    actionError,
    registrarEntradaVisitante,
    registrarSalidaVisitante,
  } = useVisitantes()

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-navy-900">
          <Users className="h-5 w-5" aria-hidden />
          Gestión de visitantes
        </h1>
        <p className="text-sm text-ink-500">Registro de entradas/salidas y ocupación en tiempo real.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RegistrarEntradaForm
          playas={playas}
          playaId={playaId}
          onChangePlaya={cambiarPlaya}
          submitting={submitting}
          error={actionError}
          onSubmit={registrarEntradaVisitante}
        />
        <OcupacionCard ocupacion={ocupacion} cargando={cargandoOcupacion} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-navy-900">Historial de registros</h2>
          <HistorialFiltros fechaInicio={filtroFechaInicio} fechaFin={filtroFechaFin} onAplicar={aplicarFiltrosFecha} />
        </div>

        {cargandoHistorial && <p className="text-sm text-ink-500">Cargando historial…</p>}
        {error && <p className="text-sm text-alert-600">{error}</p>}

        {!cargandoHistorial && !error && (
          <>
            <HistorialTable registros={registros} onRegistrarSalida={registrarSalidaVisitante} />
            <div className="flex items-center justify-between text-sm text-ink-500">
              <span>{total} registros en total</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-ink-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span>Página {page} de {totalPages}</span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-ink-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}