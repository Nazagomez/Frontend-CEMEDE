import type { Playa } from '@/types/playas'

interface EventoPlayaSelectorProps {
  playas: Playa[]
  playaId: number | null
  onChange: (playaId: number) => void
}

export function EventoPlayaSelector({ playas, playaId, onChange }: EventoPlayaSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {playas.map((playa) => (
        <button
          key={playa.id}
          type="button"
          onClick={() => onChange(playa.id)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            playaId === playa.id ? 'border-white/40 bg-white/20 text-white' : 'border-white/15 bg-white/10 text-white hover:bg-white/15'
          }`}
        >
          {playa.nombre}
        </button>
      ))}
    </div>
  )
}