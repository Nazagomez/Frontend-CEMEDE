import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, ArrowRight } from 'lucide-react'
import { calcularCapacidad } from '@/services/calculoCapacidadService'

export function CalculadoraCapacidad() {
  const [areaUtil, setAreaUtil] = useState(45000)
  const [areaPorVisitante, setAreaPorVisitante] = useState(20)
  const [periodoHoras, setPeriodoHoras] = useState(8)
  const [permanencia, setPermanencia] = useState(4)
  const [capacidadManejo, setCapacidadManejo] = useState(75)
  const [reduccionAmbiental, setReduccionAmbiental] = useState(0)

  const resultado = useMemo(
    () =>
      calcularCapacidad({
        areaUtilM2: areaUtil,
        areaPorVisitanteM2: areaPorVisitante,
        periodoHoras,
        tiempoPermanenciaHoras: permanencia,
        capacidadManejoPorcentaje: capacidadManejo,
        reduccionAmbientalPorcentaje: reduccionAmbiental,
      }),
    [areaUtil, areaPorVisitante, periodoHoras, permanencia, capacidadManejo, reduccionAmbiental]
  )

  const pctBarra = resultado.ccf > 0 ? Math.min((resultado.cce / resultado.ccf) * 100, 100) : 0

  return (
    <section id="calculadora" className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-navy-700">Probá la metodología</p>
          <h2 className="mx-auto mt-2 max-w-xl text-2xl font-semibold text-navy-900 sm:text-3xl">Una cifra que se entiende</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink-500">
            Ajustá los valores y observá cómo cambia la capacidad recomendada para una playa.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 shadow-sm lg:grid-cols-2">
          <div className="flex flex-col gap-5 bg-white p-8">
            <Campo label="Área útil de playa" valor={areaUtil} unidad="m²" min={500} max={100000} step={500} onChange={setAreaUtil} />
            <Campo
              label="Espacio por visitante"
              valor={areaPorVisitante}
              unidad="m² / persona"
              min={1}
              max={50}
              step={1}
              onChange={setAreaPorVisitante}
            />
            <Campo label="Horas de apertura al día" valor={periodoHoras} unidad="horas" min={1} max={24} step={1} onChange={setPeriodoHoras} />
            <Campo label="Permanencia promedio" valor={permanencia} unidad="horas" min={0.5} max={12} step={0.5} onChange={setPermanencia} />

            <div>
              <div className="flex items-center justify-between text-sm">
                <label className="font-medium text-ink-700">Capacidad de manejo</label>
                <span className="font-medium text-navy-900">{capacidadManejo}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={capacidadManejo}
                onChange={(e) => setCapacidadManejo(Number(e.target.value))}
                className="mt-2 w-full accent-navy-700"
              />
              <p className="mt-1 text-xs text-ink-500">Qué tan preparado está el sitio: personal, señalización e infraestructura.</p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <label className="font-medium text-ink-700">Condición ambiental hoy</label>
                <span className="font-medium text-navy-900">-{reduccionAmbiental}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                value={reduccionAmbiental}
                onChange={(e) => setReduccionAmbiental(Number(e.target.value))}
                className="mt-2 w-full accent-alert-600"
              />
              <p className="mt-1 text-xs text-ink-500">Simulá una marea alta, marea roja u otro evento que reduzca el área disponible.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-navy-900 p-8 text-white">
            <div className="flex items-center gap-2 text-white/60">
              <Calculator className="h-4 w-4" aria-hidden />
              <span className="text-xs">Capacidad efectiva estimada</span>
            </div>
            <p className="mt-2 text-5xl font-bold">{resultado.cce.toLocaleString('es-CR')}</p>
            <p className="mt-1 text-sm text-white/60">visitas por día · la cifra que no conviene superar</p>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white transition-[width] duration-300 ease-out" style={{ width: `${pctBarra}%` }} />
            </div>

            <div className="mt-8 flex items-center gap-8 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs text-white/60">CCF física</p>
                <p className="mt-1 text-xl font-semibold">{resultado.ccf.toLocaleString('es-CR')}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">CCR real</p>
                <p className="mt-1 text-xl font-semibold">{resultado.ccr.toLocaleString('es-CR')}</p>
              </div>
            </div>

            <Link to="/visitante/capacidad" className="mt-8 flex items-center gap-1.5 text-sm font-medium text-white hover:text-white/80">
              Ver análisis completo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Campo({
  label,
  valor,
  unidad,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  valor: number
  unidad: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-700">{label}</label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={valor}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-navy-700"
        />
        <span className="shrink-0 text-xs text-ink-500">{unidad}</span>
      </div>
    </div>
  )
}