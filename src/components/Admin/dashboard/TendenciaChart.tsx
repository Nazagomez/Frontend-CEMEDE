import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import type { PuntoTendencia } from '@/types/Admin/dashboard'

interface TendenciaChartProps {
  tendencia: PuntoTendencia[]
  nombresPlayas: string[]
}

const COLORS = ['#002341', '#c81e2e', '#245a86', '#db3d4c']

export function TendenciaChart({ tendencia, nombresPlayas }: TendenciaChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="font-semibold text-navy-900">Tendencia de ocupación</h2>
      <p className="mt-1 text-xs text-ink-500">% de ocupación por playa a lo largo del tiempo.</p>

      {tendencia.length === 0 ? (
        <p className="mt-8 text-sm text-ink-500">
          Todavía no hay suficiente histórico de estimaciones para graficar.
        </p>
      ) : (
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tendencia}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {nombresPlayas.map((nombre, i) => (
                <Line
                  key={nombre}
                  type="monotone"
                  dataKey={nombre}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}