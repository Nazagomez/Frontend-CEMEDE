import { fetchEventosActivos, reportarEvento } from '@/api/eventosApi'
import { TIPO_EVENTO_LABEL } from '@/types/Visitante/eventos'
import type { EventoActivo, EventoActivoRaw, ReportarEventoPayload } from '@/types/Visitante/eventos'

function mapEventoActivo(raw: EventoActivoRaw): EventoActivo {
  return {
    id: raw.id,
    tipo: raw.tipo,
    titulo: raw.titulo,
    descripcion: raw.descripcion,
    fechaInicio: raw.fecha_inicio,
  }
}

export async function getEventosActivosPorPlaya(playaId: number): Promise<EventoActivo[]> {
  const raw = await fetchEventosActivos(playaId)
  return raw.map(mapEventoActivo)
}

export async function reportarEventoAmbiental(payload: ReportarEventoPayload): Promise<void> {
  await reportarEvento({
    playaId: payload.playaId,
    tipo: payload.tipo,
    titulo: TIPO_EVENTO_LABEL[payload.tipo],
    descripcion: payload.descripcion,
    fechaInicio: new Date().toISOString(),
    parteAfectada: 0,
    totalidadAnalizada: payload.areaUtilM2,
  })
}