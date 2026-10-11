import { AlertTriangle } from 'lucide-react'
import { TIPO_EVENTO_LABEL } from '@/types/Admin/eventos'
import type { TipoEvento } from '@/types/Admin/eventos'
import type { FactorEvento } from '@/types/Visitante/capacidad'

interface EventosQueAfectanListProps {
  factores: FactorEvento[]
}

function textoImpacto(factorCorreccion: number | null): string {
  if (factorCorreccion === null) return 'Sin datos suficientes todavía'
  const reduccion = Math.round((1 - factorCorreccion) * 100)
  if (reduccion <= 0) return 'Sin reducción por el momento'
  return `Reduce la capacidad en ${reduccion}%`
}

export function EventosQueAfectanList({ factores }: EventosQueAfectanListProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md">
      <h2 className="font-semibold">Qué está afectando la capacidad hoy</h2>
      <p className="mt-1 text-xs text-white">Eventos ambientales activos que pueden reducir cuánta gente cabe en cada playa.</p>

      {factores.length === 0 ? (
        <p className="mt-4 text-sm text-white">No hay eventos ambientales activos en este momento.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {factores.map((f, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-white/15 bg-white/10 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-white" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-white">{TIPO_EVENTO_LABEL[f.tipo as TipoEvento] ?? f.tipo}</p>
                  <p className="text-xs text-white">{f.playaNombre} · {f.titulo}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-white">{textoImpacto(f.factorCorreccion)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}