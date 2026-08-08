import { fetchEventos, crearEvento, cerrarEvento } from '@/api/admin/eventosApi'
import type { EventoAmbiental, EventoAmbientalRaw, EventosFiltro, CrearEventoPayload } from '@/types/Admin/eventos'

function mapEvento(raw: EventoAmbientalRaw): EventoAmbiental {
  return {
    id: raw.id,
    playaId: raw.playa_id,
    playaNombre: raw.playa_nombre,
    tipo: raw.tipo,
    titulo: raw.titulo,
    descripcion: raw.descripcion,
    fechaInicio: raw.fecha_inicio,
    fechaFin: raw.fecha_fin,
    factorCorreccion: raw.factor_correccion,
    activo: raw.activo,
  }
}

export async function getEventos(filtro?: EventosFiltro): Promise<EventoAmbiental[]> {
  const raw = await fetchEventos(filtro)
  return raw.map(mapEvento)
}

/** La usa tanto la pantalla de Eventos como el Dashboard — única fuente. */
export async function getEventosRecientes(cantidad = 5): Promise<EventoAmbiental[]> {
  const eventos = await getEventos()
  return eventos.slice(0, cantidad)
}

export async function registrarEvento(payload: CrearEventoPayload): Promise<EventoAmbiental> {
  const raw = await crearEvento(payload)
  return mapEvento(raw)
}

export async function cerrarEventoActivo(eventoId: number): Promise<EventoAmbiental> {
  const raw = await cerrarEvento(eventoId)
  return mapEvento(raw)
}