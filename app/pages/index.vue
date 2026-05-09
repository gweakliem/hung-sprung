<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Date Difference Calculator</h1>

      <!-- Inputs -->
      <div class="bg-white rounded-2xl shadow p-6 mb-6">
        <div class="flex flex-col md:flex-row md:gap-6">
          <!-- Last date (here) -->
          <div class="flex-1 mb-4 md:mb-0">
            <label class="block text-sm font-medium text-gray-600 mb-1">here</label>
            <div class="flex gap-2">
              <input
                v-model="lastDateStr"
                type="date"
                class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                @click="setLastToNow"
                class="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
              >
                Now
              </button>
            </div>
          </div>

          <!-- Swap button (centered between inputs) -->
          <div class="flex items-end justify-center mb-4 md:mb-0 md:pt-6">
            <button
              @click="swap"
              title="Swap dates"
              class="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors"
            >
              ⇅ Swap
            </button>
          </div>

          <!-- First date (there) -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-600 mb-1">there</label>
            <input
              v-model="firstDateStr"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <!-- Negative warning -->
      <p v-if="isNegative" class="text-red-600 text-center font-medium mb-4">
        First date is after last date
      </p>

      <!-- Result cards -->
      <div v-if="days !== null" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          class="bg-white rounded-2xl shadow p-6 text-center"
          :class="isNegative ? 'text-red-600' : 'text-gray-800'"
        >
          <div class="text-4xl font-bold mb-2">{{ days }}</div>
          <div class="text-sm font-medium uppercase tracking-wide text-gray-500">Days</div>
        </div>

        <div
          class="bg-white rounded-2xl shadow p-6 text-center"
          :class="isNegative ? 'text-red-600' : 'text-gray-800'"
        >
          <div class="text-4xl font-bold mb-2">{{ minutes?.toLocaleString() }}</div>
          <div class="text-sm font-medium uppercase tracking-wide text-gray-500">Minutes</div>
        </div>

        <div
          class="bg-white rounded-2xl shadow p-6 text-center"
          :class="isNegative ? 'text-red-600' : 'text-gray-800'"
        >
          <div class="text-4xl font-bold mb-2">{{ seconds?.toLocaleString() }}</div>
          <div class="text-sm font-medium uppercase tracking-wide text-gray-500">Seconds</div>
        </div>
      </div>

      <p v-else class="text-center text-gray-400 mt-8">Enter a first date to see the difference.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { firstDateStr, lastDateStr, days, minutes, seconds, isNegative, setLastToNow, swap } = useDateDiff()
</script>
