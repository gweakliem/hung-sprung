export function diffMs(first: Date, last: Date): number {
  return last.getTime() - first.getTime()
}

export function formatDays(ms: number): number {
  return parseFloat((ms / 86_400_000).toFixed(6))
}

export function formatMinutes(ms: number): number {
  return Math.trunc(ms / 60_000)
}

export function formatSeconds(ms: number): number {
  return Math.trunc(ms / 1_000)
}

export function toDateString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function parseDateString(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
