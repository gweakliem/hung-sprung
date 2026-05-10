<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Count the Days</h1>

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

      <!-- Step 2: Offset from birthday -->
      <div v-if="birthdateStr" class="bg-white rounded-2xl shadow p-6 mb-6">
        <label class="block text-sm font-medium text-gray-600 mb-3">From your birthday</label>
        <div class="flex flex-wrap gap-2 mb-3">
          <button
            v-for="preset in [1000, 5000, 10000, 20000, 25000, 30000]"
            :key="preset"
            type="button"
            @click="backAmount = preset; backUnit = 'days'"
            class="px-3 py-1 rounded-full text-sm border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            :class="backAmount === preset && backUnit === 'days'
              ? 'border-blue-400 bg-blue-50 text-blue-600 font-semibold'
              : 'border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-500'"
          >{{ preset.toLocaleString() }}</button>
        </div>
        <div class="flex gap-3">
          <button
            type="button"
            @click="backSign = backSign === 1 ? -1 : 1"
            class="w-12 shrink-0 rounded-lg border text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            :class="backSign === 1
              ? 'border-blue-400 bg-blue-50 text-blue-600'
              : 'border-red-400 bg-red-50 text-red-500'"
          >{{ backSign === 1 ? '+' : '−' }}</button>
          <input
            v-model.number="backAmount"
            type="number"
            min="0"
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
          {{ targetDateStr }}
        </p>
        <p class="text-sm text-gray-400 mt-2">
          {{ backAmount }} {{ backUnit }} {{ backSign === 1 ? 'after' : 'before' }} your birthday
        </p>
      </div>

      <template v-if="breakdown !== null">
        <!-- Informational stats -->
        <div class="grid grid-cols-3 gap-3 mb-6">
          <div class="bg-white rounded-xl shadow-sm p-4 text-center">
            <div class="text-lg font-semibold" :class="isNegative ? 'text-red-400' : 'text-gray-700'">{{ breakdown.years.toLocaleString() }}</div>
            <div class="text-xs uppercase tracking-wide text-gray-400 mt-1">Years</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 text-center">
            <div class="text-lg font-semibold" :class="isNegative ? 'text-red-400' : 'text-gray-700'">{{ breakdown.months }}</div>
            <div class="text-xs uppercase tracking-wide text-gray-400 mt-1">Months</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-4 text-center">
            <div class="text-lg font-semibold" :class="isNegative ? 'text-red-400' : 'text-gray-700'">{{ breakdown.days }}</div>
            <div class="text-xs uppercase tracking-wide text-gray-400 mt-1">Days</div>
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
const { birthdateStr, backAmount, backUnit, backSign, targetDateStr, birthdateDaysAgo, breakdown, isNegative } = useDateDiff()
</script>
