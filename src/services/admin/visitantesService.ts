import { registrarEntrada, registrarSalida, fetchOcupacion, fetchHistorial } from '@/api/admin/visitantesApi'
import type {
  RegistroVisitante,
  RegistroVisitanteRaw,
  Ocupacion,
  OcupacionRaw,
  HistorialItemRaw,
  HistorialFiltro,
  EntradaPayload,
} from '@/types/Admin/visitantes'

function mapRegistro(raw: RegistroVisitanteRaw): RegistroVisitante {
  return {
    id: raw.id,
    playaId: raw.playa_id,
    playaNombre: raw.playa_nombre,
    fechaEntrada: raw.fecha_entrada,
    fechaSalida: raw.fecha_salida,
    cantidadPersonas: raw.cantidad_personas,
    duracionEstimadaHoras: raw.duracion_estimada_horas,
    observaciones: raw.observaciones,
  }
}

function mapOcupacion(raw: OcupacionRaw): Ocupacion {
  return {
    playaId: raw.playa_id,
    playaNombre: raw.playa_nombre,
    totalVisitantes: raw.total_visitantes,
    registrosActivos: raw.registros_activos,
    fechaConsulta: raw.fecha_consulta,
  }
}

function mapHistorialItem(raw: HistorialItemRaw): RegistroVisitante {
  return {
    id: raw.id,
    playaId: raw.playa_id,
    playaNombre: raw.playa_nombre,
    fechaEntrada: raw.fecha_entrada,
    fechaSalida: raw.fecha_salida,
    cantidadPersonas: raw.cantidad_personas,
    duracionEstimadaHoras: raw.duracion_estimada_horas,
    observaciones: null,
  }
}

export async function getOcupacionActual(playaId: number): Promise<Ocupacion> {
  const raw = await fetchOcupacion(playaId)
  return mapOcupacion(raw)
}

export async function getHistorial(filtro: HistorialFiltro) {
  const raw = await fetchHistorial(filtro)
  return {
    total: raw.total,
    page: raw.page,
    limit: raw.limit,
    registros: raw.registros.map(mapHistorialItem),
  }
}

export async function crearEntrada(payload: EntradaPayload): Promise<RegistroVisitante> {
  const raw = await registrarEntrada(payload)
  return mapRegistro(raw)
}

export async function cerrarSalida(registroId: number): Promise<RegistroVisitante> {
  const raw = await registrarSalida(registroId)
  return mapRegistro(raw)
}