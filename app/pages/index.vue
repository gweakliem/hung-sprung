<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">How far back?</h1>

      <!-- Step 1: Birthdate -->
      <div class="bg-white rounded-2xl shadow p-6 mb-6">
        <label class="block text-sm font-medium text-gray-600 mb-1">Your birthdate</label>
        <input
          v-model="birthdateStr"
          type="date"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Step 2: How far back (shown once birthdate is entered) -->
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
        <p class="text-sm text-gray-500 mt-2">
          {{ backAmount }} {{ backUnit }} ago was <span class="font-medium text-gray-700">{{ targetDateStr }}</span>
        </p>
      </div>

      <!-- Negative warning -->
      <p v-if="isNegative" class="text-red-600 text-center font-medium mb-4">
        You weren't born yet on that date
      </p>

      <!-- Result cards -->
      <div v-if="days !== null" class="grid grid-cols-3 gap-4">
        <div
          class="bg-white rounded-2xl shadow p-6 text-center"
          :class="isNegative ? 'text-red-500' : 'text-gray-800'"
        >
          <div class="text-3xl font-bold mb-2">{{ days }}</div>
          <div class="text-xs font-medium uppercase tracking-wide text-gray-500">Days</div>
        </div>
        <div
          class="bg-white rounded-2xl shadow p-6 text-center"
          :class="isNegative ? 'text-red-500' : 'text-gray-800'"
        >
          <div class="text-3xl font-bold mb-2">{{ minutes?.toLocaleString() }}</div>
          <div class="text-xs font-medium uppercase tracking-wide text-gray-500">Minutes</div>
        </div>
        <div
          class="bg-white rounded-2xl shadow p-6 text-center"
          :class="isNegative ? 'text-red-500' : 'text-gray-800'"
        >
          <div class="text-3xl font-bold mb-2">{{ seconds?.toLocaleString() }}</div>
          <div class="text-xs font-medium uppercase tracking-wide text-gray-500">Seconds</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { birthdateStr, backAmount, backUnit, targetDateStr, days, minutes, seconds, isNegative } = useDateDiff()
</script>
