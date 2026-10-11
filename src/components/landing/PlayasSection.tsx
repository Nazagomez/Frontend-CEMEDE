import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react'
import { useLandingPlayasEstado } from '@/hooks/useLandingPlayasEstado'
import type { EstadoOcupacion } from '@/types/Admin/capacidad'
import heroPlaya from '@/assets/hero-playa.jpeg'

const disponibilidad: Record<EstadoOcupacion, { label: string; badge: string }> = {
  normal: { label: 'Disponible', badge: 'bg-white/10 text-white/90' },
  advertencia: { label: 'Concurrida', badge: 'bg-white/10 text-white/90' },
  critico: { label: 'Al límite', badge: 'bg-white/10 text-white/90' },
}

const AREA_PROTEGIDA: Record<string, string> = {
  'Junquillal de la Cruz': 'Refugio Nacional de Vida Silvestre Bahía Junquillal',
  'Playa Grande': 'Parque Nacional Marino Las Baulas',
}

function abrirEnMapa(latitud: number, longitud: number) {
  window.open(`https://www.google.com/maps?q=${latitud},${longitud}`, '_blank', 'noreferrer')
}

export function PlayasSection() {
  const { resumen, isLoading } = useLandingPlayasEstado()
  const [seleccionadaId, setSeleccionadaId] = useState<number | null>(null)

  useEffect(() => {
    if (seleccionadaId === null && resumen.length > 0) {
      setSeleccionadaId(resumen[0].id)
    }
  }, [resumen, seleccionadaId])

  const playa = resumen.find((p) => p.id === seleccionadaId) ?? resumen[0]

  return (
    <section id="playas" className="bg-transparent px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-white/70">Dos territorios monitoreados</p>
        <h2 className="mx-auto mt-2 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
          La capacidad no es igual para todas las playas
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
          Cada sitio tiene una historia, un ecosistema y un límite distinto. Seleccioná una playa para conocer su contexto.
        </p>

        {isLoading && <div className="mt-10 h-96 animate-pulse rounded-2xl bg-white/15" />}

        {!isLoading && resumen.length > 0 && (
          <>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {resumen.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSeleccionadaId(p.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                    p.id === playa?.id ? 'border-white/40 bg-white/20 text-white' : 'border-white/15 bg-white/10 text-white/80 hover:bg-white/15'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {p.nombre}
                </button>
              ))}
            </div>

            {playa && (
              <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-left text-white backdrop-blur-md md:grid-cols-2">
                <div className="relative min-h-64">
                  <img src={heroPlaya} alt={playa.nombre} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden />
                    Monitoreo activo
                  </span>
                </div>

                <div className="flex flex-col p-8">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                      {playa.canton}, {playa.provincia}
                    </p>
                    {playa.estado && (
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${disponibilidad[playa.estado].badge}`}>
                        {disponibilidad[playa.estado].label}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1 text-2xl font-semibold">{playa.nombre}</h3>

                  <p className="mt-3 border-l-2 border-white/30 pl-3 text-sm font-medium text-white/90">
                    {AREA_PROTEGIDA[playa.nombre] ?? 'Zona costera protegida de Guanacaste'}
                  </p>

                  <p className="mt-3 text-sm text-white/75">
                    {playa.descripcion || 'Playa integrada al sistema de monitoreo de capacidad de carga turística de CEMEDE.'}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                    <div>
                      <p className="text-xl font-semibold">{playa.visitantesActuales}</p>
                      <p className="text-xs text-white/60">personas ahora</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold">{Math.round(playa.cce).toLocaleString('es-CR')}</p>
                      <p className="text-xs text-white/60">capacidad efectiva</p>
                    </div>
                    <div>
                      <p className="text-xl font-semibold">{playa.porcentajeOcupacion}%</p>
                      <p className="text-xs text-white/60">ocupación</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link to="/visitante" className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white">
                      Ver estado y capacidad
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                    {playa.latitud !== null && playa.longitud !== null && (
                      <button
                        type="button"
                        onClick={() => abrirEnMapa(playa.latitud as number, playa.longitud as number)}
                        className="flex items-center gap-1 text-xs text-white/60 hover:text-white"
                      >
                        Ver en el mapa
                        <ExternalLink className="h-3 w-3" aria-hidden />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}