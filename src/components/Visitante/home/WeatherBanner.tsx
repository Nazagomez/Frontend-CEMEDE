import { Cloud, CloudLightning, CloudRain, CloudSun, Droplets, Sun, Wind } from 'lucide-react'
import type { ClimaActual } from '@/types/clima'

interface WeatherBannerProps {
  clima: ClimaActual | null
  isLoading: boolean
  error: string | null
}

function ClimaIcon({ codigo }: { codigo: number }) {
  const className = 'h-6 w-6 text-white/80'
  if (codigo === 0) return <Sun className={className} aria-hidden />
  if (codigo <= 3) return <CloudSun className={className} aria-hidden />
  if (codigo >= 95) return <CloudLightning className={className} aria-hidden />
  if (codigo >= 51) return <CloudRain className={className} aria-hidden />
  return <Cloud className={className} aria-hidden />
}

export function WeatherBanner({ clima, isLoading, error }: WeatherBannerProps) {
  const lugar = clima?.lugar ?? 'Guanacaste, Costa Rica'
  const temperatura = isLoading ? 'Consultando…' : error || !clima ? '—' : `${clima.temperaturaC}°C`
  const humedad = clima ? `${clima.humedadPorcentaje}% humedad` : 'Humedad'
  const viento = error ?? clima?.viento ?? 'Viento'
  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-white backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {clima ? <ClimaIcon codigo={clima.codigoClima} /> : <Sun className="h-6 w-6 text-white/80" aria-hidden />}
        <div>
          <p className="text-lg font-semibold leading-tight">{temperatura}</p>
          <p className="text-xs text-white">{lugar}</p>
        </div>
      </div>
      <div className="flex items-center gap-5 text-sm text-white">
        <span className="flex items-center gap-1.5">
          <Droplets className="h-4 w-4" aria-hidden />
          {humedad}
        </span>
        <span className="flex items-center gap-1.5">
          <Wind className="h-4 w-4" aria-hidden />
          {viento}
        </span>
      </div>
    </div>
  )
}
