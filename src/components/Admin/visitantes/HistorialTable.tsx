import type { RegistroVisitante } from '@/types/Admin/visitantes'

interface HistorialTableProps {
  registros: RegistroVisitante[]
  onRegistrarSalida: (registroId: number) => void
}

function formatFecha(fecha: string | null): string {
  if (!fecha) return '—'
  const d = new Date(fecha)
  return `${d.toLocaleDateString('es-CR')} ${d.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}`
}

function salidaEstimada(registro: RegistroVisitante): string | null {
  if (registro.fechaSalida || !registro.duracionEstimadaHoras) return null
  const entrada = new Date(registro.fechaEntrada)
  const estimada = new Date(entrada.getTime() + registro.duracionEstimadaHoras * 60 * 60 * 1000)
  return estimada.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
}

export function HistorialTable({ registros, onRegistrarSalida }: HistorialTableProps) {
  if (registros.length === 0) {
    return <p className="text-sm text-ink-500">No hay registros para los filtros seleccionados.</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-ink-500">
          <tr>
            <th className="px-4 py-2.5">Playa</th>
            <th className="px-4 py-2.5">Entrada</th>
            <th className="px-4 py-2.5">Salida</th>
            <th className="px-4 py-2.5">Personas</th>
            <th className="px-4 py-2.5">Estado</th>
            <th className="px-4 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => {
            const estimada = salidaEstimada(registro)
            return (
              <tr key={registro.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2.5 font-medium text-navy-900">{registro.playaNombre ?? '—'}</td>
                <td className="px-4 py-2.5 text-ink-700">{formatFecha(registro.fechaEntrada)}</td>
                <td className="px-4 py-2.5 text-ink-700">
                  {registro.fechaSalida
                    ? formatFecha(registro.fechaSalida)
                    : estimada
                      ? <span className="text-ink-500">~{estimada}</span>
                      : '—'}
                </td>
                <td className="px-4 py-2.5 text-ink-700">{registro.cantidadPersonas}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      registro.fechaSalida ? 'bg-gray-100 text-ink-500' : 'bg-navy-900/10 text-navy-900'
                    }`}
                  >
                    {registro.fechaSalida ? 'Finalizado' : 'Activo'}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  {!registro.fechaSalida && (
                    <button
                      onClick={() => onRegistrarSalida(registro.id)}
                      className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-ink-700 hover:bg-gray-50"
                    >
                      Registrar salida
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}