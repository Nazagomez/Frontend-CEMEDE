import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { puedeGestionarPlayas } from '@/services/auth/permissions'
import { usePlayas } from '@/hooks/admin/usePlayas'
import { PlayaCard } from '@/components/Admin/playas/PlayaCard'
import { CrearPlayaModal } from '@/components/Admin/playas/CrearPlayaModal'
import { EditarConfiguracionModal } from '@/components/Admin/playas/EditarConfiguracionModal'
import type { PlayaConConfiguracion } from '@/types/admin/playas'

export function Playas() {
  const { user } = useAuth()
  const puedeEditar = user ? puedeGestionarPlayas(user.rol) : false

  const { playas, isLoading, error, actionError, crear, actualizarConfiguracion, eliminar } = usePlayas()
  const [mostrarCrear, setMostrarCrear] = useState(false)
  const [playaEditando, setPlayaEditando] = useState<PlayaConConfiguracion | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleCrear(payload: Parameters<typeof crear>[0]) {
    setSubmitting(true)
    const ok = await crear(payload)
    setSubmitting(false)
    return ok
  }

  async function handleEditarConfig(payload: Parameters<typeof actualizarConfiguracion>[1]) {
    if (!playaEditando) return false
    setSubmitting(true)
    const ok = await actualizarConfiguracion(playaEditando.id, payload)
    setSubmitting(false)
    return ok
  }

  async function handleDarDeBaja(playaId: number, nombre: string) {
    if (!confirm(`¿Dar de baja "${nombre}"? Esta acción no se puede deshacer.`)) return
    await eliminar(playaId)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Playas monitoreadas</h1>
          <p className="text-sm text-ink-500">
            Datos básicos de las playas definidas en la propuesta. Esta información alimenta la estimación de capacidad de carga.
          </p>
        </div>
        {puedeEditar && (
          <button
            onClick={() => setMostrarCrear(true)}
            className="flex items-center gap-1.5 rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Agregar Playa
          </button>
        )}
      </div>

      {!puedeEditar && (
        <p className="rounded-md bg-navy-900/5 px-3 py-2 text-sm text-ink-700">
          Tu rol tiene acceso de solo lectura a esta sección.
        </p>
      )}

      {isLoading && <p className="text-sm text-ink-500">Cargando playas…</p>}
      {error && <p className="text-sm text-alert-600">{error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {playas.map((playa) => (
          <PlayaCard
            key={playa.id}
            playa={playa}
            puedeEditar={puedeEditar}
            onEditarConfiguracion={() => setPlayaEditando(playa)}
            onDarDeBaja={() => handleDarDeBaja(playa.id, playa.nombre)}
          />
        ))}
      </div>

      {mostrarCrear && (
        <CrearPlayaModal onClose={() => setMostrarCrear(false)} onSubmit={handleCrear} submitting={submitting} error={actionError} />
      )}

      {playaEditando && (
        <EditarConfiguracionModal playa={playaEditando} onClose={() => setPlayaEditando(null)} onSubmit={handleEditarConfig} submitting={submitting} error={actionError} />
      )}
    </div>
  )
}