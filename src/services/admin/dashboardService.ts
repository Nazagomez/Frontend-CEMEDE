import { fetchDashboardGeneral, fetchDashboardTendencia } from '@/api/admin/dashboardApi'
import type { DashboardGeneral } from '@/types/Admin/dashboard'

export async function getDashboardGeneral(): Promise<DashboardGeneral> {
  const [raw, tendenciaRaw] = await Promise.all([fetchDashboardGeneral(), fetchDashboardTendencia()])

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

  return {
    fechaConsulta: raw.fecha_consulta,
    totalPlayas: raw.total_playas,
    playas,
    totalVisitantes,
    promedioOcupacion,
    totalEventosActivos,
    tendencia: tendenciaRaw.datos,
  }
}

// getEventosRecientes NO vive acá — se importa de services/admin/eventosService.ts