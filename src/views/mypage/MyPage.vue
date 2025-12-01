<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ページヘッダー -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">マイページ</h1>
        <p class="text-gray-600">予約状況や個人情報の確認・編集ができます。</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- サイドバー -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <!-- ユーザープロフィール -->
            <div class="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <div class="flex items-center">
                <div class="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-2xl font-bold">
                  {{ userInitials }}
                </div>
                <div class="ml-4">
                  <h2 class="text-xl font-semibold">{{ user.last_name }} {{ user.first_name }}</h2>
                  <p class="opacity-80">{{ user.email }}</p>
                </div>
              </div>
            </div>
            
            <!-- メニュー -->
            <div class="p-4">
              <n-menu
                :options="menuOptions"
                :value="activeKey"
                @update:value="handleMenuUpdate"
              />
            </div>
          </div>
        </div>
        
        <!-- メインコンテンツ -->
        <div class="lg:col-span-2">
          <!-- ダッシュボード -->
          <div v-if="activeKey === 'dashboard'" class="space-y-6">
            <!-- 統計カード -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-xl shadow-md p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">現在の予約</p>
                    <p class="text-2xl font-bold text-gray-800 mt-1">2</p>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-md p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">過去の予約</p>
                    <p class="text-2xl font-bold text-gray-800 mt-1">8</p>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-md p-6">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">利用ポイント</p>
                    <p class="text-2xl font-bold text-gray-800 mt-1">1,250</p>
                  </div>
                  <div class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 最近の予約 -->
            <div class="bg-white rounded-xl shadow-md overflow-hidden">
              <div class="p-6 border-b border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800">最近の予約</h3>
              </div>
              <div class="p-6">
                <n-table :bordered="false" :single-line="false">
                  <thead>
                    <tr>
                      <th>予約番号</th>
                      <th>車両</th>
                      <th>日時</th>
                      <th>状態</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="reservation in recentReservations" :key="reservation.id">
                      <td>{{ reservation.id }}</td>
                      <td>{{ reservation.vehicle }}</td>
                      <td>{{ reservation.date }}</td>
                      <td>
                        <n-tag :type="getStatusType(reservation.status)" size="small">
                          {{ reservation.status }}
                        </n-tag>
                      </td>
                      <td>
                        <n-button text size="small" type="primary">
                          詳細
                        </n-button>
                      </td>
                    </tr>
                  </tbody>
                </n-table>
                
                <div class="mt-4 text-center">
                  <n-button text type="primary" @click="activeKey = 'reservations'">
                    すべての予約を見る
                  </n-button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 予約一覧 -->
          <div v-if="activeKey === 'reservations'" class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">予約一覧</h3>
            </div>
            <div class="p-6">
              <n-tabs type="line">
                <n-tab-pane name="upcoming" tab="今後の予約">
                  <n-data-table
                    :columns="reservationColumns"
                    :data="upcomingReservations"
                    :pagination="{ pageSize: 5 }"
                  />
                </n-tab-pane>
                <n-tab-pane name="past" tab="過去の予約">
                  <n-data-table
                    :columns="reservationColumns"
                    :data="pastReservations"
                    :pagination="{ pageSize: 5 }"
                  />
                </n-tab-pane>
                <n-tab-pane name="cancelled" tab="キャンセル済み">
                  <n-data-table
                    :columns="reservationColumns"
                    :data="cancelledReservations"
                    :pagination="{ pageSize: 5 }"
                  />
                </n-tab-pane>
              </n-tabs>
            </div>
          </div>
          
          <!-- プロフィール設定 -->
          <div v-if="activeKey === 'profile'" class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">プロフィール設定</h3>
            </div>
            <div class="p-6">
              <n-form
                :model="profileForm"
                label-placement="left"
                label-width="120px"
                require-mark-placement="right-hanging"
              >
                <n-form-item label="姓" path="lastName">
                  <n-input v-model:value="profileForm.lastName" />
                </n-form-item>
                
                <n-form-item label="名" path="firstName">
                  <n-input v-model:value="profileForm.firstName" />
                </n-form-item>
                
                <n-form-item label="メールアドレス" path="email">
                  <n-input v-model:value="profileForm.email" />
                </n-form-item>
                
                <n-form-item label="電話番号" path="phone">
                  <n-input v-model:value="profileForm.phone" />
                </n-form-item>
                
                <n-form-item label="住所" path="address">
                  <n-input v-model:value="profileForm.address" />
                </n-form-item>
                
                <n-form-item>
                  <n-button type="primary" class="rounded-lg bg-blue-600 hover:bg-blue-700">
                    保存する
                  </n-button>
                </n-form-item>
              </n-form>
            </div>
          </div>
          
          <!-- パスワード変更 -->
          <div v-if="activeKey === 'password'" class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800">パスワード変更</h3>
            </div>
            <div class="p-6">
              <n-form
                :model="passwordForm"
                label-placement="left"
                label-width="120px"
                require-mark-placement="right-hanging"
              >
                <n-form-item label="現在のパスワード" path="currentPassword">
                  <n-input
                    v-model:value="passwordForm.currentPassword"
                    type="password"
                    show-password-on="click"
                  />
                </n-form-item>
                
                <n-form-item label="新しいパスワード" path="newPassword">
                  <n-input
                    v-model:value="passwordForm.newPassword"
                    type="password"
                    show-password-on="click"
                  />
                </n-form-item>
                
                <n-form-item label="パスワード確認" path="confirmPassword">
                  <n-input
                    v-model:value="passwordForm.confirmPassword"
                    type="password"
                    show-password-on="click"
                  />
                </n-form-item>
                
                <n-form-item>
                  <n-button type="primary" class="rounded-lg bg-blue-600 hover:bg-blue-700">
                    パスワードを変更
                  </n-button>
                </n-form-item>
              </n-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, ref, computed } from 'vue'
import { 
  NMenu, NButton, NTable, NTag, NTabs, NTabPane, NDataTable, 
  NForm, NFormItem, NInput, NIcon 
} from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { 
  DashboardOutlined, CalendarOutlined, UserOutlined, 
  LockOutlined, LogoutOutlined 
} from '@vicons/antd'

const authStore = useAuthStore()
const activeKey = ref('dashboard')

// ユーザー情報
const user = computed(() => authStore.user || {
  first_name: '太郎',
  last_name: '田中',
  email: 'test@example.com'
})

const userInitials = computed(() => {
  return user.value.last_name ? user.value.last_name.charAt(0) : 'U'
})

// サイドメニュー
const menuOptions = [
  {
    label: 'ダッシュボード',
    key: 'dashboard',
    icon: renderIcon(DashboardOutlined)
  },
  {
    label: '予約一覧',
    key: 'reservations',
    icon: renderIcon(CalendarOutlined)
  },
  {
    label: 'プロフィール設定',
    key: 'profile',
    icon: renderIcon(UserOutlined)
  },
  {
    label: 'パスワード変更',
    key: 'password',
    icon: renderIcon(LockOutlined)
  },
]

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// メニュー選択処理
function handleMenuUpdate(key) {
  if (key === 'logout') {
    authStore.logout()
    window.location.href = '/login'
    return
  }
  activeKey.value = key
}

// 最近の予約
const recentReservations = [
  { id: 'R-2023-001', vehicle: 'トヨタ カローラ', date: '2023-12-15 10:00', status: '予約確定' },
  { id: 'R-2023-002', vehicle: 'ホンダ CR-V', date: '2023-12-20 14:30', status: '予約確定' },
  { id: 'R-2023-003', vehicle: 'ニッサン リーフ', date: '2023-11-05 09:00', status: '利用済み' }
]

// 予約一覧データ
const upcomingReservations = [
  { id: 'R-2023-001', vehicle: 'トヨタ カローラ', date: '2023-12-15 10:00', endDate: '2023-12-16 10:00', status: '予約確定', price: '5,000円' },
  { id: 'R-2023-002', vehicle: 'ホンダ CR-V', date: '2023-12-20 14:30', endDate: '2023-12-21 14:30', status: '予約確定', price: '6,500円' }
]

const pastReservations = [
  { id: 'R-2023-003', vehicle: 'ニッサン リーフ', date: '2023-11-05 09:00', endDate: '2023-11-06 09:00', status: '利用済み', price: '4,500円' },
  { id: 'R-2023-004', vehicle: 'マツダ CX-5', date: '2023-10-22 13:00', endDate: '2023-10-23 13:00', status: '利用済み', price: '6,000円' },
  { id: 'R-2023-005', vehicle: 'スバル インプレッサ', date: '2023-09-18 11:30', endDate: '2023-09-19 11:30', status: '利用済み', price: '5,500円' }
]

const cancelledReservations = [
  { id: 'R-2023-006', vehicle: 'トヨタ アルファード', date: '2023-11-15 10:00', endDate: '2023-11-16 10:00', status: 'キャンセル済み', price: '8,000円' }
]

// データテーブル列定義
const reservationColumns = [
  { title: '予約番号', key: 'id' },
  { title: '車両', key: 'vehicle' },
  { title: '開始日時', key: 'date' },
  { title: '終了日時', key: 'endDate' },
  { 
    title: '状態', 
    key: 'status',
    render(row) {
      return h(NTag, { type: getStatusType(row.status), size: 'small' }, { default: () => row.status })
    }
  },
  { title: '料金', key: 'price' },
  {
    title: '操作',
    key: 'actions',
    render() {
      return h(
        NButton,
        { size: 'small', type: 'primary', class: 'rounded' },
        { default: () => '詳細' }
      )
    }
  }
]

// 状態に応じたタグタイプを取得
function getStatusType(status) {
  switch (status) {
    case '予約確定': return 'success'
    case '利用済み': return 'info'
    case 'キャンセル済み': return 'error'
    default: return 'default'
  }
}

// プロフィールフォーム
const profileForm = ref({
  lastName: user.value.last_name || '',
  firstName: user.value.first_name || '',
  email: user.value.email || '',
  phone: '090-1234-5678',
  address: '東京都新宿区西新宿1-1-1'
})

// パスワード変更フォーム
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
</script>