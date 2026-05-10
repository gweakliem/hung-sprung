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

export function breakdownDuration(first: Date, last: Date): { years: number; months: number; days: number } {
  const negative = last < first
  const [start, end] = negative ? [last, first] : [first, last]

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months--
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  return negative ? { years: -years, months: -months, days: -days } : { years, months, days }
}

export function toDateString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function parseDateString(s: string): Date {
  const parts = s.split('-')
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
}
