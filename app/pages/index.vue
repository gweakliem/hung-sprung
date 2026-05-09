<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">How far back?</h1>

      <!-- Step 1: Birthdate -->
      <div class="bg-white rounded-2xl shadow p-6 mb-2">
        <label class="block text-sm font-medium text-gray-600 mb-1">Your birthdate</label>
        <input
          v-model="birthdateStr"
          type="date"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div v-if="birthdateDaysAgo !== null" class="text-center text-sm text-gray-500 mb-6">
        That was {{ birthdateDaysAgo.toLocaleString() }} days ago
      </div>

      <!-- Step 2: How far back -->
      <div v-if="birthdateStr" class="bg-white rounded-2xl shadow p-6 mb-6">
        <label class="block text-sm font-medium text-gray-600 mb-3">How far back?</label>
        <div class="flex gap-3">
          <input
            v-model.number="backAmount"
            type="number"
            min="1"
            class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            v-model="backUnit"
            class="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="days">days</option>
            <option value="weeks">weeks</option>
            <option value="months">months</option>
            <option value="years">years</option>
          </select>
        </div>
      </div>

      <!-- Target date hero -->
      <div v-if="birthdateStr && targetDateStr" class="bg-white rounded-2xl shadow p-8 mb-6 text-center">
        <p class="text-4xl font-bold leading-tight text-gray-800">
          {{ backAmount }} {{ backUnit }} ago was {{ targetDateStr }}
        </p>
      </div>

      <template v-if="days !== null">
        <!-- Informational stats -->
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div class="bg-white rounded-xl shadow-sm p-4 text-center">
            <div class="text-lg font-semibold" :class="isNegative ? 'text-red-400' : 'text-gray-700'">{{ days }}</div>
            <div class="text-xs uppercase tracking-wide text-gray-400 mt-1">Days</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 text-center">
            <div class="text-lg font-semibold" :class="isNegative ? 'text-red-400' : 'text-gray-700'">{{ minutes?.toLocaleString() }}</div>
            <div class="text-xs uppercase tracking-wide text-gray-400 mt-1">Minutes</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 text-center">
            <div class="text-lg font-semibold" :class="isNegative ? 'text-red-400' : 'text-gray-700'">{{ seconds?.toLocaleString() }}</div>
            <div class="text-xs uppercase tracking-wide text-gray-400 mt-1">Seconds</div>
          </div>
        </div>

        <!-- Trivia section -->
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-sm font-medium uppercase tracking-widest text-gray-400 mb-4">Trivia</h2>
          <p class="text-gray-400 text-sm italic">Coming soon — horoscopes and more.</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { birthdateStr, backAmount, backUnit, targetDateStr, birthdateDaysAgo, days, minutes, seconds, isNegative } = useDateDiff()
</script>
