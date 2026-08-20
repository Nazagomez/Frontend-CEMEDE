import type { TabEventos } from '@/hooks/admin/useEventos'

interface EventosTabsProps {
  tab: TabEventos
  onChange: (tab: TabEventos) => void
}

const TABS: { value: TabEventos; label: string }[] = [
  { value: 'todos', label: 'Todas' },
  { value: 'pendiente', label: 'Pendientes' },
  { value: 'aprobado', label: 'Aprobadas' },
  { value: 'rechazado', label: 'Rechazadas' },
  { value: 'cerrado', label: 'Cerradas' },
]

export function EventosTabs({ tab, onChange }: EventosTabsProps) {
  return (
    <div className="flex gap-1 border-b border-gray-200">
      {TABS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            tab === value ? 'border-b-2 border-navy-900 text-navy-900' : 'text-ink-500 hover:text-ink-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}