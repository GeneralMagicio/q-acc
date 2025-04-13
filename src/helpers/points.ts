export function roundPoints(value: number): number {
  const integerPart = Math.floor(value);
  const decimalPart = value - integerPart;

  return decimalPart < 0.5 ? integerPart : Math.ceil(value);
}
