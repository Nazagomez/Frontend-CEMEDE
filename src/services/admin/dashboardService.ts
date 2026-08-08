import { fetchDashboardGeneral, fetchDashboardPlaya } from '@/api/admin/dashboardApi'
import type { DashboardGeneral, PuntoTendencia } from '@/types/Admin/dashboard'

// TODO: cuando el backend tenga GET /dashboard/tendencia, borrar esta función
// y las llamadas a fetchDashboardPlaya() de abajo — reemplazar por una sola
// llamada a fetchDashboardTendencia() y usar directo su campo `datos`.
function construirTendencia(
  detallesPorPlaya: { nombre: string; estimaciones: { fecha: string; porcentaje_ocupacion: number }[] }[]
): PuntoTendencia[] {
  const porFecha = new Map<string, PuntoTendencia>()

  for (const { nombre, estimaciones } of detallesPorPlaya) {
    for (const est of estimaciones) {
      const clave = est.fecha.slice(0, 10)
      const fila = porFecha.get(clave) ?? { fecha: clave }
      fila[nombre] = est.porcentaje_ocupacion
      porFecha.set(clave, fila)
    }
  }

  return Array.from(porFecha.values()).sort((a, b) => String(a.fecha).localeCompare(String(b.fecha)))
}

export async function getDashboardGeneral(): Promise<DashboardGeneral> {
  const raw = await fetchDashboardGeneral()

  const playas = raw.playas.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    visitantesActuales: p.visitantes_actuales,
    porcentajeOcupacion: p.porcentaje_ocupacion,
    estado: p.estado,
    eventosActivos: p.eventos_activos,
  }))

  const totalVisitantes = playas.reduce((sum, p) => sum + p.visitantesActuales, 0)
  const totalEventosActivos = playas.reduce((sum, p) => sum + p.eventosActivos, 0)
  const promedioOcupacion =
    playas.length > 0
      ? Math.round((playas.reduce((sum, p) => sum + p.porcentajeOcupacion, 0) / playas.length) * 100) / 100
      : 0

  const detalles = await Promise.all(
    playas.map(async (p) => {
      const detalle = await fetchDashboardPlaya(p.id)
      return { nombre: p.nombre, estimaciones: detalle.ultimas_estimaciones }
    })
  )
  const tendencia = construirTendencia(detalles)

  return {
    fechaConsulta: raw.fecha_consulta,
    totalPlayas: raw.total_playas,
    playas,
    totalVisitantes,
    promedioOcupacion,
    totalEventosActivos,
    tendencia,
  }
}

// getEventosRecientes NO vive acá — se importa de services/admin/eventos/eventosService.ts