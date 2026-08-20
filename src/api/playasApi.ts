import { httpClient } from '@/api/httpClient'
import type { PlayaRaw } from '@/types/playas'

export async function fetchPlayas(): Promise<PlayaRaw[]> {
  const { data } = await httpClient.get<PlayaRaw[]>('/playas')
  return data
}