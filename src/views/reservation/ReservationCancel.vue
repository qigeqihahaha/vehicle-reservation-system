<template>
  <div class="reservation-cancel">
    <n-layout>
      <n-layout-header>
        <header-component />
      </n-layout-header>
      
      <n-layout-content>
        <div class="container">
          <div class="page-header">
            <n-button quaternary circle @click="goBack">
              <template #icon>
                <n-icon>←</n-icon>
              </template>
            </n-button>
            <h1>予約キャンセル</h1>
          </div>
          
          <div v-if="loading" class="loading-container">
            <n-spin size="large" />
          </div>
          
          <div v-else-if="cancelComplete" class="cancel-complete">
            <n-result
              status="success"
              title="キャンセル完了"
              description="予約のキャンセルが完了しました。"
            >
              <template #footer>
                <div class="action-buttons">
                  <n-button @click="goToReservationList">
                    予約一覧に戻る
                  </n-button>
                  <n-button type="primary" @click="createNewReservation">
                    新規予約
                  </n-button>
                </div>
              </template>
            </n-result>
          </div>
          
          <template v-else-if="reservation">
            <div class="cancel-card">
              <h2>以下の予約をキャンセルしますか？</h2>
              
              <div class="reservation-info">
                <div class="info-row">
                  <div class="info-label">予約番号:</div>
                  <div class="info-value">{{ reservation.reservation_number }}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">サービス:</div>
                  <div class="info-value">{{ reservation.service_name }}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">日時:</div>
                  <div class="info-value">{{ formatDate(reservation.reservation_date) }} {{ reservation.reservation_time }}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">店舗:</div>
                  <div class="info-value">{{ reservation.store_name }}</div>
                </div>
                
                <div class="info-row">
                  <div class="info-label">車両:</div>
                  <div class="info-value">{{ reservation.vehicle_info.manufacturer }} {{ reservation.vehicle_info.model }}</div>
                </div>
              </div>
              
              <div class="cancel-policy">
                <h3>キャンセルポリシー</h3>
                <ul>
                  <li>予約時間の24時間前までのキャンセルは無料です。</li>
                  <li>24時間を切ったキャンセルには、サービス料金の30%のキャンセル料が発生する場合があります。</li>
                  <li>予約時間を過ぎた場合、全額のキャンセル料が発生する場合があります。</li>
                </ul>
              </div>
              
              <div class="cancel-reason">
                <h3>キャンセル理由（任意）</h3>
                <n-select
                  v-model:value="cancelReason"
                  :options="cancelReasonOptions"
                  placeholder="キャンセル理由を選択してください"
                />
                
                <n-input
                  v-if="cancelReason === 'other'"
                  v-model:value="otherReason"
                  type="textarea"
                  placeholder="キャンセル理由を入力してください"
                  class="other-reason"
                />
              </div>
              
              <div class="confirmation-checkbox">
                <n-checkbox v-model:checked="confirmed">
                  キャンセルポリシーを確認し、予約をキャンセルすることに同意します。
                </n-checkbox>
              </div>
              
              <div class="action-buttons">
                <n-button @click="goBack">
                  戻る
                </n-button>
                <n-button
                  type="error"
                  :disabled="!confirmed"
                  :loading="cancelling"
                  @click="cancelReservation"
                >
                  キャンセルする
                </n-button>
              </div>
            </div>
          </template>
          
          <div v-else class="not-found">
            <n-result
              status="404"
              title="予約が見つかりません"
              description="お探しの予約情報は見つかりませんでした。"
            >
              <template #footer>
                <n-button @click="goToReservationList">
                  予約一覧に戻る
                </n-button>
              </template>
            </n-result>
          </div>
        </div>
      </n-layout-content>
      
      <n-layout-footer>
        <footer-component />
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NButton, NSpin, NIcon, NResult, NCheckbox, NSelect, NInput } from 'naive-ui'
import HeaderComponent from '@/components/layout/Header.vue'
import FooterComponent from '@/components/layout/Footer.vue'

const router = useRouter()
const route = useRoute()
const message = useMessage()

const loading = ref(true)
const cancelling = ref(false)
const reservation = ref(null)
const cancelReason = ref(null)
const otherReason = ref('')
const confirmed = ref(false)
const cancelComplete = ref(false)

// 取消原因选项
const cancelReasonOptions = [
  { label: '予定が変更になった', value: 'schedule_changed' },
  { label: '別の店舗に変更したい', value: 'change_store' },
  { label: '別のサービスに変更したい', value: 'change_service' },
  { label: '体調不良', value: 'health_issue' },
  { label: 'その他', value: 'other' }
]

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 星期几的日文表示
  const weekdays = ['日', '月', '火', '水', '木', '金', '土']
  const dayOfWeek = weekdays[date.getDay()]
  
  return `${year}年${month}月${day}日（${dayOfWeek}）`
}

function goBack() {
  router.back()
}

function goToReservationList() {
  router.push('/reservations')
}

function createNewReservation() {
  router.push('/reservation/service')
}

// 取消预约
async function cancelReservation() {
  if (!confirmed.value) {
    message.warning('キャンセルポリシーに同意してください')
    return
  }
  
  cancelling.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 获取取消原因
    let reason = cancelReason.value
    if (reason === 'other' && otherReason.value) {
      reason = otherReason.value
    }
    
    // 假设取消成功
    cancelComplete.value = true
    message.success('予約をキャンセルしました')
  } catch (error) {
    message.error('キャンセルに失敗しました。もう一度お試しください。')
  } finally {
    cancelling.value = false
  }
}

// 获取预约详情
async function fetchReservationDetail() {
  loading.value = true
  
  try {
    // 获取URL中的ID参数
    const reservationId = parseInt(route.params.id)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟预约数据
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
      }
    ]
    
    // 查找对应ID的预约
    reservation.value = mockReservations.find(r => r.id === reservationId)
    
    // 检查预约是否可以取消（只有scheduled状态的预约可以取消）
    if (reservation.value && reservation.value.status !== 'scheduled') {
      message.error('この予約はキャンセルできません')
      router.push(`/reservations/${reservationId}`)
    }
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

<style lang="scss" scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  
  h1 {
    font-size: 24px;
    margin: 0;
  }
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 48px 0;
}

.not-found {
  padding: 48px 0;
}

.cancel-card {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  margin-bottom: 24px;
  
  h2 {
    font-size: 18px;
    margin-bottom: 24px;
    text-align: center;
  }
}

.reservation-info {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  
  .info-row {
    display: flex;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .info-label {
      width: 100px;
      font-weight: bold;
    }
    
    .info-value {
      flex: 1;
    }
  }
}

.cancel-policy {
  margin-bottom: 24px;
  
  h3 {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
      color: #666;
    }
  }
}

.cancel-reason {
  margin-bottom: 24px;
  
  h3 {
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .other-reason {
    margin-top: 12px;
  }
}

.confirmation-checkbox {
  margin-bottom: 24px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    
    button {
      width: 100%;
    }
  }
}

.cancel-complete {
  margin: 48px 0;
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    
    @media (max-width: 768px) {
      flex-direction: column;
      
      button {
        width: 100%;
      }
    }
  }
}
</style>