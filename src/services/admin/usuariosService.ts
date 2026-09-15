import { fetchUsuarios, postUsuario, putUsuarioActivo, putUsuarioRol, putUsuarioPassword } from '@/api/admin/usuariosApi'
import type { Usuario, UsuarioRaw, UsuarioCreatePayload, UsuarioCreateResultado } from '@/types/Admin/usuarios'

function mapUsuario(raw: UsuarioRaw): Usuario {
  return {
    id: raw.id,
    nombre: raw.nombre,
    email: raw.email,
    rol: raw.rol,
    activo: raw.activo,
    debeCambiarPassword: raw.debe_cambiar_password,
  }
}

export async function getUsuarios(): Promise<Usuario[]> {
  const raw = await fetchUsuarios()
  return raw.map(mapUsuario)
}

export async function crearUsuario(payload: UsuarioCreatePayload): Promise<UsuarioCreateResultado> {
  const raw = await postUsuario(payload)
  return { ...mapUsuario(raw), mensaje: raw.mensaje ?? null }
}

export async function cambiarEstadoUsuario(id: number): Promise<Usuario> {
  const raw = await putUsuarioActivo(id)
  return mapUsuario(raw)
}

export async function cambiarRolUsuario(id: number, rol: string): Promise<Usuario> {
  const raw = await putUsuarioRol(id, rol)
  return mapUsuario(raw)
}

export async function resetearPasswordUsuario(id: number, password: string): Promise<Usuario> {
  const raw = await putUsuarioPassword(id, password)
  return mapUsuario(raw)
}