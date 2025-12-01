<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
      <StepIndicator :currentStep="6" />
      
      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">クーポンを選択</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          お持ちのクーポンを適用して割引を受けることができます。
        </p>
      </div>
      
      <!-- 料金情報 -->
      <div class="max-w-5xl mx-auto">
        <div class="bg-blue-50 p-6 rounded-xl shadow-sm mb-8">
          <div class="text-xl font-bold text-blue-800">
            サービス料金: ¥{{ reservationStore.base_price.toLocaleString() }}
          </div>
        </div>
        
        <!-- クーポン一覧 -->
        <div v-if="coupons.length > 0" class="mb-8">
          <div class="flex items-center gap-2 mb-6">
            <span class="text-lg font-semibold text-gray-800">利用可能なクーポン:</span>
            <n-tag type="info" round>{{ coupons.length }}枚</n-tag>
          </div>
          
          <n-radio-group v-model:value="selectedCouponId">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="coupon in coupons" 
                :key="coupon.id"
                class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 overflow-hidden"
                :class="selectedCouponId === coupon.id ? 'border-blue-500' : 'border-transparent'"
                @click="selectCoupon(coupon.id)"
              >
                <div class="p-6">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span class="text-2xl">🎫</span>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800">{{ coupon.name }}</h3>
                  </div>
                  
                  <div class="space-y-3 text-gray-700">
                    <div class="flex items-center gap-2">
                      
                      <span>割引額: {{ formatDiscount(coupon) }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      
                      <span>有効期限: {{ formatDate(coupon.valid_until) }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      
                      <span>最低利用金額: {{ coupon.min_purchase ? `¥${coupon.min_purchase.toLocaleString()}` : 'なし' }}</span>
                    </div>
                  </div>
                  
                  <n-tag type="success" size="small" class="mt-4" v-if="selectedCouponId === coupon.id">選択中</n-tag>
                </div>
              </div>
              
              <div 
                class="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 overflow-hidden"
                :class="selectedCouponId === null ? 'border-blue-500' : 'border-transparent'"
                @click="selectCoupon(null)"
              >
                <div class="p-6 flex items-center justify-center h-full">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span class="text-2xl">❌</span>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800">クーポンを使用しない</h3>
                    <n-tag type="success" size="small" class="mt-4" v-if="selectedCouponId === null">選択中</n-tag>
                  </div>
                </div>
              </div>
            </div>
          </n-radio-group>
        </div>
        
        <div v-else class="bg-white rounded-xl shadow-md p-8 mb-8 text-center">
          <n-empty description="利用可能なクーポンがありません" />
        </div>
        
        <!-- 料金サマリー -->
        <div v-if="selectedCoupon" class="bg-white rounded-xl shadow-md p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">料金内訳</h3>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-700">基本料金:</span>
              <span class="text-gray-800 font-medium">¥{{ reservationStore.base_price.toLocaleString() }}</span>
            </div>
            
            <div class="flex justify-between items-center text-red-600">
              <span>クーポン割引:</span>
              <span>-¥{{ discountAmount.toLocaleString() }}</span>
            </div>
            
            <div class="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center">
              <span class="text-lg font-bold text-gray-800">合計:</span>
              <span class="text-xl font-bold text-blue-600">¥{{ finalPrice.toLocaleString() }}</span>
            </div>
          </div>
        </div>
        
        <!-- ボタンエリア -->
        <div class="mt-12 flex justify-between">
          <n-button 
            size="large"
            class="rounded-lg text-blue-600"
            @click="goBack"
          >
            戻る
          </n-button>
          
          <n-button 
            type="primary" 
            size="large" 
            class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            @click="goToNextStep"
          >
            次へ進む
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NIcon, NEmpty, NRadioGroup, NTag } from 'naive-ui'
import { useReservationStore } from '@/stores/reservation'
import StepIndicator from '@/components/reservation/StepIndicator.vue'

const router = useRouter()
const reservationStore = useReservationStore()

const selectedCouponId = ref(null)

// クーポンデータ
const coupons = ref([
  {
    id: 1,
    name: '初回利用10%OFF',
    type: 'percentage',
    discount_value: 10,
    discount_amount: 300,
    min_purchase: null,
    valid_until: '2025-12-31'
  },
  {
    id: 2,
    name: 'オイル交換500円OFF',
    type: 'fixed_amount',
    discount_value: 500,
    discount_amount: 500,
    min_purchase: 3000,
    valid_until: '2025-11-30'
  }
])

// 選択されたクーポンを計算
const selectedCoupon = computed(() => {
  if (selectedCouponId.value === null) return null
  return coupons.value.find(coupon => coupon.id === selectedCouponId.value)
})

// 割引額を計算
const discountAmount = computed(() => {
  if (!selectedCoupon.value) return 0
  return selectedCoupon.value.discount_amount
})

// 最終価格を計算
const finalPrice = computed(() => {
  return reservationStore.base_price - discountAmount.value
})

// 割引表示をフォーマット
function formatDiscount(coupon) {
  if (coupon.type === 'percentage') {
    return `${coupon.discount_value}%（¥${coupon.discount_amount.toLocaleString()}）`
  } else {
    return `¥${coupon.discount_value.toLocaleString()}`
  }
}

// 日付をフォーマット
function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
}

// クーポンを選択
function selectCoupon(couponId) {
  selectedCouponId.value = couponId
}

// 既存の選択を復元
onMounted(() => {
  if (reservationStore.coupon_id) {
    selectedCouponId.value = reservationStore.coupon_id
  }
})

function goBack() {
  router.push('/reservation/loaner')
}

function goToNextStep() {
  // クーポン選択を保存
  reservationStore.applyCoupon(selectedCoupon.value)
  
  // 次のステップへ
  router.push('/reservation/confirm')
}
</script>