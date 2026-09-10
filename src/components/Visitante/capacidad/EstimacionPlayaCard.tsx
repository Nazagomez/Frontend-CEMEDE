import type { EstimacionPlaya, EstadoOcupacion } from '@/types/Visitante/capacidad'

interface EstimacionPlayaCardProps {
  estimacion: EstimacionPlaya
}

const estadoBadge: Record<EstadoOcupacion, string> = {
  normal: 'bg-green-100 text-green-700',
  advertencia: 'bg-yellow-100 text-yellow-700',
  critico: 'bg-alert-600/10 text-alert-600',
}

const estadoLabel: Record<EstadoOcupacion, string> = {
  normal: 'Normal',
  advertencia: 'Advertencia',
  critico: 'Crítico',
}

function Barra({ label, valor, max, color }: { label: string; valor: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((valor / max) * 100, 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-ink-500">
        <span>{label}</span>
        <span className="font-medium text-navy-900">{Math.round(valor).toLocaleString('es-CR')}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function EstimacionPlayaCard({ estimacion }: EstimacionPlayaCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-navy-900">{estimacion.playaNombre}</p>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${estadoBadge[estimacion.estado]}`}>
          {estadoLabel[estimacion.estado]}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Barra label="CCF · Capacidad Física" valor={estimacion.ccf} max={estimacion.ccf} color="bg-navy-900" />
        <Barra label="CCR · Capacidad Real" valor={estimacion.ccrFinal} max={estimacion.ccf} color="bg-navy-700" />
        <Barra label="CCE · Capacidad Efectiva" valor={estimacion.cce} max={estimacion.ccf} color="bg-alert-600" />
      </div>

      <p className="mt-3 text-xs text-ink-500">
        {estimacion.visitantesActuales} visitantes ahora · {estimacion.porcentajeOcupacion}% de la capacidad real
      </p>
    </div>
  )
}