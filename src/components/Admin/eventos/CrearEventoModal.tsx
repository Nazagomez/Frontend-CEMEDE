import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { TIPO_EVENTO_LABEL, type TipoEvento, type CrearEventoPayload } from '@/types/admin/eventos'
import type { Playa } from '@/types/playas'

interface CrearEventoModalProps {
  playas: Playa[]
  onClose: () => void
  onSubmit: (payload: CrearEventoPayload) => Promise<boolean>
  submitting: boolean
  error: string | null
}

const inputClass = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700'
const labelClass = 'text-sm font-medium text-ink-700'

export function CrearEventoModal({ playas, onClose, onSubmit, submitting, error }: CrearEventoModalProps) {
  const [playaId, setPlayaId] = useState<number | null>(playas[0]?.id ?? null)
  const [tipo, setTipo] = useState<TipoEvento>('otro')
  const [descripcion, setDescripcion] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (playaId === null) return
    const playaSeleccionada = playas.find((p) => p.id === playaId)

    // Valores que el backend exige pero el formulario (por diseño) no pide:
    // - título: se genera del tipo de evento
    // - fecha de inicio: el momento del registro
    // - parte_afectada / totalidad_analizada: quedan en 0 / área total de la
    //   playa, por lo que el factor de corrección nace en 1.0 (sin reducción)
    //   hasta que alguien lo ajuste con datos reales más adelante.
    const ok = await onSubmit({
      playaId,
      tipo,
      titulo: TIPO_EVENTO_LABEL[tipo],
      descripcion: descripcion || undefined,
      fechaInicio: new Date().toISOString(),
      parteAfectada: 0,
      totalidadAnalizada: playaSeleccionada?.areaUtilM2 ?? 1,
    })
    if (ok) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-navy-900">Registrar evento</h2>
          <button onClick={onClose} aria-label="Cerrar" className="text-ink-500 hover:text-ink-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Playa</label>
            <select
              required
              value={playaId ?? ''}
              onChange={(e) => setPlayaId(Number(e.target.value))}
              className={inputClass}
            >
              <option value="" disabled>Selecciona una playa</option>
              {playas.map((playa) => (
                <option key={playa.id} value={playa.id}>{playa.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Tipo de evento</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoEvento)} className={inputClass}>
              {Object.entries(TIPO_EVENTO_LABEL).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              placeholder="Descripción del evento..."
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-alert-600">{error}</p>}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-ink-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
            >
              {submitting ? 'Guardando…' : 'Registrar evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}