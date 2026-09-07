import { useState, type FormEvent } from 'react'
import { MapPin, Users } from 'lucide-react'
import type { Playa } from '@/types/playas'
import type { RegistrarVisitaPayload } from '@/types/Visitante/home'

interface RegistrarVisitaFormProps {
  playas: Playa[]
  enviando: boolean
  enviado: boolean
  onSubmit: (payload: RegistrarVisitaPayload) => void
}

const DURACION_OPCIONES = [
  { value: '', label: 'No estoy seguro' },
  { value: '1', label: '1 hora' },
  { value: '2', label: '2 horas' },
  { value: '3', label: '3 horas' },
  { value: '4', label: '4 horas' },
  { value: '6', label: '6 horas' },
  { value: '8', label: 'Todo el día (8 horas)' },
]

export function RegistrarVisitaForm({ playas, enviando, enviado, onSubmit }: RegistrarVisitaFormProps) {
  const [playaId, setPlayaId] = useState<number | null>(playas[0]?.id ?? null)
  const [personas, setPersonas] = useState(1)
  const [duracion, setDuracion] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (playaId === null) return
    onSubmit({
      playaId,
      cantidadPersonas: personas,
      duracionEstimadaHoras: duracion ? Number(duracion) : undefined,
    })
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-1.5 text-navy-900">
        <MapPin className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Registrar Visita</h2>
      </div>
      <p className="mt-1 text-xs text-ink-500">Registrá tu visita para ayudarnos a monitorear la ocupación.</p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-ink-700">Selecciona una playa</label>
          <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {playas.map((playa) => (
              <button
                key={playa.id}
                type="button"
                onClick={() => setPlayaId(playa.id)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  playaId === playa.id ? 'border-navy-700 bg-navy-900 text-white' : 'border-gray-300 text-ink-700 hover:bg-gray-50'
                }`}
              >
                {playa.nombre}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="personas" className="text-sm font-medium text-ink-700">Número de personas</label>
          <div className="relative mt-1.5">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden />
            <input
              id="personas"
              type="number"
              min={1}
              value={personas}
              onChange={(e) => setPersonas(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-navy-700"
            />
          </div>
        </div>

        <div>
          <label htmlFor="duracion" className="text-sm font-medium text-ink-700">¿Cuánto tiempo aproximado vas a estar?</label>
          <select
            id="duracion"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          >
            {DURACION_OPCIONES.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-ink-500">Tu registro se cerrará automáticamente pasado ese tiempo.</p>
        </div>

        <button
          type="submit"
          disabled={enviando || playaId === null}
          className="mt-1 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {enviando ? 'Enviando…' : 'Registrar visita'}
        </button>

        {enviado && (
          <p className="text-xs text-ink-500">¡Visita registrada! Gracias por ayudarnos a monitorear la ocupación.</p>
        )}
      </form>
    </div>
  )
}