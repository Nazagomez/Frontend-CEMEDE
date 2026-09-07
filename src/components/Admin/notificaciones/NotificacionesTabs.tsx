import type { NotificacionesFiltroLeida } from '@/types/Admin/notificaciones'

interface NotificacionesTabsProps {
  filtro: NotificacionesFiltroLeida
  onChange: (filtro: NotificacionesFiltroLeida) => void
}

const TABS: { value: NotificacionesFiltroLeida; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'no_leidas', label: 'No leídas' },
  { value: 'leidas', label: 'Leídas' },
]

export function NotificacionesTabs({ filtro, onChange }: NotificacionesTabsProps) {
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {TABS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            filtro === value ? 'border-b-2 border-navy-900 text-navy-900' : 'text-ink-500 hover:text-ink-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}