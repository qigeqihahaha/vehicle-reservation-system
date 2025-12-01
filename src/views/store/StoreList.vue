<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">店舗情報</h1>
        <p class="text-gray-600">
          全国の整備工場・修理工場の情報をご覧いただけます。お近くの店舗でメンテナンスをご予約ください。
        </p>
      </div>

      <!-- 検索フィルター -->
      <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div class="flex flex-wrap gap-4">
          <div class="w-full md:w-auto flex-grow">
            <label for="area" class="block text-sm font-medium text-gray-700 mb-1">エリア</label>
            <n-select v-model:value="selectedArea" :options="areaOptions" placeholder="エリアを選択" />
          </div>
          <div class="w-full md:w-auto flex-grow">
            <label for="service" class="block text-sm font-medium text-gray-700 mb-1">対応サービス</label>
            <n-select v-model:value="selectedService" :options="serviceOptions" placeholder="サービスを選択" />
          </div>
          <div class="w-full md:w-auto flex-grow md:self-end">
  <n-button type="primary" class="h-[34px] px-4" @click="searchStores">
    検索
  </n-button>
</div>
        </div>
      </div>

      <!-- 店舗リスト -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="store in filteredStores" :key="store.id" class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div class="h-48 overflow-hidden">
            <img :src="store.image" :alt="store.name" class="w-full h-full object-cover">
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-semibold text-gray-800">{{ store.name }}</h3>
              <n-tag :type="store.isOpen ? 'success' : 'error'" size="small">
                {{ store.isOpen ? '営業中' : '営業時間外' }}
              </n-tag>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ store.address }}</p>
            <div class="flex items-center text-sm text-gray-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ store.businessHours }}</span>
            </div>
            <div class="flex flex-wrap gap-1 mb-4">
              <n-tag v-for="service in store.services" :key="service" size="small" type="info">
                {{ service }}
              </n-tag>
            </div>
            <div class="flex justify-between">
              <n-button type="primary" size="small" @click="showStoreDetail(store)">
                詳細を見る
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 店舗がない場合 -->
      <div v-if="filteredStores.length === 0" class="bg-white p-8 rounded-lg shadow-sm text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-700 mb-2">店舗が見つかりませんでした</h3>
        <p class="text-gray-500">検索条件を変更して再度お試しください。</p>
      </div>

      <!-- 店舗詳細モーダル -->
      <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="店舗詳細">
        <template v-if="selectedStore">
          <div class="mb-4">
            <img :src="selectedStore.image" :alt="selectedStore.name" class="w-full h-64 object-cover rounded-lg">
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">{{ selectedStore.name }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-1">住所</h3>
              <p class="text-gray-600">{{ selectedStore.address }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-1">営業時間</h3>
              <p class="text-gray-600">{{ selectedStore.businessHours }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-1">電話番号</h3>
              <p class="text-gray-600">{{ selectedStore.phone }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-1">定休日</h3>
              <p class="text-gray-600">{{ selectedStore.holidays }}</p>
            </div>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 mb-1">対応サービス</h3>
            <div class="flex flex-wrap gap-1">
              <n-tag v-for="service in selectedStore.services" :key="service" size="small" type="info">
                {{ service }}
              </n-tag>
            </div>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 mb-1">店舗紹介</h3>
            <p class="text-gray-600">{{ selectedStore.description }}</p>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 mb-1">地図</h3>
            <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p class="text-gray-600">地図が表示されます</p>
            </div>
          </div>
          
        </template>
      </n-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NSelect, NTag, NModal } from 'naive-ui'
import { useReservationStore } from '@/stores/reservation'

const router = useRouter()
const reservationStore = useReservationStore()

// フィルター用の状態
const selectedArea = ref(null)
const selectedService = ref(null)

// モーダル用の状態
const showModal = ref(false)
const selectedStore = ref(null)

// エリアとサービスのオプション
const areaOptions = [
  { label: '東京', value: 'tokyo' },
  { label: '神奈川', value: 'kanagawa' },
  { label: '埼玉', value: 'saitama' },
  { label: '千葉', value: 'chiba' },
  { label: '大阪', value: 'osaka' },
  { label: '京都', value: 'kyoto' },
  { label: '兵庫', value: 'hyogo' },
  { label: '愛知', value: 'aichi' }
]

const serviceOptions = [
  { label: 'オイル交換', value: 'oil_change' },
  { label: '車検', value: 'inspection' },
  { label: 'タイヤ交換', value: 'tire_change' },
  { label: 'ブレーキパッド交換', value: 'brake_pad' },
  { label: 'バッテリー交換', value: 'battery' },
  { label: 'エアコン点検・整備', value: 'air_conditioning' }
]

// 店舗データ（実際の実装ではAPIから取得）
const stores = [
  {
    id: 1,
    name: '東京中央整備工場',
    address: '東京都中央区銀座1-1-1',
    businessHours: '9:00〜18:00',
    phone: '03-1234-5678',
    holidays: '水曜日・祝日',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['オイル交換', '車検', 'タイヤ交換', 'ブレーキパッド交換'],
    area: 'tokyo',
    description: '東京中央に位置する当店は、最新の設備と熟練のスタッフによる高品質なサービスを提供しています。お客様のお車を大切に、丁寧に整備いたします。'
  },
  {
    id: 2,
    name: '横浜ベイサイド車検センター',
    address: '神奈川県横浜市中区山下町2-2-2',
    businessHours: '8:30〜19:00',
    phone: '045-2345-6789',
    holidays: '火曜日',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['車検', 'オイル交換', 'エアコン点検・整備', 'バッテリー交換'],
    area: 'kanagawa',
    description: '横浜ベイサイドに位置する当店は、迅速かつ丁寧な車検サービスを提供しています。お客様のお車の状態を細かくチェックし、安全なカーライフをサポートします。'
  },
  {
    id: 3,
    name: '大阪中央メンテナンスセンター',
    address: '大阪府大阪市中央区心斎橋3-3-3',
    businessHours: '9:00〜20:00',
    phone: '06-3456-7890',
    holidays: '不定休（カレンダーをご確認ください）',
    isOpen: false,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['オイル交換', 'タイヤ交換', 'ブレーキパッド交換', 'バッテリー交換'],
    area: 'osaka',
    description: '大阪中央に位置する当店は、幅広いメンテナンスサービスを提供しています。お客様のお車の状態に合わせた最適なメンテナンスプランをご提案します。'
  },
  {
    id: 4,
    name: '名古屋駅前整備工場',
    address: '愛知県名古屋市中区名駅4-4-4',
    businessHours: '8:00〜19:00',
    phone: '052-4567-8901',
    holidays: '日曜日・祝日',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['車検', 'オイル交換', 'タイヤ交換', 'エアコン点検・整備'],
    area: 'aichi',
    description: '名古屋駅前に位置する当店は、アクセス便利な場所で高品質な整備サービスを提供しています。お仕事帰りや買い物のついでにお気軽にご利用いただけます。'
  },
  {
    id: 5,
    name: '京都東山メンテナンスショップ',
    address: '京都府京都市東山区祇園5-5-5',
    businessHours: '9:00〜18:00',
    phone: '075-5678-9012',
    holidays: '水曜日',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1632823471565-1ecdf5cc2cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['オイル交換', 'タイヤ交換', 'バッテリー交換'],
    area: 'kyoto',
    description: '京都東山に位置する当店は、歴史ある町並みの中で最新の整備サービスを提供しています。熟練のスタッフがお客様のお車を丁寧に整備いたします。'
  },
  {
    id: 6,
    name: '神戸ハーバー車検センター',
    address: '兵庫県神戸市中央区港町6-6-6',
    businessHours: '8:30〜19:30',
    phone: '078-6789-0123',
    holidays: '月曜日',
    isOpen: false,
    image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['車検', 'オイル交換', 'ブレーキパッド交換', 'バッテリー交換'],
    area: 'hyogo',
    description: '神戸ハーバーに位置する当店は、港の風景を眺めながらお車の整備をお待ちいただけます。快適な待合室と丁寧なサービスで、お客様に満足いただける整備を提供します。'
  }
]

// 検索結果のフィルタリング
const filteredStores = computed(() => {
  let result = [...stores]
  
  if (selectedArea.value) {
    result = result.filter(store => store.area === selectedArea.value)
  }
  
  if (selectedService.value) {
    const serviceLabel = serviceOptions.find(option => option.value === selectedService.value)?.label
    result = result.filter(store => store.services.includes(serviceLabel))
  }
  
  return result
})

// 検索処理
function searchStores() {
  // 実際の実装ではAPIリクエストなどを行う
  console.log('検索条件:', { area: selectedArea.value, service: selectedService.value })
}

// 店舗詳細を表示
function showStoreDetail(store) {
  selectedStore.value = store
  showModal.value = true
}

// 予約ページへ遷移
function goToReservation(store) {
  reservationStore.selectStore(store)
  router.push('/reservation/datetime')
}
</script>