import type { EventoActivo } from '@/types/Visitante/eventos'
import { EventoActivoCard } from '@/components/Visitante/eventos/EventoActivoCard'

export function EventosActivosList({ eventos }: { eventos: EventoActivo[] }) {
  if (eventos.length === 0) {
    return (
      <p className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white backdrop-blur-md">
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