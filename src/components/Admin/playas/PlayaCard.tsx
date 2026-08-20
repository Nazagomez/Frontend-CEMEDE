import { AlignJustify, Pencil, Trash2 } from 'lucide-react'
import type { PlayaConConfiguracion } from '@/types/admin/playas'

interface PlayaCardProps {
  playa: PlayaConConfiguracion
  onEditarConfiguracion: () => void
  onDarDeBaja: () => void
}

const rowClass = 'flex items-center justify-between text-sm'
const labelClass = 'text-ink-500'
const valueClass = 'font-medium text-navy-900'

export function PlayaCard({ playa, onEditarConfiguracion, onDarDeBaja }: PlayaCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          <AlignJustify className="mt-0.5 h-4 w-4 text-ink-500" aria-hidden />
          <div>
            <p className="font-semibold text-navy-900">{playa.nombre}</p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                playa.activa ? 'bg-navy-900 text-white' : 'bg-gray-200 text-ink-500'
              }`}
            >
              {playa.activa ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onEditarConfiguracion}
            className="flex items-center gap-1 rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-ink-700 hover:bg-gray-50"
          >
            <Pencil className="h-3 w-3" aria-hidden />
            Editar
          </button>
          <button
            onClick={onDarDeBaja}
            aria-label="Dar de baja"
            className="rounded-md border border-alert-600/30 p-1.5 text-alert-600 hover:bg-alert-600/5"
          >
            <Trash2 className="h-3 w-3" aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-3">
        <div className={rowClass}>
          <span className={labelClass}>Área útil</span>
          <span className={valueClass}>{playa.areaUtilM2.toLocaleString('es-CR')} m²</span>
        </div>
        <div className={rowClass}>
          <span className={labelClass}>Capacidad estimada (CCE)</span>
          <span className={valueClass}>
            {playa.cce !== null ? `${Math.round(playa.cce).toLocaleString('es-CR')} visitantes` : '—'}
          </span>
        </div>
        <div className={rowClass}>
          <span className={labelClass}>Estado de monitoreo</span>
          <span className={valueClass}>{playa.activa ? 'Activo' : 'Inactivo'}</span>
        </div>
      </div>

      {playa.descripcion && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <p className="text-xs font-medium text-ink-500">Observaciones del sitio</p>
          <p className="mt-1 text-sm text-ink-700">{playa.descripcion}</p>
        </div>
      )}
    </div>
  )
}