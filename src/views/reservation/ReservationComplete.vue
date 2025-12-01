<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
      <StepIndicator :currentStep="8" />

      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          予約が確定しました
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          ご予約ありがとうございます。予約内容の詳細は以下の通りです。
        </p>
      </div>

      <!-- 予約完了メッセージ -->
      <div class="max-w-4xl mx-auto mb-12">
        <div
          class="bg-green-50 p-8 rounded-xl shadow-md border border-green-200 text-center"
        >
          <div
            class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-4xl text-green-600">✓</span>
          </div>
          <h2 class="text-2xl font-bold text-green-800 mb-4">
            予約が完了しました
          </h2>
          <p class="text-green-700 mb-6">予約番号: {{ reservationNumber }}</p>
          <p class="text-gray-700 mb-2">
            予約内容の確認メールをご登録のメールアドレスに送信しました。
          </p>
        </div>
      </div>

      <!-- 予約内容サマリー -->
      <div class="max-w-4xl mx-auto space-y-6 mb-12">
        <!-- サービス内容 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 class="text-lg font-semibold text-blue-800">サービス内容</h2>
          </div>
          <div class="p-6">
            <div class="text-xl font-medium text-gray-800 mb-2">
              {{ reservationStore.service_name }}
            </div>
            <div class="text-gray-600">
              所要時間: {{ reservationStore.duration_minutes }}分
            </div>
          </div>
        </div>

        <!-- 店舗情報 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 class="text-lg font-semibold text-blue-800">店舗情報</h2>
          </div>
          <div class="p-6">
            <div class="text-xl font-medium text-gray-800 mb-2">
              {{ reservationStore.store_name }}
            </div>
            <div class="text-gray-600">
              {{ reservationStore.store_address }}
            </div>
          </div>
        </div>

        <!-- 予約日時 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 class="text-lg font-semibold text-blue-800">予約日時</h2>
          </div>
          <div class="p-6">
            <div class="text-xl font-medium text-gray-800 mb-2">
              {{ formattedDate }}
            </div>
            <div class="text-gray-600">
              {{ reservationStore.reservation_time }} -
              {{ reservationStore.estimated_end_time }}
            </div>
          </div>
        </div>
      </div>

      <!-- ボタンエリア -->
      <div class="max-w-4xl mx-auto mt-12 flex justify-center">
        <n-button
          type="primary"
          size="large"
          class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 mr-4"
          @click="goToMyReservations"
        >
          予約一覧を見る
        </n-button>

        <n-button
          size="large"
          class="rounded-lg text-blue-600"
          @click="goToHome"
        >
          ホームに戻る
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { NButton } from "naive-ui";
import { useReservationStore } from "@/stores/reservation";
import StepIndicator from "@/components/reservation/StepIndicator.vue";

const router = useRouter();
const reservationStore = useReservationStore();

const reservationNumber = ref("");

// 日付のフォーマット
const formattedDate = computed(() => {
  if (!reservationStore.reservation_date) return "";

  const date = new Date(reservationStore.reservation_date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 曜日の日本語表示
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeek = weekdays[date.getDay()];

  return `${year}年${month}月${day}日（${dayOfWeek}）`;
});

onMounted(() => {
  // 予約番号を取得
  reservationNumber.value =
    localStorage.getItem("last_reservation_number") || "RES-00000000";
});

function goToMyReservations() {
  router.push("/reservations");
}

function goToHome() {
  // 予約ストアをリセット
  reservationStore.resetReservation();
  router.push("/");
}
</script>
