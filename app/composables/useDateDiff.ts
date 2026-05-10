import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { diffMs, formatDays, formatMinutes, formatSeconds, toDateString, parseDateString } from '~/utils/dateMath'

export type Unit = 'days' | 'weeks' | 'months' | 'years'

function offsetFromBirthdate(birthdate: Date, amount: number, unit: Unit): Date {
  const d = new Date(birthdate)
  d.setHours(0, 0, 0, 0)
  if (unit === 'days')   d.setDate(d.getDate() + amount)
  if (unit === 'weeks')  d.setDate(d.getDate() + amount * 7)
  if (unit === 'months') d.setMonth(d.getMonth() + amount)
  if (unit === 'years')  d.setFullYear(d.getFullYear() + amount)
  return d
}

export function useDateDiff() {
  const route = useRoute()
  const router = useRouter()

  const birthdateStr = ref<string>('')
  const backAmount = ref<number>(1000)
  const backUnit = ref<Unit>('days')
  const backSign = ref<1 | -1>(1)

  onMounted(() => {
    birthdateStr.value = (route.query.birthdate as string) || ''
    backAmount.value = Math.abs(Number(route.query.back)) || 1000
    backUnit.value = (route.query.unit as Unit) || 'days'
    backSign.value = route.query.sign === '-' ? -1 : 1
  })

  watch([birthdateStr, backAmount, backUnit, backSign], ([birthdate, back, unit, sign]) => {
    router.replace({
      query: {
        birthdate: birthdate || undefined,
        back: String(back),
        unit,
        sign: sign === -1 ? '-' : '+',
      },
    })
  })

  const birthdate = computed(() => (birthdateStr.value ? parseDateString(birthdateStr.value) : null))

  const signedAmount = computed(() => backSign.value * backAmount.value)

  const targetDate = computed(() =>
    birthdate.value ? offsetFromBirthdate(birthdate.value, signedAmount.value, backUnit.value) : null
  )

  const targetDateStr = computed(() =>
    targetDate.value ? targetDate.value.toLocaleDateString(undefined, { dateStyle: 'long' }) : ''
  )

  const ms = computed(() => {
    if (!birthdate.value || !targetDate.value) return null
    return diffMs(birthdate.value, targetDate.value)
  })

  const birthdateDaysAgo = computed(() => {
    if (!birthdate.value) return null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Math.floor(diffMs(birthdate.value, today) / 86_400_000)
  })

  const days    = computed(() => (ms.value !== null ? formatDays(ms.value) : null))
  const minutes = computed(() => (ms.value !== null ? formatMinutes(ms.value) : null))
  const seconds = computed(() => (ms.value !== null ? formatSeconds(ms.value) : null))
  const isNegative = computed(() => ms.value !== null && ms.value < 0)

  return { birthdateStr, backAmount, backUnit, backSign, signedAmount, targetDate, targetDateStr, birthdateDaysAgo, days, minutes, seconds, isNegative }
}
