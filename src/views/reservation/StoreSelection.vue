<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
      <StepIndicator :currentStep="2" />
      
      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">店舗を選択</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          ご希望のサービスを提供する店舗をお選びください。
        </p>
      </div>
      
      <!-- アクションボタン -->
      <div class="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
        <n-button 
          class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow text-blue-600"
          @click="findNearbyStores"
        >
          現在地から探す
        </n-button>
        
        <n-button 
          class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow text-blue-600"
          @click="showMap = !showMap"
        >
          {{ showMap ? '地図を閉じる' : '地図で見る' }}
        </n-button>
      </div>
      
      <!-- 地図表示エリア -->
      <div v-if="showMap" class="max-w-5xl mx-auto mb-8">
        <div class="bg-white p-4 rounded-xl shadow-md h-80 flex items-center justify-center">
          <n-empty description="地図表示機能は現在実装中です">
            <template #extra>
              <n-button @click="showMap = false" class="rounded-lg">閉じる</n-button>
            </template>
          </n-empty>
        </div>
      </div>
      
      <!-- 店舗一覧 -->
      <div class="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="store in stores" 
          :key="store.id"
          class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 overflow-hidden"
          :class="selectedStore?.id === store.id ? 'border-blue-500' : 'border-transparent'"
          @click="selectStore(store)"
        >
          <div class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                店
              </div>
              <h3 class="text-xl font-semibold text-gray-800">{{ store.name }}</h3>
            </div>
            
            <div class="space-y-3 text-gray-700">
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold">住所</span>
                <span>{{ store.address }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold">電話</span>
                <span>{{ store.phone }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold">評価</span>
                <span>{{ store.rating }} ({{ store.review_count }}件)</span>
              </div>
              <div v-if="store.distance" class="flex items-center gap-2">
                <span class="text-lg font-bold">距離</span>
                <span>{{ store.distance }}km</span>
              </div>
            </div>
            
            <!-- 営業時間（折りたたみ可能） -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <n-collapse>
                <n-collapse-item title="営業時間を表示">
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span>月曜日:</span>
                      <span>{{ store.business_hours.monday.open }} - {{ store.business_hours.monday.close }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>火曜日:</span>
                      <span>{{ store.business_hours.tuesday.open }} - {{ store.business_hours.tuesday.close }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>水曜日:</span>
                      <span>{{ store.business_hours.wednesday.open }} - {{ store.business_hours.wednesday.close }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>木曜日:</span>
                      <span>{{ store.business_hours.thursday.open }} - {{ store.business_hours.thursday.close }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>金曜日:</span>
                      <span>{{ store.business_hours.friday.open }} - {{ store.business_hours.friday.close }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>土曜日:</span>
                      <span>{{ store.business_hours.saturday.open }} - {{ store.business_hours.saturday.close }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>日曜日:</span>
                      <span>{{ store.business_hours.sunday.open }} - {{ store.business_hours.sunday.close }}</span>
                    </div>
                  </div>
                </n-collapse-item>
              </n-collapse>
            </div>
            
            <n-tag type="success" size="small" class="mt-4" v-if="selectedStore?.id === store.id">選択中</n-tag>
          </div>
        </div>
      </div>
      
      <!-- ボタンエリア -->
      <div class="max-w-5xl mx-auto mt-12 flex justify-between">
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
          :disabled="!selectedStore"
          @click="goToNextStep"
        >
          次へ進む
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NButton, NEmpty, NTag, NCollapse, NCollapseItem } from 'naive-ui'
import { useReservationStore } from '@/stores/reservation'
import StepIndicator from '@/components/reservation/StepIndicator.vue'

const router = useRouter()
const message = useMessage()
const reservationStore = useReservationStore()

const showMap = ref(false)
const selectedStore = ref(null)

// 店舗データ
const stores = ref([
  {
    id: 1,
    name: '東京店',
    address: '東京都渋谷区神宮前1-1-1',
    phone: '03-1234-5678',
    rating: 4.5,
    review_count: 128,
    distance: 2.5,
    business_hours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '10:00', close: '17:00' },
      sunday: { open: '10:00', close: '17:00' }
    }
  },
  {
    id: 2,
    name: '横浜店',
    address: '神奈川県横浜市西区みなとみらい2-2-2',
    phone: '045-1234-5678',
    rating: 4.8,
    review_count: 256,
    distance: 5.2,
    business_hours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '10:00', close: '17:00' },
      sunday: { open: '10:00', close: '17:00' }
    }
  },
  {
    id: 3,
    name: '千葉店',
    address: '千葉県千葉市中央区中央3-3-3',
    phone: '043-1234-5678',
    rating: 4.3,
    review_count: 89,
    distance: 8.1,
    business_hours: {
      monday: { open: '09:00', close: '18:00' },
      tuesday: { open: '09:00', close: '18:00' },
      wednesday: { open: '09:00', close: '18:00' },
      thursday: { open: '09:00', close: '18:00' },
      friday: { open: '09:00', close: '18:00' },
      saturday: { open: '10:00', close: '17:00' },
      sunday: { open: '10:00', close: '17:00' }
    }
  }
])

// 既存の選択を復元
onMounted(() => {
  if (reservationStore.store_id) {
    selectedStore.value = stores.value.find(
      store => store.id === reservationStore.store_id
    )
  }
})

function selectStore(store) {
  selectedStore.value = store
}

function goBack() {
  router.push('/reservation/service')
}

function findNearbyStores() {
  message.info('位置情報を取得中...')
  
  // 位置情報取得のシミュレーション
  setTimeout(() => {
    // 距離でソート
    stores.value.sort((a, b) => a.distance - b.distance)
    message.success('現在地から近い順に表示しています')
  }, 1000)
}

function goToNextStep() {
  if (!selectedStore.value) {
    message.warning('店舗を選択してください')
    return
  }
  
  // 選択した店舗を保存
  reservationStore.selectStore(selectedStore.value)
  
  // 次のステップへ
  router.push('/reservation/datetime')
}
</script>