import { TIPO_EVENTO_LABEL, type TipoEvento } from '@/types/Admin/eventos'

export function EventoTipoBadge({ tipo }: { tipo: TipoEvento }) {
  return (
    <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-xs font-medium text-navy-900">
      {TIPO_EVENTO_LABEL[tipo]}
    </span>
  )
}