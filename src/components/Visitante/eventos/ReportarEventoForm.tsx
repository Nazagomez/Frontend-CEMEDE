import { useState, type FormEvent } from 'react'
import { FileWarning } from 'lucide-react'
import { TIPO_EVENTO_LABEL, type TipoEvento } from '@/types/Visitante/eventos'

interface ReportarEventoFormProps {
  disabled: boolean
  enviando: boolean
  enviado: boolean
  error: string | null
  onSubmit: (payload: { tipo: TipoEvento; descripcion?: string }) => void
}

export function ReportarEventoForm({ disabled, enviando, enviado, error, onSubmit }: ReportarEventoFormProps) {
  const [tipo, setTipo] = useState<TipoEvento>('otro')
  const [descripcion, setDescripcion] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit({ tipo, descripcion: descripcion || undefined })
    setDescripcion('')
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-1.5 text-navy-900">
        <FileWarning className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Reportar un evento</h2>
      </div>
      <p className="mt-1 text-xs text-ink-500">
        ¿Notaste algo fuera de lo normal? Se enviará como pendiente para revisión del equipo CEMEDE.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-ink-700">Tipo de evento</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoEvento)}
            disabled={disabled}
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700 disabled:opacity-50"
          >
            {Object.entries(TIPO_EVENTO_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">Descripción (opcional)</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            disabled={disabled}
            placeholder="Contanos qué observaste..."
            className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700 disabled:opacity-50"
          />
        </div>

        {error && <p className="text-sm text-alert-600">{error}</p>}

        <button
          type="submit"
          disabled={disabled || enviando}
          className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {enviando ? 'Enviando…' : 'Reportar evento'}
        </button>

        {enviado && (
          <p className="text-xs text-ink-500">Reporte enviado. Quedará pendiente de aprobación del equipo CEMEDE.</p>
        )}
      </form>
    </div>
  )
}