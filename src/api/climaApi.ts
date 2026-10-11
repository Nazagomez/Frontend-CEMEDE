import type { ClimaActualRaw } from '@/types/clima'

const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast'
const CLIMA_VARIABLES = 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code'
const ZONA_HORARIA = 'America/Costa_Rica'

/** Fetches current weather from Open-Meteo for the given coordinates. */
export async function fetchClimaActual(latitud: number, longitud: number, signal?: AbortSignal): Promise<ClimaActualRaw> {
  const params = new URLSearchParams({
    latitude: String(latitud),
    longitude: String(longitud),
    current: CLIMA_VARIABLES,
    timezone: ZONA_HORARIA,
  })
  const response = await fetch(`${OPEN_METEO_URL}?${params.toString()}`, { signal })
  if (!response.ok) {
    throw new Error('No se pudo consultar el clima.')
  }
  return response.json() as Promise<ClimaActualRaw>
}
