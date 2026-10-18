/** Returns an empty string when the field only contains zero, so typing can start clean. */
export function quitarCero(valor: string): string {
  if (valor.trim() === '') return valor
  return Number(valor) === 0 ? '' : valor
}
