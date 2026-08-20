import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { CrearPlayaPayload } from '@/types/admin/playas'

interface CrearPlayaModalProps {
  onClose: () => void
  onSubmit: (payload: CrearPlayaPayload) => Promise<boolean>
  submitting: boolean
  error: string | null
}

const inputClass = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700'
const labelClass = 'text-sm font-medium text-ink-700'

export function CrearPlayaModal({ onClose, onSubmit, submitting, error }: CrearPlayaModalProps) {
  const [nombre, setNombre] = useState('')
  const [canton, setCanton] = useState('')
  const [areaUtilM2, setAreaUtilM2] = useState('')
  const [areaPorVisitanteM2, setAreaPorVisitanteM2] = useState('20')
  const [periodoHoras, setPeriodoHoras] = useState('8')
  const [tiempoPermanenciaHoras, setTiempoPermanenciaHoras] = useState('4')
  const [capacidadManejo, setCapacidadManejo] = useState('0.75')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = await onSubmit({
      nombre,
      canton,
      areaUtilM2: Number(areaUtilM2),
      areaPorVisitanteM2: Number(areaPorVisitanteM2),
      periodoHoras: Number(periodoHoras),
      tiempoPermanenciaHoras: Number(tiempoPermanenciaHoras),
      capacidadManejo: Number(capacidadManejo),
    })
    if (ok) onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-navy-900">Agregar playa</h2>
          <button onClick={onClose} aria-label="Cerrar" className="text-ink-500 hover:text-ink-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
          <div>
            <label className={labelClass}>Nombre</label>
            <input required value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Cantón</label>
            <input required value={canton} onChange={(e) => setCanton(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Área útil (m²)</label>
            <input required type="number" min={0} step="0.01" value={areaUtilM2} onChange={(e) => setAreaUtilM2(e.target.value)} className={inputClass} />
          </div>

          <p className="mt-2 text-xs font-medium text-ink-500">Configuración inicial de capacidad</p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Área/visitante (m²)</label>
              <input required type="number" min={0} step="0.01" value={areaPorVisitanteM2} onChange={(e) => setAreaPorVisitanteM2(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Período (horas)</label>
              <input required type="number" min={1} value={periodoHoras} onChange={(e) => setPeriodoHoras(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Permanencia (horas)</label>
              <input required type="number" min={0} step="0.1" value={tiempoPermanenciaHoras} onChange={(e) => setTiempoPermanenciaHoras(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Capacidad manejo (0-1)</label>
              <input required type="number" min={0} max={1} step="0.01" value={capacidadManejo} onChange={(e) => setCapacidadManejo(e.target.value)} className={inputClass} />
            </div>
          </div>

          {error && <p className="text-sm text-alert-600">{error}</p>}

          <button type="submit" disabled={submitting} className="mt-2 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50">
            {submitting ? 'Guardando…' : 'Registrar playa'}
          </button>
        </form>
      </div>
    </div>
  )
}