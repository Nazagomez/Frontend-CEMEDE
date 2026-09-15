import { Users, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useUsuarios } from '@/hooks/admin/useUsuarios'
import { useRoles } from '@/hooks/admin/useRoles'
import { CrearUsuarioForm } from '@/components/Admin/usuarios/CrearUsuarioForm'
import { UsuariosTable } from '@/components/Admin/usuarios/UsuariosTable'
import { PermisosMatrix } from '@/components/Admin/roles/PermisosMatrix'

export function Usuarios() {
  const { user } = useAuth()
  const { usuarios, isLoading, error, actionError, mensajeCreacion, submitting, crear, toggleEstado, cambiarRol, resetearPassword } =
    useUsuarios()
  const { catalogo, roles, isLoading: cargandoRoles, error: errorRoles, actionError: errorPermisos, guardando, guardarPermisos } =
    useRoles()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-semibold text-navy-900">
          <Users className="h-5 w-5" aria-hidden />
          Administración de usuarios
        </h1>
        <p className="text-sm text-ink-500">Gestioná las cuentas de administradores, investigadores y asistentes.</p>
      </div>

      <CrearUsuarioForm submitting={submitting} error={actionError} mensaje={mensajeCreacion} onSubmit={crear} />

      {isLoading && <p className="text-sm text-ink-500">Cargando usuarios…</p>}
      {error && <p className="text-sm text-alert-600">{error}</p>}

      {!isLoading && !error && user && (
        <UsuariosTable
          usuarios={usuarios}
          usuarioActualId={user.id}
          onCambiarRol={cambiarRol}
          onToggleEstado={toggleEstado}
          onResetearPassword={resetearPassword}
        />
      )}

      <div>
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-navy-900">
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Permisos por rol
        </h2>

        {cargandoRoles && <p className="text-sm text-ink-500">Cargando permisos…</p>}
        {errorRoles && <p className="text-sm text-alert-600">{errorRoles}</p>}
        {errorPermisos && <p className="text-sm text-alert-600">{errorPermisos}</p>}

        {!cargandoRoles && !errorRoles && (
          <PermisosMatrix catalogo={catalogo} roles={roles} guardando={guardando} onGuardar={guardarPermisos} />
        )}
      </div>
    </div>
  )
}