import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, ArrowRight } from 'lucide-react'
import { calcularCapacidad } from '@/services/calculoCapacidadService'

const OPCIONES_MANEJO = [
  { valor: 25, etiqueta: '25 % · Preparación baja' },
  { valor: 50, etiqueta: '50 % · Preparación media' },
  { valor: 75, etiqueta: '75 % · Preparación alta' },
  { valor: 100, etiqueta: '100 % · Preparación completa' },
] as const

const OPCIONES_AMBIENTE = [
  { valor: 0, etiqueta: 'Sin reducción' },
  { valor: 10, etiqueta: 'Leve · reduce 10 %' },
  { valor: 25, etiqueta: 'Moderada · reduce 25 %' },
  { valor: 50, etiqueta: 'Alta · reduce 50 %' },
  { valor: 80, etiqueta: 'Severa · reduce 80 %' },
] as const

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
    <section id="calculadora" className="bg-transparent px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wider text-white/70">Probá la metodología</p>
          <h2 className="mx-auto mt-2 max-w-xl text-2xl font-semibold text-white sm:text-3xl">Una cifra que se entiende</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/75">
            Ajustá los valores y observá cómo cambia la capacidad recomendada para una playa.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-md lg:grid-cols-2">
          <div className="flex flex-col gap-5 p-8">
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

            <Selector
              id="capacidad-manejo"
              label="Capacidad de manejo"
              valor={capacidadManejo}
              ayuda="Qué tan preparado está el sitio: personal, señalización e infraestructura."
              opciones={OPCIONES_MANEJO}
              onChange={setCapacidadManejo}
            />
            <Selector
              id="condicion-ambiental"
              label="Condición ambiental hoy"
              valor={reduccionAmbiental}
              ayuda="Simulá una marea alta, marea roja u otro evento que reduzca el área disponible."
              opciones={OPCIONES_AMBIENTE}
              onChange={setReduccionAmbiental}
            />
          </div>

          <div className="flex flex-col justify-center border-t border-white/10 p-8 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-2 text-white">
              <Calculator className="h-4 w-4" aria-hidden />
              <span className="text-xs">Capacidad efectiva estimada</span>
            </div>
            <p className="mt-2 text-5xl font-bold">{resultado.cce.toLocaleString('es-CR')}</p>
            <p className="mt-1 text-sm text-white">visitas por día · la cifra que no conviene superar</p>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white transition-[width] duration-300 ease-out" style={{ width: `${pctBarra}%` }} />
            </div>

            <div className="mt-8 flex items-center gap-8 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs text-white">CCF física</p>
                <p className="mt-1 text-xl font-semibold">{resultado.ccf.toLocaleString('es-CR')}</p>
              </div>
              <div>
                <p className="text-xs text-white">CCR real</p>
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

function Selector({
  id,
  label,
  valor,
  ayuda,
  opciones,
  onChange,
}: {
  id: string
  label: string
  valor: number
  ayuda: string
  opciones: readonly { valor: number; etiqueta: string }[]
  onChange: (valor: number) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-white">{label}</label>
      <select
        id={id}
        value={valor}
        onChange={(evento) => onChange(Number(evento.target.value))}
        className="scheme-dark mt-1.5 w-full rounded-lg border border-white/30 bg-[#062833]/45 px-3 py-2 text-sm text-white outline-none focus:border-white"
      >
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>{opcion.etiqueta}</option>
        ))}
      </select>
      <p className="mt-1 text-xs text-white">{ayuda}</p>
    </div>
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
      <label className="text-sm font-medium text-white">{label}</label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={valor}
          onChange={(e) => onChange(Number(e.target.value))}
          className="scheme-dark w-full rounded-lg border border-white/30 bg-[#062833]/45 px-3 py-2 text-sm text-white outline-none focus:border-white"
        />
        <span className="shrink-0 text-xs text-white">{unidad}</span>
      </div>
    </div>
  )
}