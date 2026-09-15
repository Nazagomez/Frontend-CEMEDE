import { useEffect, useState } from 'react'
import { Save, Lock } from 'lucide-react'
import type { PermisoCatalogo, RolPermisos } from '@/types/Admin/roles'

interface PermisosMatrixProps {
  catalogo: PermisoCatalogo[]
  roles: RolPermisos[]
  guardando: string | null
  onGuardar: (rol: string, permisos: string[]) => Promise<boolean>
}

const ROL_LABEL: Record<string, string> = {
  administrador: 'Administrador',
  investigador: 'Investigador',
  asistente: 'Asistente',
}

export function PermisosMatrix({ catalogo, roles, guardando, onGuardar }: PermisosMatrixProps) {
  const [seleccion, setSeleccion] = useState<Record<string, Set<string>>>({})

  useEffect(() => {
    const inicial: Record<string, Set<string>> = {}
    for (const r of roles) {
      inicial[r.rol] = new Set(r.permisos)
    }
    setSeleccion(inicial)
  }, [roles])

  function toggle(rol: string, clave: string) {
    setSeleccion((prev) => {
      const actual = new Set(prev[rol] ?? [])
      if (actual.has(clave)) {
        actual.delete(clave)
      } else {
        actual.add(clave)
      }
      return { ...prev, [rol]: actual }
    })
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-ink-500">
          <tr>
            <th className="px-4 py-2.5">Permiso</th>
            {roles.map((r) => (
              <th key={r.rol} className="px-4 py-2.5 text-center">
                {ROL_LABEL[r.rol] ?? r.rol}
                {r.rol === 'administrador' && <span className="ml-1 text-[10px] font-normal normal-case text-ink-500">(fijo)</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {catalogo.map((permiso) => (
            <tr key={permiso.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-2.5">
                <p className="font-medium text-navy-900">{permiso.nombre}</p>
                {permiso.descripcion && <p className="text-xs text-ink-500">{permiso.descripcion}</p>}
              </td>
              {roles.map((r) => {
                const esAdmin = r.rol === 'administrador'
                return (
                  <td key={r.rol} className="px-4 py-2.5 text-center">
                    {esAdmin ? (
                      <Lock className="mx-auto h-4 w-4 text-ink-500" aria-label="Rol protegido" />
                    ) : (
                      <input
                        type="checkbox"
                        checked={seleccion[r.rol]?.has(permiso.clave) ?? false}
                        onChange={() => toggle(r.rol, permiso.clave)}
                        className="h-4 w-4 accent-navy-700"
                      />
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-4 py-3" />
            {roles.map((r) => (
              <td key={r.rol} className="px-4 py-3 text-center">
                {r.rol === 'administrador' ? (
                  <span className="text-xs text-ink-500">Siempre todos</span>
                ) : (
                  <button
                    onClick={() => onGuardar(r.rol, Array.from(seleccion[r.rol] ?? []))}
                    disabled={guardando === r.rol}
                    className="flex items-center gap-1.5 rounded-full bg-navy-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-navy-800 disabled:opacity-50"
                  >
                    <Save className="h-3 w-3" aria-hidden />
                    {guardando === r.rol ? 'Guardando…' : 'Guardar'}
                  </button>
                )}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  )
}