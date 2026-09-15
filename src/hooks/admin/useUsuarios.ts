import { useCallback, useEffect, useState } from 'react'
import {
  getUsuarios,
  crearUsuario,
  cambiarEstadoUsuario,
  cambiarRolUsuario,
  resetearPasswordUsuario,
} from '@/services/admin/usuariosService'
import type { Usuario, UsuarioCreatePayload } from '@/types/Admin/usuarios'

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [mensajeCreacion, setMensajeCreacion] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const cargar = useCallback(() => {
    setIsLoading(true)
    setError(null)
    getUsuarios()
      .then(setUsuarios)
      .catch(() => setError('No se pudo cargar la lista de usuarios.'))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  async function crear(payload: UsuarioCreatePayload) {
    setSubmitting(true)
    setActionError(null)
    setMensajeCreacion(null)
    try {
      const creado = await crearUsuario(payload)
      cargar()
      setMensajeCreacion(creado.mensaje ?? 'Usuario creado correctamente.')
      return true
    } catch {
      setActionError('No se pudo crear el usuario. Verificá que el correo no esté ya registrado.')
      return false
    } finally {
      setSubmitting(false)
    }
  }

  async function toggleEstado(id: number) {
    setActionError(null)
    try {
      await cambiarEstadoUsuario(id)
      cargar()
    } catch {
      setActionError('No se pudo cambiar el estado del usuario.')
    }
  }

  async function cambiarRol(id: number, rol: string) {
    setActionError(null)
    try {
      await cambiarRolUsuario(id, rol)
      cargar()
    } catch {
      setActionError('No se pudo cambiar el rol del usuario.')
    }
  }

  async function resetearPassword(id: number, password: string) {
    setActionError(null)
    try {
      await resetearPasswordUsuario(id, password)
      cargar()
      return true
    } catch {
      setActionError('No se pudo actualizar la contraseña.')
      return false
    }
  }

  return { usuarios, isLoading, error, actionError, mensajeCreacion, submitting, crear, toggleEstado, cambiarRol, resetearPassword }
}