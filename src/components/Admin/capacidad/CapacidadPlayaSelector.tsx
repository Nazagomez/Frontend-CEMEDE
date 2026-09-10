import type { Playa } from '@/types/playas'

interface CapacidadPlayaSelectorProps {
  playas: Playa[]
  playaId: number | null
  onChange: (playaId: number) => void
}

export function CapacidadPlayaSelector({ playas, playaId, onChange }: CapacidadPlayaSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {playas.map((playa) => (
        <button
          key={playa.id}
          type="button"
          onClick={() => onChange(playa.id)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            playaId === playa.id ? 'border-navy-700 bg-navy-900 text-white' : 'border-gray-300 text-ink-700 hover:bg-gray-50'
          }`}
        >
          {playa.nombre}
        </button>
      ))}
    </div>
  )
}