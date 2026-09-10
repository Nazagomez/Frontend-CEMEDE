import { Activity } from 'lucide-react'
import type { Estimacion, EstadoOcupacion } from '@/types/Admin/capacidad'

interface EstimacionCardProps {
  estimacion: Estimacion
}

const estadoStyles: Record<EstadoOcupacion, string> = {
  normal: 'bg-green-100 text-green-700',
  advertencia: 'bg-yellow-100 text-yellow-700',
  critico: 'bg-alert-600/10 text-alert-600',
}

const estadoLabel: Record<EstadoOcupacion, string> = {
  normal: 'Normal',
  advertencia: 'Advertencia',
  critico: 'Crítico',
}

const barraColor: Record<EstadoOcupacion, string> = {
  normal: 'bg-green-500',
  advertencia: 'bg-yellow-500',
  critico: 'bg-alert-600',
}

export function EstimacionCard({ estimacion }: EstimacionCardProps) {
  const fecha = new Date(estimacion.fechaCalculo)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-navy-900">
          <Activity className="h-4 w-4" aria-hidden />
          <h2 className="font-semibold">{estimacion.playaNombre}</h2>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${estadoStyles[estimacion.estado]}`}>
          {estadoLabel[estimacion.estado]}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-ink-500">CCF · Capacidad Física</p>
          <p className="mt-1 text-2xl font-semibold text-navy-900">{Math.round(estimacion.ccf).toLocaleString('es-CR')}</p>
          <p className="text-xs text-ink-500">visitas/día</p>
        </div>
        <div>
          <p className="text-xs text-ink-500">CCR · Capacidad Real</p>
          <p className="mt-1 text-2xl font-semibold text-navy-900">{Math.round(estimacion.ccrFinal).toLocaleString('es-CR')}</p>
          <p className="text-xs text-ink-500">visitas/día</p>
        </div>
        <div>
          <p className="text-xs text-ink-500">CCE · Capacidad Efectiva</p>
          <p className="mt-1 text-2xl font-semibold text-navy-900">{Math.round(estimacion.cce).toLocaleString('es-CR')}</p>
          <p className="text-xs text-ink-500">visitas/día</p>
        </div>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-500">Ocupación actual</span>
          <span className="font-medium text-navy-900">
            {estimacion.visitantesActuales} visitantes · {estimacion.porcentajeOcupacion}% de CCR
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full ${barraColor[estimacion.estado]}`}
            style={{ width: `${Math.min(estimacion.porcentajeOcupacion, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
        <span>{estimacion.eventosActivos} evento(s) ambiental(es) activo(s) afectando el cálculo</span>
        <span>
          Calculado: {fecha.toLocaleDateString('es-CR')} {fecha.toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}