import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useEventos } from '@/hooks/admin/useEventos'
import { usePlayasList } from '@/hooks/usePlayasList'
import { EventosTabs } from '@/components/Admin/eventos/EventosTabs'
import { EventosList } from '@/components/Admin/eventos/EventosList'
import { EventoDetalleModal } from '@/components/Admin/eventos/EventoDetalleModal'
import { CrearEventoModal } from '@/components/Admin/eventos/CrearEventoModal'
import type { EventoAmbiental } from '@/types/admin/eventos'

export function Eventos() {
  const { eventos, pendientesCount, isLoading, error, actionError, tab, setTab, aprobar, rechazar, cerrar, crear } =
    useEventos()
  const { playas } = usePlayasList()
  const [mostrarCrear, setMostrarCrear] = useState(false)
  const [detalle, setDetalle] = useState<EventoAmbiental | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleCrear(payload: Parameters<typeof crear>[0]) {
    setSubmitting(true)
    const ok = await crear(payload)
    setSubmitting(false)
    return ok
  }

  async function handleAprobar(id: number) {
    await aprobar(id)
    setDetalle(null)
  }

  async function handleRechazar(id: number) {
    await rechazar(id)
    setDetalle(null)
  }

  async function handleFinalizar(id: number) {
    await cerrar(id)
    setDetalle(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Gestión de eventos ambientales</h1>
          <p className="text-sm text-ink-500">Revisión, aprobación y gestión de reportes ambientales.</p>
        </div>
        <div className="flex items-center gap-2">
          {pendientesCount > 0 && (
            <span className="rounded-full bg-alert-600/10 px-3 py-1.5 text-sm font-medium text-alert-600">
              {pendientesCount} {pendientesCount === 1 ? 'Pendiente' : 'Pendientes'}
            </span>
          )}
          <button
            onClick={() => setMostrarCrear(true)}
            className="flex items-center gap-1.5 rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Registrar evento
          </button>
        </div>
      </div>

      <EventosTabs tab={tab} onChange={setTab} />

      {isLoading && <p className="text-sm text-ink-500">Cargando eventos…</p>}
      {error && <p className="text-sm text-alert-600">{error}</p>}
      {actionError && <p className="text-sm text-alert-600">{actionError}</p>}

      {!isLoading && !error && <EventosList eventos={eventos} onVerDetalle={setDetalle} />}

      {mostrarCrear && (
        <CrearEventoModal
          playas={playas}
          onClose={() => setMostrarCrear(false)}
          onSubmit={handleCrear}
          submitting={submitting}
          error={actionError}
        />
      )}

      {detalle && (
        <EventoDetalleModal
          evento={detalle}
          onClose={() => setDetalle(null)}
          onAprobar={handleAprobar}
          onRechazar={handleRechazar}
          onFinalizar={handleFinalizar}
        />
      )}
    </div>
  )
}