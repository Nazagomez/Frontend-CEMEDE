import type { EventoAmbiental } from '@/types/admin/eventos'
import { EventoCard } from '@/components/Admin/eventos/EventoCard'

interface EventosListProps {
  eventos: EventoAmbiental[]
  onVerDetalle: (evento: EventoAmbiental) => void
}

export function EventosList({ eventos, onVerDetalle }: EventosListProps) {
  if (eventos.length === 0) {
    return <p className="text-sm text-ink-500">No hay eventos en esta categoría.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {eventos.map((evento) => (
        <EventoCard key={evento.id} evento={evento} onVerDetalle={() => onVerDetalle(evento)} />
      ))}
    </div>
  )
}