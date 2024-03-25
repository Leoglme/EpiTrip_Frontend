export function isNumeric(str: unknown): boolean {
  if (typeof str !== 'string') return false
  return !isNaN(Number(str))
}
