<template>
  <div class="bg-gray-50 min-h-screen">
    <n-layout>
      <!-- ヘッダーを削除 -->
      <n-layout-content>
        <div class="container mx-auto px-4 py-8">
          <slot></slot>
        </div>
      </n-layout-content>
      <!-- フッターを削除 -->
    </n-layout>
  </div>
</template>

<script setup>
import { NLayout, NLayoutContent } from 'naive-ui'
// ヘッダーとフッターのインポートを削除
</script>