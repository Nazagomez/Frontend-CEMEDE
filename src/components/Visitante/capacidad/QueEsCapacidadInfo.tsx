import { useState } from 'react'
import { Info, ChevronDown, ChevronUp } from 'lucide-react'

const CONCEPTOS = [
  {
    sigla: 'CCF',
    nombre: 'Capacidad Física',
    explicacion: 'Cuánta gente cabría en la playa en un día ideal, sin ninguna restricción — solo por el espacio disponible.',
  },
  {
    sigla: 'CCR',
    nombre: 'Capacidad Real',
    explicacion: 'Ajustada según las condiciones de hoy: mareas, clima y otros eventos ambientales activos.',
  },
  {
    sigla: 'CCE',
    nombre: 'Capacidad Efectiva',
    explicacion: 'La cifra que CEMEDE recomienda no superar, considerando también su capacidad de atención y seguridad.',
  },
]

export function QueEsCapacidadInfo() {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md">
      <button
        onClick={() => setAbierto((v) => !v)}
        className="flex w-full items-center justify-between text-left text-sm font-medium text-white"
      >
        <span className="flex items-center gap-2">
          <Info className="h-4 w-4" aria-hidden />
          ¿Qué es la capacidad de carga?
        </span>
        {abierto ? <ChevronUp className="h-4 w-4" aria-hidden /> : <ChevronDown className="h-4 w-4" aria-hidden />}
      </button>

      {abierto && (
        <>
          <p className="mt-3 text-sm text-white">
            Es la cantidad de visitantes que una playa puede recibir sin dañar su ambiente ni afectar la
            experiencia de quienes la visitan. CEMEDE la calcula según el espacio disponible y cuánto tiempo
            se queda cada persona, y la ajusta cuando hay condiciones especiales — como marea alta, marea
            roja o anidación de tortugas — que reducen temporalmente cuánta gente puede estar de forma segura.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CONCEPTOS.map((c) => (
              <div key={c.sigla} className="rounded-lg border border-white/15 bg-white/10 p-3">
                <p className="text-sm font-semibold text-white">
                  {c.sigla} <span className="font-normal text-white">· {c.nombre}</span>
                </p>
                <p className="mt-1 text-xs text-white">{c.explicacion}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}