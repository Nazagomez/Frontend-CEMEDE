import { useState, type FormEvent } from 'react'

interface HistorialFiltrosProps {
  fechaInicio: string
  fechaFin: string
  onAplicar: (inicio: string, fin: string) => void
}

export function HistorialFiltros({ fechaInicio, fechaFin, onAplicar }: HistorialFiltrosProps) {
  const [inicio, setInicio] = useState(fechaInicio)
  const [fin, setFin] = useState(fechaFin)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onAplicar(inicio, fin)
  }

  function limpiar() {
    setInicio('')
    setFin('')
    onAplicar('', '')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div>
        <label className="text-xs font-medium text-ink-700">Desde</label>
        <input
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          className="mt-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-navy-700"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-ink-700">Hasta</label>
        <input
          type="date"
          value={fin}
          onChange={(e) => setFin(e.target.value)}
          className="mt-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-navy-700"
        />
      </div>
      <button type="submit" className="rounded-lg bg-navy-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-navy-800">
        Filtrar
      </button>
      <button type="button" onClick={limpiar} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-gray-50">
        Limpiar
      </button>
    </form>
  )
}