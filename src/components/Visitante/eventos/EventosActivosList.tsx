import type { EventoActivo } from '@/types/Visitante/eventos'
import { EventoActivoCard } from '@/components/Visitante/eventos/EventoActivoCard'

export function EventosActivosList({ eventos }: { eventos: EventoActivo[] }) {
  if (eventos.length === 0) {
    return (
      <p className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-ink-500">
        No hay eventos ambientales activos reportados para esta playa en este momento.
      </p>
    )
  }
  return (
    <div className="flex flex-col gap-3">
      {eventos.map((evento) => (
        <EventoActivoCard key={evento.id} evento={evento} />
      ))}
    </div>
  )
}