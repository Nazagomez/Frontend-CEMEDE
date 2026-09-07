import { postEntradaVisitante } from '@/api/visitantesApi'
import type { EntradaVisitanteRequest } from '@/api/visitantesApi'

export async function registrarVisitaPublica(payload: EntradaVisitanteRequest): Promise<{ id: number; mensaje: string | null }> {
  const raw = await postEntradaVisitante(payload)
  return { id: raw.id, mensaje: raw.mensaje ?? null }
}