<template>
  <div class="bg-gray-50 min-h-screen py-6">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- ページヘッダー -->
      <div class="flex items-center gap-4 mb-6">
        <n-button 
          quaternary 
          circle 
          class="text-gray-600 hover:bg-gray-200"
          @click="goBack"
        >
          <n-icon>←</n-icon>
        </n-button>
        <h1 class="text-2xl font-bold text-gray-800">予約詳細</h1>
      </div>
      
      <!-- ローディング表示 -->
      <div v-if="loading" class="flex justify-center py-12">
        <n-spin size="large" />
      </div>
      
      <!-- 予約詳細表示 -->
      <template v-else-if="reservation">
        <!-- 予約ヘッダー -->
        <div class="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
          <div class="text-base font-semibold">
            予約番号: {{ reservation.reservation_number }}
          </div>
          <div 
            class="px-3 py-1 rounded-full text-sm font-bold"
            :class="{
              'bg-blue-100 text-blue-700': reservation.status === 'scheduled',
              'bg-green-100 text-green-700': reservation.status === 'completed',
              'bg-red-100 text-red-700': reservation.status === 'cancelled'
            }"
          >
            {{ getStatusText(reservation.status) }}
          </div>
        </div>
        
        <div class="space-y-4 mb-6">
          <!-- サービス内容 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-blue-50 px-4 py-3 border-b border-blue-100">
              <h2 class="text-base font-semibold text-blue-800 flex items-center gap-2">
                サービス内容
              </h2>
            </div>
            <div class="p-4">
              <div class="text-lg font-medium text-gray-800 mb-1">{{ reservation.service_name }}</div>
              <div class="text-gray-600 flex items-center gap-2 text-sm">
                <n-icon></n-icon>
                所要時間: {{ getServiceDuration() }}分
              </div>
            </div>
          </div>
          
          <!-- 店舗情報 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-blue-50 px-4 py-3 border-b border-blue-100">
              <h2 class="text-base font-semibold text-blue-800 flex items-center gap-2">
                店舗情報
              </h2>
            </div>
            <div class="p-4">
              <div class="text-lg font-medium text-gray-800 mb-2">{{ reservation.store_name }}</div>
              <div class="text-gray-600 flex items-center gap-2 mb-3 text-sm">
                <n-icon></n-icon>
                {{ reservation.store_address || '東京都渋谷区神宮前1-1-1' }}
              </div>
              <n-button 
                size="small"
                class="rounded-lg bg-white text-blue-500 hover:text-blue-700 border border-gray-200"
                @click="showStoreMap"
              >
                地図を見る
              </n-button>
            </div>
          </div>
          
          <!-- 予約日時 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-blue-50 px-4 py-3 border-b border-blue-100">
              <h2 class="text-base font-semibold text-blue-800 flex items-center gap-2">
                予約日時
              </h2>
            </div>
            <div class="p-4">
              <div class="text-lg font-medium text-gray-800 mb-1">{{ formatDate(reservation.reservation_date) }}</div>
              <div class="text-gray-600 flex items-center gap-2 text-sm">
                <n-icon></n-icon>
                {{ reservation.reservation_time }} - {{ reservation.estimated_end_time }}
              </div>
            </div>
          </div>
          
          <!-- 車両情報 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-blue-50 px-4 py-3 border-b border-blue-100">
              <h2 class="text-base font-semibold text-blue-800 flex items-center gap-2">
                車両情報
              </h2>
            </div>
            <div class="p-4">
              <div class="text-lg font-medium text-gray-800 mb-1">{{ reservation.vehicle_info.manufacturer }} {{ reservation.vehicle_info.model }}</div>
              <div class="text-gray-600 flex items-center gap-2 text-sm">
                <n-icon></n-icon>
                ナンバー: {{ reservation.vehicle_info.license_plate }}
              </div>
            </div>
          </div>
          
          <!-- 代車情報 -->
          <div v-if="reservation.loaner_car_info" class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-blue-50 px-4 py-3 border-b border-blue-100">
              <h2 class="text-base font-semibold text-blue-800 flex items-center gap-2">
                代車
              </h2>
            </div>
            <div class="p-4">
              <div class="text-lg font-medium text-gray-800 mb-1">{{ reservation.loaner_car_info.car_number }}</div>
              <div class="text-gray-600 flex items-center gap-2 text-sm">
                <n-icon></n-icon>
                ナンバー: {{ reservation.loaner_car_info.license_plate }}
              </div>
            </div>
          </div>
          
          <!-- 料金情報 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-blue-50 px-4 py-3 border-b border-blue-100">
              <h2 class="text-base font-semibold text-blue-800 flex items-center gap-2">
                料金
              </h2>
            </div>
            <div class="p-4">
              <div class="space-y-3">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-700">基本料金:</span>
                  <span class="text-gray-800 font-medium">¥{{ reservation.price.toLocaleString() }}</span>
                </div>
                
                <div v-if="reservation.discount > 0" class="flex justify-between items-center text-red-600 text-sm">
                  <span>クーポン割引:</span>
                  <span>-¥{{ reservation.discount.toLocaleString() }}</span>
                </div>
                
                <div class="pt-3 mt-2 border-t border-gray-200 flex justify-between items-center">
                  <span class="text-base font-bold text-gray-800">合計:</span>
                  <span class="text-lg font-bold text-blue-600">¥{{ reservation.total_price.toLocaleString() }}</span>
                </div>
                
                <div 
                  class="mt-3 py-1 px-3 rounded-lg border text-center font-medium text-sm"
                  :class="{
                    'bg-green-50 border-green-200 text-green-800': reservation.status === 'completed',
                    'bg-yellow-50 border-yellow-200 text-yellow-800': reservation.status !== 'completed'
                  }"
                >
                  支払い状況: {{ getPaymentStatusText() }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- キャンセルオプション -->
          <div v-if="showCancelOption" class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-red-50 px-4 py-3 border-b border-red-100">
              <h2 class="text-base font-semibold text-red-800 flex items-center gap-2">
                予約のキャンセル
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-700 text-sm mb-3">予約をキャンセルする場合は、以下のボタンをクリックしてください。</p>
              <p class="text-red-600 font-medium text-sm mb-4">※予約時間の24時間前までキャンセル可能です</p>
              <n-button 
                type="error" 
                size="small"
                class="rounded-lg"
                @click="showCancelConfirm"
              >
                予約をキャンセルする
              </n-button>
            </div>
          </div>
          
          <!-- レビュー -->
          <div v-if="reservation.status === 'completed'" class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="bg-blue-50 px-4 py-3 border-b border-blue-100">
              <h2 class="text-base font-semibold text-blue-800 flex items-center gap-2">
                レビュー
              </h2>
            </div>
            <div class="p-4">
              <div v-if="!hasReviewed" class="space-y-4">
                <p class="text-gray-700 text-sm">サービスはいかがでしたか？</p>
                <div class="flex justify-center">
                  <n-rate v-model:value="reviewRating" size="medium" />
                </div>
                <n-input
                  v-model:value="reviewComment"
                  type="textarea"
                  placeholder="コメントを入力（任意）"
                  class="rounded-lg"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                />
                <div class="flex justify-center">
                  <n-button 
                    type="primary" 
                    size="small"
                    class="rounded-lg bg-blue-500 hover:bg-blue-600"
                    @click="submitReview" 
                    :disabled="reviewRating === 0"
                  >
                    レビューを送信
                  </n-button>
                </div>
              </div>
              <div v-else class="space-y-3">
                <p class="text-green-600 font-medium text-sm">レビューありがとうございました！</p>
                <div class="flex justify-center">
                  <n-rate readonly :value="reviewRating" size="medium" />
                </div>
                <div v-if="reviewComment" class="bg-gray-50 p-3 rounded-lg text-gray-700 text-sm">
                  {{ reviewComment }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- 予約が見つからない場合 -->
      <div v-else class="bg-white rounded-lg shadow-sm p-6 text-center">
        <n-result
          status="404"
          title="予約が見つかりません"
          description="お探しの予約情報は見つかりませんでした。"
        >
        </n-result>
      </div>
    </div>
    
    <!-- キャンセル確認モーダル -->
    <n-modal
      v-model:show="showCancelModal"
      preset="dialog"
      title="予約をキャンセルしますか？"
      positive-text="キャンセルする"
      negative-text="戻る"
      @positive-click="cancelReservation"
      @negative-click="closeCancelModal"
    >
      <template #default>
        予約をキャンセルしますか？<br>
        キャンセルした予約は元に戻せません。
      </template>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NButton, NSpin, NIcon, NResult, NModal, NRate, NInput } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const message = useMessage()

const loading = ref(true)
const reservation = ref(null)
const showCancelModal = ref(false)
const reviewRating = ref(0)
const reviewComment = ref('')
const hasReviewed = ref(false)

// キャンセルオプションを表示するかどうかを計算
const showCancelOption = computed(() => {
  if (!reservation.value) return false
  return reservation.value.status === 'scheduled'
})

// ステータスのテキストを取得
function getStatusText(status) {
  switch (status) {
    case 'scheduled': return '予約済み'
    case 'completed': return '完了'
    case 'cancelled': return 'キャンセル'
    default: return '不明'
  }
}

// 支払い状況のテキストを取得
function getPaymentStatusText() {
  if (!reservation.value) return '未払い'
  
  // 完了した予約は支払い済みと仮定
  if (reservation.value.status === 'completed') {
    return '支払い済み'
  } else {
    return '未払い'
  }
}

// サービス時間を取得
function getServiceDuration() {
  if (!reservation.value) return 0
  
  // サービスタイプに応じて時間を返す
  switch (reservation.value.service_type_id) {
    case 1: return 30 // オイル交換
    case 2: return 120 // 車検
    case 3: return 60 // タイヤ交換
    default: return 45 // デフォルト
  }
}

// 日付をフォーマット
function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 曜日の日本語表示
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  const dayOfWeek = weekdays[date.getDay()]
  
  return `${year}年${month}月${day}日（${dayOfWeek}）`
}

function goBack() {
  router.back()
}

function showStoreMap() {
  message.info('地図表示機能は現在実装中です')
}

// キャンセル確認ダイアログを表示
function showCancelConfirm() {
  showCancelModal.value = true
}

// キャンセル確認ダイアログを閉じる
function closeCancelModal() {
  showCancelModal.value = false
}

// 予約をキャンセル
async function cancelReservation() {
  try {
    // APIコールをシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // ローカルデータを更新
    reservation.value.status = 'cancelled'
    
    message.success('予約をキャンセルしました')
  } catch (error) {
    message.error('キャンセルに失敗しました。もう一度お試しください。')
  } finally {
    closeCancelModal()
  }
}

// レビューを送信
async function submitReview() {
  if (reviewRating.value === 0) {
    message.warning('評価を選択してください')
    return
  }
  
  try {
    // APIコールをシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    hasReviewed.value = true
    message.success('レビューを送信しました。ありがとうございます！')
  } catch (error) {
    message.error('レビューの送信に失敗しました。もう一度お試しください。')
  }
}

// 予約詳細を取得
async function fetchReservationDetail() {
  loading.value = true
  
  try {
    // URLからIDパラメータを取得
    const reservationId = parseInt(route.params.id)
    
    // APIコールをシミュレート
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 予約データをモック
    const mockReservations = [
      {
        id: 1,
        reservation_number: 'RES-20251120-0001',
        service_name: 'オイル交換',
        service_type_id: 1,
        reservation_date: '2025-11-20',
        reservation_time: '10:00',
        estimated_end_time: '10:30',
        store_id: 1,
        store_name: '東京店',
        store_address: '東京都渋谷区神宮前1-1-1',
        vehicle_info: {
          manufacturer: 'トヨタ',
          model: 'プリウス',
          license_plate: '品川 500 あ 12-34'
        },
        status: 'scheduled',
        price: 3000,
        discount: 0,
        total_price: 3000
      },
      {
        id: 2,
        reservation_number: 'RES-20251115-0002',
        service_name: '車検',
        service_type_id: 2,
        reservation_date: '2025-11-15',
        reservation_time: '13:00',
        estimated_end_time: '15:00',
        store_id: 2,
        store_name: '横浜店',
        store_address: '神奈川県横浜市西区みなとみらい2-2-2',
        vehicle_info: {
          manufacturer: 'ホンダ',
          model: 'フィット',
          license_plate: '横浜 300 さ 56-78'
        },
        status: 'completed',
        price: 50000,
        discount: 0,
        total_price: 50000
      },
      {
        id: 3,
        reservation_number: 'RES-20251105-0003',
        service_name: 'タイヤ交換',
        service_type_id: 3,
        reservation_date: '2025-11-05',
        reservation_time: '15:30',
        estimated_end_time: '16:30',
        store_id: 1,
        store_name: '東京店',
        store_address: '東京都渋谷区神宮前1-1-1',
        vehicle_info: {
          manufacturer: 'トヨタ',
          model: 'プリウス',
          license_plate: '品川 500 あ 12-34'
        },
        loaner_car_info: {
          car_number: 'A-001',
          license_plate: '品川 500 れ 11-11'
        },
        status: 'cancelled',
        price: 8000,
        discount: 0,
        total_price: 8000
      }
    ]
    
    // 対応するIDの予約を検索
    reservation.value = mockReservations.find(r => r.id === reservationId)
  } catch (error) {
    message.error('予約データの取得に失敗しました')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReservationDetail()
})
</script>