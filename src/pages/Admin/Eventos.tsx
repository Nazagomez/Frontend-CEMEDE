import { useEventos } from '@/hooks/admin/useEventos'
import { EventosFiltros } from '@/components/Admin/eventos/EventosFiltros'
import { EventosTable } from '@/components/Admin/eventos/EventosTable'

export function Eventos() {
  const { eventos, isLoading, error, tipo, setTipo, activo, setActivo, cerrar } = useEventos()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Gestión de eventos ambientales</h1>
        <p className="text-sm text-ink-500">Eventos que afectan la capacidad de carga de las playas.</p>
      </div>

      <EventosFiltros tipo={tipo} activo={activo} onTipoChange={setTipo} onActivoChange={setActivo} />

      {isLoading && <p className="text-sm text-ink-500">Cargando eventos…</p>}
      {error && <p className="text-sm text-alert-600">{error}</p>}
      {!isLoading && !error && <EventosTable eventos={eventos} onCerrar={cerrar} />}
    </div>
  )
}