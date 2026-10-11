interface PaginacionProps {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
  itemLabel?: string
}

export function Paginacion({ page, total, pageSize, onPageChange, itemLabel = 'registros' }: PaginacionProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink-500">
      <span>
        {total} {itemLabel} en total
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          disabled={safePage <= 1}
          className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-ink-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {safePage} de {totalPages}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
          disabled={safePage >= totalPages}
          className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-ink-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}
