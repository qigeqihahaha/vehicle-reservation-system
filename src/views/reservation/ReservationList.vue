<template>
  <main-layout>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">メンテナンス予約履歴</h1>
        <p class="text-gray-600">お客様の車両メンテナンス予約の履歴です</p>
      </div>
      <n-button type="primary" class="rounded-lg bg-blue-600 hover:bg-blue-700" @click="createNewReservation">
        新規メンテナンス予約
      </n-button>
    </div>
    
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <n-input-group>
        <n-select
          v-model:value="filterStatus"
          :options="statusOptions"
          placeholder="ステータス"
          style="width: 140px"
        />
        <n-date-picker
          v-model:value="filterDate"
          type="date"
          placeholder="日付で絞り込み"
          clearable
        />
        <n-button @click="resetFilters" class="rounded-lg">
          リセット
        </n-button>
      </n-input-group>
    </div>
    
    <div v-if="loading" class="flex justify-center py-12">
      <n-spin size="large" />
    </div>
    
    <div v-else-if="filteredReservations.length === 0" class="bg-white rounded-xl shadow-md p-10 text-center">
      <n-empty description="メンテナンス予約がありません">
        <template #extra>
          <n-button type="primary" class="rounded-lg bg-blue-600 hover:bg-blue-700" @click="createNewReservation">
            メンテナンス予約をする
          </n-button>
        </template>
      </n-empty>
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="reservation in filteredReservations"
        :key="reservation.id"
        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        @click="viewReservationDetail(reservation.id)"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <span
                class="inline-block px-3 py-1 rounded-full text-sm font-medium"
                :class="{
                  'bg-blue-100 text-blue-800': reservation.status === 'scheduled',
                  'bg-green-100 text-green-800': reservation.status === 'completed',
                  'bg-red-100 text-red-800': reservation.status === 'cancelled'
                }"
              >
                {{ getStatusText(reservation.status) }}
              </span>
            </div>
            <div class="text-sm text-gray-500">
              予約番号: {{ reservation.reservation_number }}
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-500 mb-1">メンテナンス内容</p>
              <p class="font-medium">{{ reservation.service_name }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500 mb-1">日時</p>
              <p class="font-medium">{{ formatDate(reservation.reservation_date) }} {{ reservation.reservation_time }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500 mb-1">店舗</p>
              <p class="font-medium">{{ reservation.store_name }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500 mb-1">車両</p>
              <p class="font-medium">{{ reservation.vehicle_info.manufacturer }} {{ reservation.vehicle_info.model }}</p>
              <p class="text-sm text-gray-500">{{ reservation.vehicle_info.license_plate }}</p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-4 pt-3 border-t border-gray-100">
            <n-button text size="small" @click.stop="viewReservationDetail(reservation.id)">
              詳細を見る
            </n-button>
            
            <n-button 
              v-if="reservation.status === 'scheduled'" 
              text 
              size="small" 
              type="error"
              @click.stop="showCancelConfirm(reservation.id)"
            >
              キャンセル
            </n-button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-center mt-6" v-if="filteredReservations.length > 0">
      <n-pagination
        v-model:page="currentPage"
        :page-count="totalPages"
        :page-size="pageSize"
      />
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
        メンテナンス予約をキャンセルしますか？<br>
        キャンセルした予約は元に戻せません。
      </template>
    </n-modal>
  </main-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NButton, NEmpty, NSpin, NSelect, NDatePicker, NInputGroup, NPagination, NModal } from 'naive-ui'
import MainLayout from '@/layouts/MainLayout.vue'

const router = useRouter()
const message = useMessage()

const loading = ref(true)
const reservations = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const filterStatus = ref(null)
const filterDate = ref(null)
const showCancelModal = ref(false)
const cancelReservationId = ref(null)

// 状态选项
const statusOptions = [
  { label: 'すべて', value: null },
  { label: '予約済み', value: 'scheduled' },
  { label: '完了', value: 'completed' },
  { label: 'キャンセル', value: 'cancelled' }
]

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredReservations.value.length / pageSize.value)
})

// 根据筛选条件过滤预约
const filteredReservations = computed(() => {
  let filtered = [...reservations.value]
  
  // 按状态筛选
  if (filterStatus.value) {
    filtered = filtered.filter(r => r.status === filterStatus.value)
  }
  
  // 按日期筛选
  if (filterDate.value) {
    const selectedDate = new Date(filterDate.value).toISOString().split('T')[0]
    filtered = filtered.filter(r => r.reservation_date === selectedDate)
  }
  
  return filtered
})

// 获取状态文本
function getStatusText(status) {
  switch (status) {
    case 'scheduled': return '予約済み'
    case 'completed': return '完了'
    case 'cancelled': return 'キャンセル'
    default: return '不明'
  }
}

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 星期几的日文表示
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  const dayOfWeek = weekdays[date.getDay()]
  
  return `${year}/${month}/${day}(${dayOfWeek})`
}

// 查看预约详情
function viewReservationDetail(id) {
  router.push(`/reservations/${id}`)
}

// 创建新预约
function createNewReservation() {
  router.push('/reservation/service')
}

// 重置筛选条件
function resetFilters() {
  filterStatus.value = null
  filterDate.value = null
}

// 显示取消确认对话框
function showCancelConfirm(id) {
  cancelReservationId.value = id
  showCancelModal.value = true
}

// 关闭取消确认对话框
function closeCancelModal() {
  showCancelModal.value = false
  cancelReservationId.value = null
}

// 取消预约
async function cancelReservation() {
  if (!cancelReservationId.value) return
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新本地数据
    const index = reservations.value.findIndex(r => r.id === cancelReservationId.value)
    if (index !== -1) {
      reservations.value[index].status = 'cancelled'
    }
    
    message.success('メンテナンス予約をキャンセルしました')
  } catch (error) {
    message.error('キャンセルに失敗しました。もう一度お試しください。')
  } finally {
    closeCancelModal()
  }
}

// 获取预约数据
async function fetchReservations() {
  loading.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟预约数据
    reservations.value = [
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
        vehicle_info: {
          manufacturer: 'トヨタ',
          model: 'プリウス',
          license_plate: '品川 500 あ 12-34'
        },
        status: 'cancelled',
        price: 8000,
        discount: 0,
        total_price: 8000
      }
    ]
  } catch (error) {
    message.error('予約データの取得に失敗しました')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReservations()
})
</script>