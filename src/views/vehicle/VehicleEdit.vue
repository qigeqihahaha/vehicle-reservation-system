<template>
  <main-layout>
    <div class="flex items-center gap-4 mb-6">
      <n-button quaternary circle @click="goBack">
        <template #icon>
          <n-icon>←</n-icon>
        </template>
      </n-button>
      <h1 class="text-2xl font-bold text-gray-800 m-0">車両情報集</h1>
    </div>
    
    <div v-if="loading" class="flex justify-center py-12">
      <n-spin size="large" />
    </div>
    
    <div v-else-if="!vehicle" class="py-12">
      <n-result
        status="404"
        title="車両が見つかりません"
        description="お探しの車両情報は見つかりませんでした。"
      >
        <template #footer>
          <n-button @click="goToVehicleList">
            車両一覧に戻る
          </n-button>
        </template>
      </n-result>
    </div>
    
    <div v-else class="bg-white rounded-xl shadow-md p-6 mb-6">
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        @submit.prevent="handleSubmit"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <n-form-item-row label="メーカー" path="manufacturer">
            <div class="flex justify-start w-full">
              <n-select
                v-model:value="formValue.manufacturer"
                :options="manufacturerOptions"
                placeholder="メーカーを選択"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="車種" path="model">
            <div class="flex justify-start w-full">
              <n-input
                v-model:value="formValue.model"
                placeholder="例：プリウス"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="年式" path="year">
            <div class="flex justify-start w-full">
              <n-select
                v-model:value="formValue.year"
                :options="yearOptions"
                placeholder="年式を選択"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="ナンバープレート" path="license_plate">
            <div class="flex justify-start w-full">
              <n-input
                v-model:value="formValue.license_plate"
                placeholder="例：品川 500 あ 12-34"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="走行距離 (km)" path="mileage">
            <div class="flex justify-start w-full">
              <n-select
                v-model:value="formValue.mileage"
                :options="mileageOptions"
                placeholder="走行距離を選択"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="車検期限" path="inspection_expiry">
            <div class="flex justify-start w-full">
              <n-date-picker
                v-model:value="formValue.inspection_expiry"
                type="date"
                placeholder="車検期限を選択"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="車体色" path="color">
            <div class="flex justify-start w-full">
              <n-select
                v-model:value="formValue.color"
                :options="colorOptions"
                placeholder="車体色を選択"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="燃料タイプ" path="fuel_type">
            <div class="flex justify-start w-full">
              <n-select
                v-model:value="formValue.fuel_type"
                :options="fuelTypeOptions"
                placeholder="燃料タイプを選択"
                class="w-full"
              />
            </div>
          </n-form-item-row>
          
          <n-form-item-row label="排気量 (cc)" path="engine_size">
            <div class="flex justify-start w-full">
              <n-select
                v-model:value="formValue.engine_size"
                :options="engineSizeOptions"
                placeholder="排気量を選択"
                class="w-full"
              />
            </div>
          </n-form-item-row>
        </div>
        
        <n-form-item-row label="備考" path="notes">
          <div class="flex justify-start w-full">
            <n-input
              v-model:value="formValue.notes"
              type="textarea"
              placeholder="備考があれば入力してください"
              class="w-full"
            />
          </div>
        </n-form-item-row>
        
        <!-- 保存とキャンセルボタンを備考の下に移動 -->
        <div class="flex justify-end gap-4 mt-6 md:flex-row flex-col">
          <n-button @click="goBack" class="md:w-auto w-full text-blue-600">
            キャンセル
          </n-button>
          <n-button
            type="primary"
            :loading="submitting"
            @click="handleSubmit"
            class="md:w-auto w-full"
          >
            保存する
          </n-button>
        </div>
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <h3 class="text-lg font-medium mb-4">整備履歴</h3>
          <div v-if="formValue.maintenance_history && formValue.maintenance_history.length > 0">
            <div v-for="(record, index) in formValue.maintenance_history" :key="index" class="mb-4 p-4 border border-gray-200 rounded-lg">
              <!-- 予約状態と予約番号 -->
              <div class="flex justify-between items-center mb-3">
                <div class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  予約済み
                </div>
                <div class="text-gray-600 text-sm">
                  予約番号: {{ record.reservation_number }}
                </div>
              </div>
              
              <!-- メンテナンス内容と日時 -->
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p class="text-sm text-gray-500">メンテナンス内容</p>
                  <p class="font-medium">{{ record.service }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">日時</p>
                  <p class="font-medium">{{ formatDate(record.date) }}</p>
                </div>
              </div>
              
              <!-- 店舗と車両情報 -->
              <div class="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p class="text-sm text-gray-500">店舗</p>
                  <p class="font-medium">{{ record.store || '東京店' }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">車両</p>
                  <div>
                    <p class="font-medium">{{ formValue.manufacturer }} {{ formValue.model }}</p>
                    <p class="text-sm text-gray-600">{{ formValue.license_plate }}</p>
                  </div>
                </div>
              </div>
              
              <!-- メモ（あれば表示） -->
              <div v-if="record.notes" class="mt-3 pt-3 border-t border-gray-100">
                <p class="text-sm text-gray-500">メモ</p>
                <p class="text-gray-700">{{ record.notes }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500 italic">
            整備履歴はありません
          </div>
        </div>
      </n-form>
    </div>
  </main-layout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import {
  NButton,
  NForm,
  NFormItemRow,
  NInput,
  NInputNumber,
  NSelect,
  NDatePicker,
  NIcon,
  NSpin,
  NResult,
  NInputGroup
} from 'naive-ui'
import MainLayout from "@/layouts/MainLayout.vue"

const router = useRouter()
const route = useRoute()
const message = useMessage()

const formRef = ref(null)
const loading = ref(true)
const submitting = ref(false)
const vehicle = ref(null)
const currentYear = new Date().getFullYear()

// 表单数据
const formValue = reactive({
  manufacturer: null,
  model: '',
  year: null,
  license_plate: '',
  mileage: null,
  inspection_expiry: null,
  color: null,
  fuel_type: null,
  engine_size: null,
  notes: '',
  maintenance_history: []
})

// 表单验证规则
const rules = {
  manufacturer: {
    required: true,
    message: 'メーカーを選択してください',
    trigger: 'blur'
  },
  model: {
    required: true,
    message: '車種を入力してください',
    trigger: 'blur'
  },
  year: {
    required: true,
    message: '年式を選択してください',
    trigger: 'blur'
  },
  license_plate: {
    required: true,
    message: 'ナンバープレートを入力してください',
    trigger: 'blur'
  },
  mileage: {
    required: true,
    message: '走行距離を選択してください',
    trigger: 'blur'
  },
  inspection_expiry: {
    required: true,
    type: 'number',
    message: '車検期限を選択してください',
    trigger: 'blur'
  }
}

// 制造商选项
const manufacturerOptions = [
  { label: 'トヨタ', value: 'トヨタ' },
  { label: 'ホンダ', value: 'ホンダ' },
  { label: '日産', value: '日産' },
  { label: 'マツダ', value: 'マツダ' },
  { label: 'スバル', value: 'スバル' },
  { label: 'スズキ', value: 'スズキ' },
  { label: '三菱', value: '三菱' },
  { label: 'レクサス', value: 'レクサス' },
  { label: 'ダイハツ', value: 'ダイハツ' },
  { label: '輸入車', value: '輸入車' }
]

// 年式选项
const yearOptions = (() => {
  const options = [];
  for (let year = currentYear; year >= 2000; year--) {
    options.push({ label: `${year}年`, value: year });
  }
  return options;
})();

// 走行距離选项
const mileageOptions = [
  { label: "5,000km未満", value: 5000 },
  { label: "5,000km〜10,000km", value: 10000 },
  { label: "10,000km〜30,000km", value: 30000 },
  { label: "30,000km〜50,000km", value: 50000 },
  { label: "50,000km〜70,000km", value: 70000 },
  { label: "70,000km〜100,000km", value: 100000 },
  { label: "100,000km〜150,000km", value: 150000 },
  { label: "150,000km以上", value: 200000 },
];

// 排気量选项
const engineSizeOptions = [
  { label: "660cc（軽自動車）", value: 660 },
  { label: "1,000cc", value: 1000 },
  { label: "1,200cc", value: 1200 },
  { label: "1,500cc", value: 1500 },
  { label: "1,800cc", value: 1800 },
  { label: "2,000cc", value: 2000 },
  { label: "2,500cc", value: 2500 },
  { label: "3,000cc", value: 3000 },
  { label: "3,500cc以上", value: 3500 },
  { label: "電気自動車（EV）", value: 0 },
];

// 颜色选项
const colorOptions = [
  { label: 'ホワイト', value: 'white' },
  { label: 'ブラック', value: 'black' },
  { label: 'シルバー', value: 'silver' },
  { label: 'グレー', value: 'gray' },
  { label: 'レッド', value: 'red' },
  { label: 'ブルー', value: 'blue' },
  { label: 'グリーン', value: 'green' },
  { label: 'イエロー', value: 'yellow' },
  { label: 'ブラウン', value: 'brown' },
  { label: 'パープル', value: 'purple' },
  { label: 'その他', value: 'other' }
]

// 燃料类型选项
const fuelTypeOptions = [
  { label: 'ガソリン', value: 'gasoline' },
  { label: 'ディーゼル', value: 'diesel' },
  { label: 'ハイブリッド', value: 'hybrid' },
  { label: '電気', value: 'electric' },
  { label: '水素', value: 'hydrogen' },
  { label: 'その他', value: 'other' }
]

// 日付のフォーマット
function formatDate(timestamp) {
  if (!timestamp) return '未設定';
  const date = new Date(timestamp);
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}(${dayOfWeek}) ${hours}:${minutes}`;
}

// 走行距離のフォーマット
function formatMileage(mileage) {
  if (!mileage && mileage !== 0) return '未設定';
  return `${mileage.toLocaleString()}km`;
}

// 返回上一页
function goBack() {
  router.back()
}

function goToVehicleList() {
  router.push('/vehicles')
}

// 获取车辆数据
async function fetchVehicle() {
  loading.value = true
  
  try {
    // 获取URL中的ID参数
    const vehicleId = parseInt(route.params.id)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟车辆数据
    const mockVehicles = [
      {
        id: 1,
        manufacturer: 'トヨタ',
        model: 'プリウス',
        year: 2020,
        license_plate: '品川 500 あ 12-34',
        mileage: 45000,
        inspection_expiry: '2026-03-15',
        color: 'white',
        fuel_type: 'hybrid',
        engine_size: 1800,
        notes: '特に問題なし',
        maintenance_history: [
          {
            date: '2025-11-20T10:00:00',
            service: 'オイル交換',
            mileage: 40000,
            notes: '次回は5,000km後に交換予定',
            reservation_number: 'RES-20251120-0001',
            store: '東京店'
          },
          {
            date: '2024-11-20T14:30:00',
            service: 'タイヤ交換',
            mileage: 35000,
            notes: '4本全て交換',
            reservation_number: 'RES-20241120-0002',
            store: '横浜店'
          }
        ]
      },
      {
        id: 2,
        manufacturer: 'ホンダ',
        model: 'フィット',
        year: 2018,
        license_plate: '横浜 300 さ 56-78',
        mileage: 28000,
        inspection_expiry: '2025-12-05',
        color: 'blue',
        fuel_type: 'gasoline',
        engine_size: 1300,
        notes: '',
        maintenance_history: [
          {
            date: '2025-06-15T09:15:00',
            service: 'オイル交換',
            mileage: 25000,
            notes: '',
            reservation_number: 'RES-20250615-0003',
            store: '東京店'
          }
        ]
      }
    ]
    
    // 查找对应ID的车辆
    vehicle.value = mockVehicles.find(v => v.id === vehicleId)
    
    if (vehicle.value) {
      // 将车辆数据填充到表单
      Object.keys(formValue).forEach(key => {
        if (vehicle.value[key] !== undefined) {
          // 处理日期类型
          if (key === 'inspection_expiry') {
            formValue[key] = new Date(vehicle.value[key]).getTime()
          } 
          // 处理维护记录中的日期
          else if (key === 'maintenance_history') {
            formValue[key] = vehicle.value[key].map(record => ({
              ...record,
              date: new Date(record.date).getTime()
            }))
          }
          else {
            formValue[key] = vehicle.value[key]
          }
        }
      })
    }
  } catch (error) {
    message.error('車両データの取得に失敗しました')
  } finally {
    loading.value = false
  }
}

// 提交表单
async function handleSubmit() {
  submitting.value = true
  
  try {
    await formRef.value?.validate()
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 假设更新成功
    message.success('車両情報を更新しました')
    router.push('/vehicles')
  } catch (error) {
    // 表单验证失败
    if (error instanceof Error) {
      message.error(error.message || '車両情報の更新に失敗しました')
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  fetchVehicle()
})
</script>