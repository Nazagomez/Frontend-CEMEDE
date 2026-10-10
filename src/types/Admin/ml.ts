export interface MlEstadoRaw {
  playa_id: number
  modelo_activo: boolean
  registros_disponibles: number
  registros_minimos: number
  ultimo_entrenamiento: string | null
  mae: number | null
  rmse: number | null
  mensaje: string
}

export interface MlEntrenarRaw {
  playa_id: number
  modelo_activo: boolean
  registros_usados: number
  metricas: { mae: number; rmse: number }
  mensaje: string
}

export interface HistoricoImportRaw {
  inserted: number
  updated_or_skipped: number
  mensaje: string
}

export interface HistoricoSyncRaw {
  configs_actualizadas: number
  estimaciones_creadas: number
  estimaciones_actualizadas: number
  filas_fuente: number
  mensaje: string
}
