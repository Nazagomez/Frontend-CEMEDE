import { useState, type FormEvent } from 'react'
import { FileWarning } from 'lucide-react'
import { TIPO_EVENTO_LABEL, type TipoEvento } from '@/types/Visitante/eventos'

interface ReportarEventoFormProps {
  disabled: boolean
  enviando: boolean
  enviado: boolean
  error: string | null
  onSubmit: (payload: { tipo: TipoEvento; descripcion?: string }) => void | Promise<boolean | void>
}

export function ReportarEventoForm({ disabled, enviando, enviado, error, onSubmit }: ReportarEventoFormProps) {
  const [tipo, setTipo] = useState<TipoEvento>('otro')
  const [descripcion, setDescripcion] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const resultado = await onSubmit({ tipo, descripcion: descripcion || undefined })
    if (resultado === false) return
    setTipo('otro')
    setDescripcion('')
  }

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <FileWarning className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Reportar un evento</h2>
      </div>
      <p className="mt-1 text-xs text-white">
        ¿Notaste algo fuera de lo normal? Se enviará como pendiente para revisión del equipo CEMEDE.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-white">Tipo de evento</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoEvento)}
            disabled={disabled}
            className="scheme-dark mt-1.5 w-full rounded-lg border border-white/30 bg-[#062833]/45 px-3 py-2 text-sm text-white outline-none focus:border-white disabled:opacity-50"
          >
            {Object.entries(TIPO_EVENTO_LABEL).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-white">Descripción (opcional)</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            disabled={disabled}
            placeholder="Contanos qué observaste..."
            className="scheme-dark mt-1.5 w-full rounded-lg border border-white/30 bg-[#062833]/45 px-3 py-2 text-sm text-white outline-none placeholder:text-white/70 focus:border-white disabled:opacity-50"
          />
        </div>

        {error && <p className="text-sm text-red-200">{error}</p>}

        <button
          type="submit"
          disabled={disabled || enviando}
          className="rounded-full bg-white px-4 py-2.5 text-sm font-medium text-navy-900 transition-colors hover:bg-white/90 disabled:opacity-50"
        >
          {enviando ? 'Enviando…' : 'Reportar evento'}
        </button>

        {enviado && (
          <p className="text-xs text-white">Reporte enviado. Quedará pendiente de aprobación del equipo CEMEDE.</p>
        )}
      </form>
    </div>
  )
}