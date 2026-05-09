import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { diffMs, formatDays, formatMinutes, formatSeconds, toDateString, parseDateString } from '~/utils/dateMath'

export type Unit = 'days' | 'weeks' | 'months' | 'years'

function subtractFromToday(amount: number, unit: Unit): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  if (unit === 'days')   d.setDate(d.getDate() - amount)
  if (unit === 'weeks')  d.setDate(d.getDate() - amount * 7)
  if (unit === 'months') d.setMonth(d.getMonth() - amount)
  if (unit === 'years')  d.setFullYear(d.getFullYear() - amount)
  return d
}

export function useDateDiff() {
  const route = useRoute()
  const router = useRouter()

  const birthdateStr = ref<string>('')
  const backAmount = ref<number>(1000)
  const backUnit = ref<Unit>('days')

  onMounted(() => {
    birthdateStr.value = (route.query.birthdate as string) || ''
    backAmount.value = Number(route.query.back) || 1000
    backUnit.value = (route.query.unit as Unit) || 'days'
  })

  watch([birthdateStr, backAmount, backUnit], ([birthdate, back, unit]) => {
    router.replace({
      query: {
        birthdate: birthdate || undefined,
        back: String(back),
        unit,
      },
    })
  })

  const birthdate = computed(() => (birthdateStr.value ? parseDateString(birthdateStr.value) : null))

  const targetDate = computed(() =>
    backAmount.value > 0 ? subtractFromToday(backAmount.value, backUnit.value) : null
  )

  const targetDateStr = computed(() =>
    targetDate.value ? targetDate.value.toLocaleDateString(undefined, { dateStyle: 'long' }) : ''
  )

  const ms = computed(() => {
    if (!birthdate.value || !targetDate.value) return null
    return diffMs(birthdate.value, targetDate.value)
  })

  const days    = computed(() => (ms.value !== null ? formatDays(ms.value) : null))
  const minutes = computed(() => (ms.value !== null ? formatMinutes(ms.value) : null))
  const seconds = computed(() => (ms.value !== null ? formatSeconds(ms.value) : null))
  const isNegative = computed(() => ms.value !== null && ms.value < 0)

  return { birthdateStr, backAmount, backUnit, targetDate, targetDateStr, days, minutes, seconds, isNegative }
}
