import { describe, it, expect } from 'vitest'
import { diffMs, formatDays, formatMinutes, formatSeconds } from '../app/utils/dateMath'

describe('dateMath', () => {
  it('1 hour = 3600 seconds = 60 minutes = 1/24 day', () => {
    const first = new Date(Date.UTC(2024, 0, 1, 0, 0, 0))
    const last = new Date(Date.UTC(2024, 0, 1, 1, 0, 0))
    const ms = diffMs(first, last)
    expect(formatSeconds(ms)).toBe(3600)
    expect(formatMinutes(ms)).toBe(60)
    expect(formatDays(ms)).toBeCloseTo(1 / 24, 6)
  })

  it('2024-02-28 → 2024-03-01 = 2 days (leap year)', () => {
    const first = new Date(Date.UTC(2024, 1, 28))
    const last = new Date(Date.UTC(2024, 2, 1))
    expect(formatDays(diffMs(first, last))).toBe(2)
  })

  it('2023-02-28 → 2023-03-01 = 1 day (non-leap)', () => {
    const first = new Date(Date.UTC(2023, 1, 28))
    const last = new Date(Date.UTC(2023, 2, 1))
    expect(formatDays(diffMs(first, last))).toBe(1)
  })

  it('2000-01-01 → 2024-01-01 = 8766 days', () => {
    const first = new Date(Date.UTC(2000, 0, 1))
    const last = new Date(Date.UTC(2024, 0, 1))
    expect(formatDays(diffMs(first, last))).toBe(8766)
  })

  it('1900-01-01 → 2000-01-01 = 36524 days (1900 not a leap year)', () => {
    const first = new Date(Date.UTC(1900, 0, 1))
    const last = new Date(Date.UTC(2000, 0, 1))
    expect(formatDays(diffMs(first, last))).toBe(36524)
  })

  it('negative diffs return negative values', () => {
    const first = new Date(Date.UTC(2024, 0, 2))
    const last = new Date(Date.UTC(2024, 0, 1))
    const ms = diffMs(first, last)
    expect(formatDays(ms)).toBeLessThan(0)
    expect(formatMinutes(ms)).toBeLessThan(0)
    expect(formatSeconds(ms)).toBeLessThan(0)
  })
})
