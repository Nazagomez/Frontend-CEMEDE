import type { HistorialItem } from '@/types/Admin/capacidad'

interface HistorialTableProps {
  historial: HistorialItem[]
}

function formatFecha(fecha: string): string {
  const d = new Date(fecha)
  return `${d.toLocaleDateString('es-CR')} ${d.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}`
}

export function HistorialTable({ historial }: HistorialTableProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="font-semibold text-navy-900">Historial de estimaciones</h2>
      <p className="mt-1 text-xs text-ink-500">Cada cálculo guardado con "Recalcular y guardar" queda registrado acá.</p>

      {historial.length === 0 ? (
        <p className="mt-4 text-sm text-ink-500">Todavía no hay estimaciones guardadas para esta playa.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 text-xs uppercase text-ink-500">
              <tr>
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">CCF</th>
                <th className="py-2 pr-4">CCR</th>
                <th className="py-2 pr-4">CCE</th>
                <th className="py-2 pr-4">Visitantes</th>
                <th className="py-2">Ocupación</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-2.5 pr-4 text-ink-700">{formatFecha(item.fechaCalculo)}</td>
                  <td className="py-2.5 pr-4 text-ink-700">{Math.round(item.ccf).toLocaleString('es-CR')}</td>
                  <td className="py-2.5 pr-4 text-ink-700">{Math.round(item.ccrFinal).toLocaleString('es-CR')}</td>
                  <td className="py-2.5 pr-4 text-ink-700">{Math.round(item.cce).toLocaleString('es-CR')}</td>
                  <td className="py-2.5 pr-4 text-ink-700">{item.visitantesActuales}</td>
                  <td className="py-2.5 font-medium text-navy-900">{item.porcentajeOcupacion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}