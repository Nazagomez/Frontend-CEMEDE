import { Sun, Droplets, Wind } from 'lucide-react'

export function WeatherBanner() {
  return (
    <div className="mt-6 flex flex-col gap-3 rounded-xl bg-navy-900 px-6 py-4 text-white sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Sun className="h-6 w-6 text-white/80" aria-hidden />
        <div>
          <p className="text-lg font-semibold leading-tight">28°C</p>
          <p className="text-xs text-white/60">Guanacaste, Costa Rica</p>
        </div>
      </div>
      <div className="flex items-center gap-5 text-sm text-white/80">
        <span className="flex items-center gap-1.5">
          <Droplets className="h-4 w-4" aria-hidden />
          65% humedad
        </span>
        <span className="flex items-center gap-1.5">
          <Wind className="h-4 w-4" aria-hidden />
          Brisa moderada
        </span>
      </div>
    </div>
  )
}