import { Brain, Database, Upload } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { fetchMlEstado, postMlEntrenar } from '@/api/admin/mlApi'
import { postImportarExcel, postSincronizarEstimaciones } from '@/api/admin/historicoApi'
import type { MlEstadoRaw } from '@/types/Admin/ml'

interface MlHistoricoPanelProps {
  playaId: number | null
  canManage: boolean
  onDataChanged: () => void
}

export function MlHistoricoPanel({ playaId, canManage, onDataChanged }: MlHistoricoPanelProps) {
  const [estado, setEstado] = useState<MlEstadoRaw | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadEstado = useCallback(() => {
    if (playaId === null) return
    setLoading(true)
    setError(null)
    fetchMlEstado(playaId)
      .then(setEstado)
      .catch(() => setError('No se pudo consultar el estado del modelo ML.'))
      .finally(() => setLoading(false))
  }, [playaId])

  useEffect(() => {
    loadEstado()
  }, [loadEstado])

  async function handleEntrenar() {
    if (playaId === null || !canManage) return
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const result = await postMlEntrenar(playaId)
      setMessage(
        `${result.mensaje} MAE: ${result.metricas.mae}, RMSE: ${result.metricas.rmse} (${result.registros_usados} registros).`,
      )
      loadEstado()
      onDataChanged()
    } catch {
      setError('No se pudo entrenar el modelo. Verifique registros históricos suficientes.')
    } finally {
      setLoading(false)
    }
  }

  async function handleImportar() {
    if (!canManage) return
    setLoading(true)
    setError(null)
    setMessage(null)
    try {
      const imp = await postImportarExcel()
      const sync = await postSincronizarEstimaciones()
      setMessage(
        `${imp.mensaje} Insertados: ${imp.inserted}. Estimaciones creadas: ${sync.estimaciones_creadas}, actualizadas: ${sync.estimaciones_actualizadas}.`,
      )
      loadEstado()
      onDataChanged()
    } catch {
      setError('Falló la importación del Excel o la sincronización de estimaciones.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-2 text-navy-900">
        <Brain className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Machine Learning e histórico</h2>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        DecisionTreeRegressor complementa la fórmula CCR cuando hay datos suficientes (MAE / RMSE en prueba).
      </p>

      {loading && <p className="mt-3 text-sm text-ink-500">Procesando…</p>}
      {error && <p className="mt-3 text-sm text-alert-600">{error}</p>}
      {message && <p className="mt-3 text-sm text-green-700">{message}</p>}

      {estado && (
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-500">Modelo activo</dt>
            <dd className="font-medium text-navy-900">{estado.modelo_activo ? 'Sí' : 'No'}</dd>
          </div>
          <div>
            <dt className="text-ink-500">Registros disponibles</dt>
            <dd className="font-medium text-navy-900">
              {estado.registros_disponibles} / mín. {estado.registros_minimos}
            </dd>
          </div>
          <div>
            <dt className="text-ink-500">MAE (prueba)</dt>
            <dd className="font-medium text-navy-900">{estado.mae ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-ink-500">RMSE (prueba)</dt>
            <dd className="font-medium text-navy-900">{estado.rmse ?? '—'}</dd>
          </div>
        </dl>
      )}

      {canManage && (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleImportar}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-navy-900 hover:bg-gray-50 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" aria-hidden />
            Importar Excel + sync
          </button>
          <button
            type="button"
            onClick={handleEntrenar}
            disabled={loading || playaId === null}
            className="inline-flex items-center gap-1.5 rounded-md bg-navy-900 px-3 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
          >
            <Database className="h-4 w-4" aria-hidden />
            Entrenar modelo
          </button>
        </div>
      )}
    </div>
  )
}
