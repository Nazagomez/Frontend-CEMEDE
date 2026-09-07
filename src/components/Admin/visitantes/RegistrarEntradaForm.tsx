import { useState, type FormEvent } from 'react'
import { UserPlus } from 'lucide-react'
import type { Playa } from '@/types/playas'

interface RegistrarEntradaFormProps {
  playas: Playa[]
  playaId: number | null
  onChangePlaya: (id: number) => void
  submitting: boolean
  error: string | null
  onSubmit: (payload: { playaId: number; cantidadPersonas: number; duracionEstimadaHoras?: number; observaciones?: string }) => Promise<boolean>
}

const DURACION_OPCIONES = [
  { value: '', label: 'Sin estimar (cerrar manualmente)' },
  { value: '1', label: '1 hora' },
  { value: '2', label: '2 horas' },
  { value: '3', label: '3 horas' },
  { value: '4', label: '4 horas' },
  { value: '6', label: '6 horas' },
  { value: '8', label: 'Todo el día (8 horas)' },
]

export function RegistrarEntradaForm({ playas, playaId, onChangePlaya, submitting, error, onSubmit }: RegistrarEntradaFormProps) {
  const [cantidad, setCantidad] = useState(1)
  const [duracion, setDuracion] = useState('')
  const [observaciones, setObservaciones] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (playaId === null) return
    const ok = await onSubmit({
      playaId,
      cantidadPersonas: cantidad,
      duracionEstimadaHoras: duracion ? Number(duracion) : undefined,
      observaciones: observaciones || undefined,
    })
    if (ok) {
      setCantidad(1)
      setDuracion('')
      setObservaciones('')
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-1.5 text-navy-900">
        <UserPlus className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Registrar entrada</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-ink-700">Playa</label>
          <select
            required
            value={playaId ?? ''}
            onChange={(e) => onChangePlaya(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          >
            <option value="" disabled>Selecciona una playa</option>
            {playas.map((playa) => (
              <option key={playa.id} value={playa.id}>{playa.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">Cantidad de personas</label>
          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">Duración estimada</label>
          <select
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          >
            {DURACION_OPCIONES.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">Observaciones (opcional)</label>
          <input
            type="text"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          />
        </div>

        {error && <p className="text-sm text-alert-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting || playaId === null}
          className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
        >
          {submitting ? 'Registrando…' : 'Registrar entrada'}
        </button>
      </form>
    </div>
  )
}