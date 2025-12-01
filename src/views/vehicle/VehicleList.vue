<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ページヘッダー -->
      <div class="mb-8 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">マイ車両一覧</h1>
          <p class="text-gray-600">登録済みの車両一覧です。車両情報の確認・編集ができます。</p>
        </div>
        <n-button type="primary" class="rounded-lg bg-blue-600 hover:bg-blue-700" @click="goToRegister">
          新規車両登録
        </n-button>
      </div>
      
      <!-- フィルターと検索 -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div class="flex-grow">
            <n-input
              v-model:value="searchQuery"
              placeholder="車両を検索..."
              clearable
              class="rounded-lg"
            >
              <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </template>
            </n-input>
          </div>
          
          <div class="flex space-x-4">
            <n-select
              v-model:value="selectedType"
              :options="vehicleTypes"
              placeholder="車種"
              clearable
              class="w-32"
            />
            
            <n-select
              v-model:value="selectedStatus"
              :options="statusOptions"
              placeholder="車検状況"
              clearable
              class="w-32"
            />
            
            <n-button type="primary" class="rounded-lg bg-blue-600 hover:bg-blue-700">
              フィルター
            </n-button>
          </div>
        </div>
      </div>
      
      <!-- 車両リスト -->
      <div v-if="filteredVehicles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="vehicle in filteredVehicles" :key="vehicle.id" class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="relative">
            <img :src="vehicle.image" :alt="vehicle.name" class="w-full h-48 object-cover" />
            <div v-if="vehicle.inspection_status === 'valid'" class="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              車検有効
            </div>
            <div v-else-if="vehicle.inspection_status === 'warning'" class="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              車検間近
            </div>
            <div v-else class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              車検切れ
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-semibold text-gray-800">{{ vehicle.name }}</h3>
              <span class="text-sm font-medium text-gray-500">{{ vehicle.license_plate }}</span>
            </div>
            
            <div class="flex items-center text-gray-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>車検期限: {{ vehicle.inspection_expiry }}</span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="text-gray-600">{{ vehicle.type }}</span>
              </div>
              
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-gray-600">{{ vehicle.year }}年式</span>
              </div>
              
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="text-gray-600">走行距離: {{ vehicle.mileage.toLocaleString() }}km</span>
              </div>
              
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span class="text-gray-600">{{ vehicle.fuel }}</span>
              </div>
            </div>
            
            <!-- 修改这里：将メンテナンス予約按钮改为車両情報編集按钮 -->
            <n-button type="primary" block class="rounded-lg bg-blue-600 hover:bg-blue-700" @click="goToEdit(vehicle.id)">
              車両情報編集
            </n-button>
          </div>
        </div>
      </div>
      
      <!-- 車両がない場合 -->
      <div v-else class="bg-white rounded-xl shadow-md p-10 text-center">
        <div class="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-800 mb-2">登録車両がありません</h3>
        <p class="text-gray-600 mb-6">車両情報を管理するには、まずお持ちの車両を登録してください。</p>
        <n-button type="primary" class="rounded-lg bg-blue-600 hover:bg-blue-700" @click="goToRegister">
          車両を登録する
        </n-button>
      </div>
      
      <!-- ページネーション -->
      <div v-if="filteredVehicles.length > 0" class="mt-8 flex justify-center">
        <n-pagination
          v-model:page="currentPage"
          :page-count="totalPages"
          :page-slot="5"
          :page-sizes="[9, 18, 27]"
          show-size-picker
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NInput, NSelect, NButton, NPagination } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

// 検索とフィルター
const searchQuery = ref('')
const selectedType = ref(null)
const selectedStatus = ref(null)
const currentPage = ref(1)
const pageSize = ref(9)

// 車種オプション
const vehicleTypes = [
  { label: 'セダン', value: 'sedan' },
  { label: 'SUV', value: 'suv' },
  { label: 'コンパクト', value: 'compact' },
  { label: 'ミニバン', value: 'minivan' }
]

// 状態オプション
const statusOptions = [
  { label: '車検有効', value: 'valid' },
  { label: '車検間近', value: 'warning' },
  { label: '車検切れ', value: 'expired' }
]

// モックデータ - お客様の車両
const vehicles = [
  {
    id: 1,
    name: 'トヨタ プリウス',
    type: 'セダン',
    year: 2020,
    mileage: 45000,
    transmission: 'オートマチック',
    fuel: 'ハイブリッド',
    inspection_status: 'valid',
    inspection_expiry: '2026年3月15日',
    license_plate: '品川 500 あ 12-34',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'ホンダ フィット',
    type: 'コンパクト',
    year: 2018,
    mileage: 28000,
    transmission: 'オートマチック',
    fuel: 'ガソリン',
    inspection_status: 'warning',
    inspection_expiry: '2025年12月5日',
    license_plate: '横浜 300 さ 56-78',
    image: 'https://images.unsplash.com/photo-1593055357429-62eaf3b259cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'スバル フォレスター',
    type: 'SUV',
    year: 2017,
    mileage: 62000,
    transmission: 'オートマチック',
    fuel: 'ガソリン',
    inspection_status: 'expired',
    inspection_expiry: '2024年10月20日',
    license_plate: '練馬 400 み 90-12',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
]

// フィルター適用
const filteredVehicles = computed(() => {
  let result = [...vehicles]
  
  // 検索クエリでフィルタリング
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(v => 
      v.name.toLowerCase().includes(query) || 
      v.type.toLowerCase().includes(query) ||
      v.license_plate.toLowerCase().includes(query)
    )
  }
  
  // 車種でフィルタリング
  if (selectedType.value) {
    result = result.filter(v => v.type === vehicleTypes.find(t => t.value === selectedType.value)?.label)
  }
  
  // 車検状況でフィルタリング
  if (selectedStatus.value) {
    result = result.filter(v => v.inspection_status === selectedStatus.value)
  }
  
  return result
})

// ページネーション
const totalPages = computed(() => Math.ceil(filteredVehicles.value.length / pageSize.value))

// 新規車両登録ページへ
function goToRegister() {
  router.push('/vehicles/register')
}

// 車両編集ページへ - 修正：路由路径格式
function goToEdit(vehicleId) {
  router.push(`/vehicles/${vehicleId}/edit`)
}

// メンテナンス予約ページへ
function goToMaintenance(vehicleId) {
  router.push({
    path: '/reservation/service',
    query: { vehicle_id: vehicleId }
  })
}
</script>