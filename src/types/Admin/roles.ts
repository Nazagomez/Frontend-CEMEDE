export interface PermisoCatalogo {
  id: number
  clave: string
  nombre: string
  descripcion: string | null
}

export interface RolPermisos {
  rol: string
  permisos: string[]
}