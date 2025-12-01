<template>
  <div class="mb-8 overflow-x-auto">
    <div class="flex items-center justify-center min-w-max">
      <!-- サービス選択 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          1
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 1 ? 'text-blue-600' : 'text-gray-500'">
          サービス選択
        </div>
      </div>
      
      <!-- 区切り線 -->
      <div class="w-12 h-1 mx-2" :class="currentStep > 1 ? 'bg-blue-500' : 'bg-gray-300'"></div>
      
      <!-- 店舗選択 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          2
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 2 ? 'text-blue-600' : 'text-gray-500'">
          店舗選択
        </div>
      </div>
      
      <!-- 区切り線 -->
      <div class="w-12 h-1 mx-2" :class="currentStep > 2 ? 'bg-blue-500' : 'bg-gray-300'"></div>
      
      <!-- 日時選択 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          3
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 3 ? 'text-blue-600' : 'text-gray-500'">
          日時選択
        </div>
      </div>
      
      <!-- 区切り線 -->
      <div class="w-12 h-1 mx-2" :class="currentStep > 3 ? 'bg-blue-500' : 'bg-gray-300'"></div>
      
      <!-- 車両選択 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          4
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 4 ? 'text-blue-600' : 'text-gray-500'">
          車両選択
        </div>
      </div>
      
      <!-- 区切り線 -->
      <div class="w-12 h-1 mx-2" :class="currentStep > 4 ? 'bg-blue-500' : 'bg-gray-300'"></div>
      
      <!-- 代車有無選択 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 5 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          5
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 5 ? 'text-blue-600' : 'text-gray-500'">
          代車選択
        </div>
      </div>
      
      <!-- 区切り線 -->
      <div class="w-12 h-1 mx-2" :class="currentStep > 5 ? 'bg-blue-500' : 'bg-gray-300'"></div>
      
      <!-- クーポン使用選択 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 6 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          6
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 6 ? 'text-blue-600' : 'text-gray-500'">
          クーポン選択
        </div>
      </div>
      
      <!-- 区切り線 -->
      <div class="w-12 h-1 mx-2" :class="currentStep > 6 ? 'bg-blue-500' : 'bg-gray-300'"></div>
      
      <!-- 予約内容の確認 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 7 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          7
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 7 ? 'text-blue-600' : 'text-gray-500'">
          予約確認
        </div>
      </div>
      
      <!-- 区切り線 -->
      <div class="w-12 h-1 mx-2" :class="currentStep > 7 ? 'bg-blue-500' : 'bg-gray-300'"></div>
      
      <!-- 予約確定 -->
      <div class="flex items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold"
          :class="currentStep === 8 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'"
        >
          8
        </div>
        <div class="ml-2 font-medium" :class="currentStep === 8 ? 'text-blue-600' : 'text-gray-500'">
          予約確定
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true
  }
});
</script>