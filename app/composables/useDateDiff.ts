import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { diffMs, formatDays, formatMinutes, formatSeconds, toDateString, parseDateString } from '~/utils/dateMath'

export function useDateDiff() {
  const route = useRoute()
  const router = useRouter()

  const firstDateStr = ref<string>('')
  const lastDateStr = ref<string>('')

  onMounted(() => {
    const today = toDateString(new Date())
    lastDateStr.value = (route.query.here as string) || today
    firstDateStr.value = (route.query.there as string) || today
  })

  watch([lastDateStr, firstDateStr], ([here, there]) => {
    router.replace({ query: { here: here || undefined, there: there || undefined } })
  })

  const firstDate = computed(() => (firstDateStr.value ? parseDateString(firstDateStr.value) : null))
  const lastDate = computed(() => (lastDateStr.value ? parseDateString(lastDateStr.value) : null))

  const ms = computed(() => {
    if (!firstDate.value || !lastDate.value) return null
    return diffMs(firstDate.value, lastDate.value)
  })

  const days = computed(() => (ms.value !== null ? formatDays(ms.value) : null))
  const minutes = computed(() => (ms.value !== null ? formatMinutes(ms.value) : null))
  const seconds = computed(() => (ms.value !== null ? formatSeconds(ms.value) : null))
  const isNegative = computed(() => ms.value !== null && ms.value < 0)

  function setLastToNow() {
    lastDateStr.value = toDateString(new Date())
  }

  function swap() {
    const tmp = firstDateStr.value
    firstDateStr.value = lastDateStr.value
    lastDateStr.value = tmp
  }

  return { firstDateStr, lastDateStr, days, minutes, seconds, isNegative, setLastToNow, swap }
}
