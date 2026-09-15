import { useState, type FormEvent } from 'react'
import { UserPlus, CheckCircle2 } from 'lucide-react'
import type { UsuarioCreatePayload, RolUsuario } from '@/types/Admin/usuarios'

interface CrearUsuarioFormProps {
  submitting: boolean
  error: string | null
  mensaje: string | null
  onSubmit: (payload: UsuarioCreatePayload) => Promise<boolean>
}

export function CrearUsuarioForm({ submitting, error, mensaje, onSubmit }: CrearUsuarioFormProps) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [rol, setRol] = useState<RolUsuario>('investigador')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = await onSubmit({ nombre, email, rol })
    if (ok) {
      setNombre('')
      setEmail('')
      setRol('investigador')
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center gap-1.5 text-navy-900">
        <UserPlus className="h-4 w-4" aria-hidden />
        <h2 className="font-semibold">Crear usuario</h2>
      </div>
      <p className="mt-1 text-xs text-ink-500">
        Se genera una contraseña temporal automática y se envía por correo. La persona la cambia al primer ingreso.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium text-ink-700">Nombre completo</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">Correo</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink-700">Rol</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value as RolUsuario)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-navy-700"
          >
            <option value="investigador">Investigador</option>
            <option value="asistente">Asistente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        {error && <p className="text-sm text-alert-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
        >
          {submitting ? 'Creando…' : 'Crear usuario'}
        </button>

        {mensaje && (
          <p className="flex items-start gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            {mensaje}
          </p>
        )}
      </form>
    </div>
  )
}