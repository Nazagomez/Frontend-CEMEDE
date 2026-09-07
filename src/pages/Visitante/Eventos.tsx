import { FileWarning } from 'lucide-react'
import { useEventosVisitante } from '@/hooks/visitante/useEventosVisitante'
import { EventoPlayaSelector } from '@/components/Visitante/eventos/EventoPlayaSelector'
import { EventosActivosList } from '@/components/Visitante/eventos/EventosActivosList'
import { ReportarEventoForm } from '@/components/Visitante/eventos/ReportarEventoForm'

export function Eventos() {
  const {
    playas,
    cargandoPlayas,
    playaId,
    setPlayaId,
    eventos,
    isLoading,
    error,
    enviando,
    enviado,
    enviarError,
    reportar,
  } = useEventosVisitante()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-navy-900">
          <FileWarning className="h-5 w-5" aria-hidden />
          Eventos ambientales
        </h1>
        <p className="text-sm text-ink-500">Consultá alertas activas y reportá condiciones fuera de lo normal.</p>
      </div>

      {cargandoPlayas && <p className="text-sm text-ink-500">Cargando playas…</p>}

      {!cargandoPlayas && (
        <>
          <EventoPlayaSelector playas={playas} playaId={playaId} onChange={setPlayaId} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-navy-900">Eventos activos</h2>
              {isLoading && <p className="text-sm text-ink-500">Cargando eventos…</p>}
              {error && <p className="text-sm text-alert-600">{error}</p>}
              {!isLoading && !error && <EventosActivosList eventos={eventos} />}
            </div>

            <ReportarEventoForm
              disabled={playaId === null}
              enviando={enviando}
              enviado={enviado}
              error={enviarError}
              onSubmit={reportar}
            />
          </div>
        </>
      )}
    </div>
  )
}