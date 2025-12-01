<template>
  <header class="bg-white shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <span class="text-xl font-bold text-gray-800">車両メンテナンス予約</span>
          </router-link>
        </div>
        
        <!-- Navigation -->
        <nav class="hidden md:flex space-x-1">
          <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors" :class="[$route.path === '/' ? 'text-blue-600' : 'text-gray-700']">
            ホーム
          </router-link>
          <router-link to="/stores" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors" :class="[$route.path === '/stores' ? 'text-blue-600' : 'text-gray-700']">
            店舗情報
          </router-link>
          <router-link to="/reservation/service" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors" :class="[$route.path.includes('/reservation') ? 'text-blue-600' : 'text-gray-700']">
            メンテナンス予約
          </router-link>
          <router-link to="/reservations" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors" :class="[$route.path === '/reservations' ? 'text-blue-600' : 'text-gray-700']">
            予約履歴
          </router-link>
          <router-link to="/vehicles" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors" :class="[$route.path === '/vehicles' ? 'text-blue-600' : 'text-gray-700']">
            マイ車両
          </router-link>
        </nav>
        
        <!-- User Menu -->
        <div class="flex items-center">
          <!-- User Info and Direct Links -->
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium mr-2">
              {{ userInitials }}
            </div>
            <span class="text-sm font-medium text-gray-700 hidden md:block mr-4">{{ userName }}</span>
            
            <!-- Direct Links Instead of Dropdown -->
            <div class="hidden md:flex space-x-3 items-center">
              <router-link to="/mypage" class="text-sm text-gray-700 hover:text-blue-600">マイページ</router-link>
              <span class="text-gray-300">|</span>
              <button @click="logout" class="text-sm text-gray-700 hover:text-blue-600">ログアウト</button>
            </div>
          </div>
          
          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden ml-4 p-1 rounded-md hover:bg-gray-100">
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-2 space-y-1">
        <router-link to="/" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" :class="[$route.path === '/' ? 'text-blue-600' : 'text-gray-700']">
          ホーム
        </router-link>
        <router-link to="/stores" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" :class="[$route.path === '/stores' ? 'text-blue-600' : 'text-gray-700']">
          店舗情報
        </router-link>
        <router-link to="/reservation/service" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" :class="[$route.path.includes('/reservation') ? 'text-blue-600' : 'text-gray-700']">
          メンテナンス予約
        </router-link>
        <router-link to="/reservations" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" :class="[$route.path === '/reservations' ? 'text-blue-600' : 'text-gray-700']">
          予約履歴
        </router-link>
        <router-link to="/vehicles" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100" :class="[$route.path === '/vehicles' ? 'text-blue-600' : 'text-gray-700']">
          マイ車両
        </router-link>
        <div class="border-t border-gray-200 mt-2 pt-2">
          <router-link to="/mypage" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 text-gray-700">
            マイページ
          </router-link>
          <button @click="logout" class="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 text-gray-700">
            ログアウト
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

// ユーザー情報
const userName = computed(() => {
  return authStore.user ? `${authStore.user.last_name} ${authStore.user.first_name}` : 'ゲスト'
})

const userInitials = computed(() => {
  if (!authStore.user) return 'G'
  return authStore.user.last_name.charAt(0)
})

// ログアウト処理
function logout() {
  authStore.logout()
  router.push('/login')
}
</script>