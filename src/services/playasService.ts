import { fetchPlayas } from '@/api/playasApi'
import type { Playa, PlayaRaw } from '@/types/playas'

function mapPlaya(raw: PlayaRaw): Playa {
  return {
    id: raw.id,
    nombre: raw.nombre,
    descripcion: raw.descripcion,
    areaUtilM2: raw.area_util_m2,
    canton: raw.canton,
    provincia: raw.provincia,
    latitud: raw.latitud,
    longitud: raw.longitud,
    activa: raw.activa,
  }
}

export async function getPlayas(): Promise<Playa[]> {
  const raw = await fetchPlayas()
  return raw.map(mapPlaya)
}