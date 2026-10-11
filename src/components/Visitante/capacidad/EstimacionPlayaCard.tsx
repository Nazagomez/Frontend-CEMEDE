import type { EstimacionPlaya, EstadoOcupacion } from '@/types/Visitante/capacidad'

interface EstimacionPlayaCardProps {
  estimacion: EstimacionPlaya
}

const estadoBadge: Record<EstadoOcupacion, string> = {
  normal: 'bg-white/10 text-white',
  advertencia: 'bg-white/10 text-white',
  critico: 'bg-white/10 text-white',
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
      <div className="flex items-center justify-between text-xs text-white">
        <span>{label}</span>
        <span className="font-medium">{Math.round(valor).toLocaleString('es-CR')}</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/15">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function EstimacionPlayaCard({ estimacion }: EstimacionPlayaCardProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{estimacion.playaNombre}</p>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${estadoBadge[estimacion.estado]}`}>
          {estadoLabel[estimacion.estado]}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <Barra label="CCF · Capacidad Física" valor={estimacion.ccf} max={estimacion.ccf} color="bg-white" />
        <Barra label="CCR · Capacidad Real" valor={estimacion.ccrFinal} max={estimacion.ccf} color="bg-white/70" />
        <Barra label="CCE · Capacidad Efectiva" valor={estimacion.cce} max={estimacion.ccf} color="bg-white/45" />
      </div>

      <p className="mt-3 text-xs text-white">
        {estimacion.visitantesActuales} visitantes ahora · {estimacion.porcentajeOcupacion}% de la capacidad real
      </p>
    </div>
  )
}