export interface ParametrosCapacidad {
  areaUtilM2: number
  areaPorVisitanteM2: number
  periodoHoras: number
  tiempoPermanenciaHoras: number
  capacidadManejoPorcentaje: number
  reduccionAmbientalPorcentaje: number
}

export interface ResultadoCapacidad {
  ccf: number
  ccr: number
  cce: number
}

/** Misma fórmula que usa el backend (capacidad_service.py) — Cifuentes et al., 1999. */
export function calcularCapacidad(params: ParametrosCapacidad): ResultadoCapacidad {
  const {
    areaUtilM2,
    areaPorVisitanteM2,
    periodoHoras,
    tiempoPermanenciaHoras,
    capacidadManejoPorcentaje,
    reduccionAmbientalPorcentaje,
  } = params

  if (areaPorVisitanteM2 <= 0 || tiempoPermanenciaHoras <= 0) {
    return { ccf: 0, ccr: 0, cce: 0 }
  }

  const nv = periodoHoras / tiempoPermanenciaHoras
  const ccf = (areaUtilM2 / areaPorVisitanteM2) * nv

  const factorCorreccion = Math.max(1 - reduccionAmbientalPorcentaje / 100, 0)
  const ccr = ccf * factorCorreccion

  const cce = ccr * (capacidadManejoPorcentaje / 100)

  return {
    ccf: Math.round(ccf),
    ccr: Math.round(ccr),
    cce: Math.round(cce),
  }
}