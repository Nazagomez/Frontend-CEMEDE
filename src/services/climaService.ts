import { fetchClimaActual } from '@/api/climaApi'
import type { ClimaActual, ClimaConsulta } from '@/types/clima'

const FALLBACK_LATITUD = 10.55
const FALLBACK_LONGITUD = -85.7
const FALLBACK_LUGAR = 'Guanacaste, Costa Rica'
const VIENTO_CALMA_KMH = 6
const VIENTO_LIGERO_KMH = 12
const VIENTO_MODERADO_KMH = 20
const VIENTO_FRESCO_KMH = 29
const VIENTO_FUERTE_KMH = 39

function describeViento(velocidadKmh: number): string {
  if (velocidadKmh < VIENTO_CALMA_KMH) return 'Calma'
  if (velocidadKmh < VIENTO_LIGERO_KMH) return 'Brisa ligera'
  if (velocidadKmh < VIENTO_MODERADO_KMH) return 'Brisa moderada'
  if (velocidadKmh < VIENTO_FRESCO_KMH) return 'Brisa fresca'
  if (velocidadKmh < VIENTO_FUERTE_KMH) return 'Viento moderado'
  return 'Viento fuerte'
}

function resolveCoordenadas(consulta: ClimaConsulta): { latitud: number; longitud: number; lugar: string } {
  const lugar = consulta.lugar?.trim() || FALLBACK_LUGAR
  if (consulta.latitud === null || consulta.longitud === null) {
    return { latitud: FALLBACK_LATITUD, longitud: FALLBACK_LONGITUD, lugar }
  }
  return { latitud: consulta.latitud, longitud: consulta.longitud, lugar }
}

/** Returns current weather for a beach, or Guanacaste when coordinates are missing. */
export async function getClimaActual(consulta: ClimaConsulta): Promise<ClimaActual> {
  const ubicacion = resolveCoordenadas(consulta)
  const raw = await fetchClimaActual(ubicacion.latitud, ubicacion.longitud, consulta.signal)
  return {
    lugar: ubicacion.lugar,
    temperaturaC: Math.round(raw.current.temperature_2m),
    humedadPorcentaje: Math.round(raw.current.relative_humidity_2m),
    viento: describeViento(raw.current.wind_speed_10m),
    codigoClima: raw.current.weather_code,
  }
}
