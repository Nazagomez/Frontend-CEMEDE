import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { ResetPasswordModal } from '@/components/Admin/usuarios/ResetPasswordModal'
import type { Usuario, RolUsuario } from '@/types/Admin/usuarios'

interface UsuariosTableProps {
  usuarios: Usuario[]
  usuarioActualId: number
  onCambiarRol: (id: number, rol: string) => void
  onToggleEstado: (id: number) => void
  onResetearPassword: (id: number, password: string) => Promise<boolean>
}

export function UsuariosTable({ usuarios, usuarioActualId, onCambiarRol, onToggleEstado, onResetearPassword }: UsuariosTableProps) {
  const [usuarioAResetear, setUsuarioAResetear] = useState<Usuario | null>(null)

  if (usuarios.length === 0) {
    return <p className="text-sm text-ink-500">No hay usuarios registrados.</p>
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-ink-500">
            <tr>
              <th className="px-4 py-2.5">Nombre</th>
              <th className="px-4 py-2.5">Correo</th>
              <th className="px-4 py-2.5">Rol</th>
              <th className="px-4 py-2.5">Estado</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => {
              const esUsuarioActual = usuario.id === usuarioActualId
              return (
                <tr key={usuario.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-navy-900">
                    {usuario.nombre} {esUsuarioActual && <span className="text-xs font-normal text-ink-500">(vos)</span>}
                    {usuario.debeCambiarPassword && (
                      <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-medium text-yellow-700">
                        Pendiente primer login
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-ink-700">{usuario.email}</td>
                  <td className="px-4 py-2.5">
                    <select
                      value={usuario.rol}
                      disabled={esUsuarioActual}
                      onChange={(e) => onCambiarRol(usuario.id, e.target.value as RolUsuario)}
                      className="rounded-md border border-gray-300 px-2 py-1 text-xs outline-none focus:border-navy-700 disabled:opacity-50"
                    >
                      <option value="investigador">Investigador</option>
                      <option value="asistente">Asistente</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  </td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={() => onToggleEstado(usuario.id)}
                      disabled={esUsuarioActual}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50 ${
                        usuario.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-ink-500'
                      }`}
                    >
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => setUsuarioAResetear(usuario)}
                      className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-ink-700 hover:bg-gray-50"
                    >
                      <KeyRound className="h-3 w-3" aria-hidden />
                      Contraseña
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {usuarioAResetear && (
        <ResetPasswordModal usuario={usuarioAResetear} onClose={() => setUsuarioAResetear(null)} onSubmit={onResetearPassword} />
      )}
    </>
  )
}