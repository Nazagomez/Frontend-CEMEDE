import { useCallback, useEffect, useState } from 'react'
import { getPermisosCatalogo, getRoles, actualizarPermisosRol } from '@/services/admin/rolesService'
import type { PermisoCatalogo, RolPermisos } from '@/types/Admin/roles'

export function useRoles() {
  const [catalogo, setCatalogo] = useState<PermisoCatalogo[]>([])
  const [roles, setRoles] = useState<RolPermisos[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [guardando, setGuardando] = useState<string | null>(null)

  const cargar = useCallback(() => {
    setIsLoading(true)
    setError(null)
    Promise.all([getPermisosCatalogo(), getRoles()])
      .then(([permisos, rolesData]) => {
        setCatalogo(permisos)
        setRoles(rolesData)
      })
      .catch(() => setError('No se pudieron cargar los roles y permisos.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function guardarPermisos(rol: string, permisos: string[]) {
    setGuardando(rol)
    setActionError(null)
    try {
      await actualizarPermisosRol(rol, permisos)
      cargar()
      return true
    } catch {
      setActionError('No se pudieron guardar los permisos de ese rol.')
      return false
    } finally {
      setGuardando(null)
    }
  }

  return { catalogo, roles, isLoading, error, actionError, guardando, guardarPermisos }
}