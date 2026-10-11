export interface ClimaActualRaw {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
}

export interface ClimaActual {
  readonly lugar: string
  readonly temperaturaC: number
  readonly humedadPorcentaje: number
  readonly viento: string
  readonly codigoClima: number
}

export interface ClimaConsulta {
  readonly latitud: number | null
  readonly longitud: number | null
  readonly lugar: string | null
  readonly signal?: AbortSignal
}
