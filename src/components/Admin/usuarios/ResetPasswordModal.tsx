import { useState, type FormEvent } from 'react'
import type { Usuario } from '@/types/Admin/usuarios'

interface ResetPasswordModalProps {
  usuario: Usuario
  onClose: () => void
  onSubmit: (id: number, password: string) => Promise<boolean>
}

export function ResetPasswordModal({ usuario, onClose, onSubmit }: ResetPasswordModalProps) {
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const ok = await onSubmit(usuario.id, password)
    setSubmitting(false)
    if (ok) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6">
        <h2 className="font-semibold text-navy-900">Restablecer contraseña</h2>
        <p className="mt-1 text-xs text-ink-500">Nueva contraseña para {usuario.nombre}.</p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <input
            type="password"
            required
            minLength={8}
            placeholder="Nueva contraseña (mínimo 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
            >
              {submitting ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}