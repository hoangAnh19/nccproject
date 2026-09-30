export function currentEvaluationPeriod(date = new Date()): string {
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${date.getFullYear()}-Q${quarter}`;
}

export function isQuarterlyEvaluationPeriod(value: string): boolean {
  return /^\d{4}-Q[1-4]$/.test(value);
}
