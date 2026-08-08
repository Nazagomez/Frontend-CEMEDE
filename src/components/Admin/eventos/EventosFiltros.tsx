import { TIPO_EVENTO_LABEL, type TipoEvento } from '@/types/Admin/eventos'

interface EventosFiltrosProps {
  tipo: TipoEvento | 'todos'
  activo: 'todos' | 'activos' | 'cerrados'
  onTipoChange: (tipo: TipoEvento | 'todos') => void
  onActivoChange: (activo: 'todos' | 'activos' | 'cerrados') => void
}

export function EventosFiltros({ tipo, activo, onTipoChange, onActivoChange }: EventosFiltrosProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <select
        value={activo}
        onChange={(e) => onActivoChange(e.target.value as typeof activo)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-ink-700 outline-none focus:border-navy-700"
      >
        <option value="todos">Todos los estados</option>
        <option value="activos">Activos</option>
        <option value="cerrados">Cerrados</option>
      </select>

      <select
        value={tipo}
        onChange={(e) => onTipoChange(e.target.value as typeof tipo)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-ink-700 outline-none focus:border-navy-700"
      >
        <option value="todos">Todos los tipos</option>
        {Object.entries(TIPO_EVENTO_LABEL).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}