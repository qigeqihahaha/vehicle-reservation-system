<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
      <StepIndicator :currentStep="3" />
      
      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">日時を選択</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          ご希望の日付と時間帯をお選びください。
        </p>
      </div>
      
      <!-- カレンダーと時間選択 -->
      <div class="max-w-4xl mx-auto">
        <!-- カレンダー -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div class="flex items-center justify-between p-4 bg-gray-50 border-b">
            <n-button 
              quaternary 
              circle 
              class="text-gray-600 hover:bg-gray-200"
              @click="prevMonth"
            >
              <n-icon>◀</n-icon>
            </n-button>
            <div class="text-xl font-bold text-gray-800">{{ currentYearMonth }}</div>
            <n-button 
              quaternary 
              circle 
              class="text-gray-600 hover:bg-gray-200"
              @click="nextMonth"
            >
              <n-icon>▶</n-icon>
            </n-button>
          </div>
          
          <div class="calendar">
            <div class="grid grid-cols-7 bg-gray-50">
              <div 
                v-for="day in weekdays" 
                :key="day" 
                class="py-2 text-center font-medium"
                :class="{
                  'text-red-500': day === '日',
                  'text-blue-500': day === '土'
                }"
              >
                {{ day }}
              </div>
            </div>
            
            <div class="grid grid-cols-7">
              <div
                v-for="day in calendarDays"
                :key="day.date"
                class="h-12 flex items-center justify-center relative cursor-pointer"
                :class="{
                  'text-gray-400': !day.currentMonth,
                  'font-bold text-blue-500': day.isToday,
                  'bg-blue-500 text-white rounded-full': isSelectedDate(day.date),
                  'hover:bg-blue-100': day.available && !isSelectedDate(day.date),
                  'text-gray-300 cursor-not-allowed line-through': !day.available
                }"
                @click="day.available && selectDate(day.date)"
              >
                {{ day.day }}
                <div 
                  v-if="day.isToday" 
                  class="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 選択した日付の表示 -->
        <div v-if="selectedDate" class="mb-6">
          <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div class="font-medium text-blue-800">
              選択した日: {{ formattedSelectedDate }}
            </div>
          </div>
        </div>
        
        <!-- 時間帯選択 -->
        <div v-if="selectedDate" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">利用可能な時間帯:</h3>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            <n-button
              v-for="slot in timeSlots"
              :key="slot.time"
              :type="selectedTime === slot.time ? 'primary' : 'default'"
              :disabled="!slot.available"
              class="rounded-lg text-blue-600"
              @click="selectTime(slot.time)"
            >
              {{ slot.time }}
            </n-button>
          </div>
        </div>
        
        <!-- 予定終了時間 -->
        <div v-if="selectedDate && selectedTime" class="mb-8">
          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <div class="flex items-center">
              <n-icon class="text-green-600 mr-2">⏱️</n-icon>
              <span class="font-medium text-green-800">予定終了時間: {{ estimatedEndTime }}</span>
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
            :disabled="!selectedDate || !selectedTime"
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
import { useMessage } from 'naive-ui'
import { NButton, NIcon } from 'naive-ui'
import { useReservationStore } from '@/stores/reservation'
import StepIndicator from '@/components/reservation/StepIndicator.vue'

const router = useRouter()
const message = useMessage()
const reservationStore = useReservationStore()

// カレンダー関連のデータ
const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDate = ref('')
const selectedTime = ref('')

// 曜日表示
const weekdays = ['日', '月', '火', '水', '木', '金', '土']

// 現在の年月表示を計算
const currentYearMonth = computed(() => {
  return `${currentYear.value}年${currentMonth.value + 1}月`
})

// カレンダーの日付を計算
const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // 月の最初の日の曜日を取得
  const firstDayOfWeek = firstDay.getDay()
  
  // 前月の日付を埋める
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i
    const date = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    days.push({
      day,
      date,
      currentMonth: false,
      isToday: false,
      available: false
    })
  }
  
  // 当月の日付を埋める
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const isToday = i === today.getDate() && 
                    currentMonth.value === today.getMonth() && 
                    currentYear.value === today.getFullYear()
    
    // 日付が利用可能かどうかを判断（簡単なルール：今日以降の日付で、日曜日は不可）
    const dayDate = new Date(currentYear.value, currentMonth.value, i)
    const available = dayDate >= today && dayDate.getDay() !== 0
    
    days.push({
      day: i,
      date,
      currentMonth: true,
      isToday,
      available
    })
  }
  
  // 42日（6週間）に満たない場合、翌月の日付を埋める
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = `${currentYear.value}-${String(currentMonth.value + 2).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({
      day: i,
      date,
      currentMonth: false,
      isToday: false,
      available: false
    })
  }
  
  return days
})

// 利用可能な時間枠
const timeSlots = ref([])

// 予定終了時間を計算
const estimatedEndTime = computed(() => {
  if (!selectedTime.value) return ''
  
  const [hours, minutes] = selectedTime.value.split(':').map(Number)
  const endTime = new Date()
  endTime.setHours(hours)
  endTime.setMinutes(minutes + reservationStore.duration_minutes)
  
  return `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`
})

// 選択した日付をフォーマット
const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return ''
  
  const date = new Date(selectedDate.value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayOfWeek = weekdays[date.getDay()]
  
  return `${year}年${month}月${day}日（${dayOfWeek}）`
})

// 日付が選択されているかチェック
function isSelectedDate(date) {
  return selectedDate.value === date
}

// 日付を選択
function selectDate(date) {
  selectedDate.value = date
  selectedTime.value = ''
  
  // 利用可能な時間枠を生成
  generateTimeSlots(date)
}

// 利用可能な時間枠を生成
function generateTimeSlots(date) {
  // APIコールをシミュレート、利用可能な時間枠を生成
  const slots = []
  const startHour = 9
  const endHour = 17
  
  for (let hour = startHour; hour <= endHour; hour++) {
    // 昼休み時間12:00-13:00は利用不可
    if (hour === 12) continue
    
    // ランダムに利用可能状態を生成、実際にはAPIから取得すべき
    const available = Math.random() > 0.3
    
    slots.push({
      time: `${String(hour).padStart(2, '0')}:00`,
      available
    })
  }
  
  timeSlots.value = slots
}

// 時間を選択
function selectTime(time) {
  selectedTime.value = time
}

// 前月へ
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

// 翌月へ
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

// 既存の選択を復元
onMounted(() => {
  if (reservationStore.reservation_date) {
    selectedDate.value = reservationStore.reservation_date
    
    // 日付を解析し、現在の年月を設定
    const date = new Date(reservationStore.reservation_date)
    currentYear.value = date.getFullYear()
    currentMonth.value = date.getMonth()
    
    // 利用可能な時間枠を生成
    generateTimeSlots(selectedDate.value)
    
    // 選択した時間を復元
    if (reservationStore.reservation_time) {
      selectedTime.value = reservationStore.reservation_time
    }
  }
})

function goBack() {
  router.push('/reservation/store')
}

function goToNextStep() {
  if (!selectedDate.value || !selectedTime.value) {
    message.warning('日時を選択してください')
    return
  }
  
  // 選択した日付と時間を保存
  reservationStore.selectDateTime(selectedDate.value, selectedTime.value, estimatedEndTime.value)
  
  // 次のステップへ
  router.push('/reservation/vehicle')
}
</script>