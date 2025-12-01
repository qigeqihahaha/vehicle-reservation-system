<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
      <StepIndicator :currentStep="7" />

      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">予約内容の確認</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          予約内容をご確認の上、問題がなければ予約を確定してください。
        </p>
      </div>

      <!-- 予約内容確認 -->
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
            <div class="text-xl font-medium text-gray-800 mb-4">
              {{ reservationStore.store_name }}
            </div>
            <div class="text-gray-600 mb-4">
              {{ reservationStore.store_address }}
            </div>
            <n-button
              class="rounded-lg bg-white shadow-sm hover:shadow border border-gray-200 text-blue-600"
              @click="showStoreMap"
            >
              地図を見る
            </n-button>
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

        <!-- 車両情報 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 class="text-lg font-semibold text-blue-800">車両情報</h2>
          </div>
          <div class="p-6">
            <div class="text-xl font-medium text-gray-800 mb-2">
              {{ vehicleInfo.manufacturer }} {{ vehicleInfo.model }}
            </div>
            <div class="text-gray-600">
              ナンバー: {{ vehicleInfo.license_plate }}
            </div>
          </div>
        </div>

        <!-- 代車情報 -->
        <div
          v-if="reservationStore.needs_loaner"
          class="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div class="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 class="text-lg font-semibold text-blue-800">代車</h2>
          </div>
          <div class="p-6">
            <div class="text-xl font-medium text-gray-800 mb-2">
              {{ loanerInfo.type }} {{ loanerInfo.car_number }}
            </div>
            <div class="text-gray-600">
              ナンバー: {{ loanerInfo.license_plate }}
            </div>
          </div>
        </div>

        <!-- 料金情報 -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h2 class="text-lg font-semibold text-blue-800">料金</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">基本料金:</span>
                <span class="text-gray-800 font-medium"
                  >¥{{ reservationStore.base_price.toLocaleString() }}</span
                >
              </div>

              <div
                v-if="reservationStore.discount_amount > 0"
                class="flex justify-between items-center text-red-600"
              >
                <span>クーポン割引:</span>
                <span
                  >-¥{{
                    reservationStore.discount_amount.toLocaleString()
                  }}</span
                >
              </div>

              <div
                class="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center"
              >
                <span class="text-lg font-bold text-gray-800">合計:</span>
                <span class="text-xl font-bold text-blue-600"
                  >¥{{ finalPrice.toLocaleString() }}</span
                >
              </div>

              <div
                class="mt-4 py-2 px-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-800 font-medium"
              >
                支払い状況: 未払い
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 利用規約同意 -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="bg-gray-100 rounded-lg p-4 flex items-center">
          <n-checkbox v-model:checked="agreedToTerms" class="text-gray-800">
            <span>
              <router-link
                to="/terms"
                target="_blank"
                class="text-blue-600 hover:underline"
                >利用規約</router-link
              >
              に同意します
            </span>
          </n-checkbox>
        </div>
      </div>

      <!-- ボタンエリア -->
      <div class="max-w-4xl mx-auto mt-12 flex justify-between">
        <n-button size="large" class="rounded-lg text-blue-600" @click="goBack">
          戻る
        </n-button>

        <n-button
          type="primary"
          size="large"
          class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          :disabled="!agreedToTerms"
          :loading="submitting"
          @click="confirmReservation"
        >
          予約を確定する
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { NButton, NCheckbox } from "naive-ui";
import { useReservationStore } from "@/stores/reservation";
import StepIndicator from "@/components/reservation/StepIndicator.vue";

const router = useRouter();
const message = useMessage();
const reservationStore = useReservationStore();

const agreedToTerms = ref(false);
const submitting = ref(false);

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

// 車両情報
const vehicleInfo = computed(() => {
  return reservationStore.vehicle_info || {};
});

// 代車情報
const loanerInfo = computed(() => {
  return reservationStore.loaner_car_info || {};
});

// 最終価格
const finalPrice = computed(() => {
  return reservationStore.base_price - reservationStore.discount_amount;
});

function goBack() {
  router.push("/reservation/coupon");
}

function showStoreMap() {
  message.info("地図表示機能は現在実装中です");
}

// 予約を確定
async function confirmReservation() {
  if (!agreedToTerms.value) {
    message.warning("利用規約に同意してください");
    return;
  }

  submitting.value = true;

  try {
    // APIコールをシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 予約成功を仮定
    const reservationId = Math.floor(Math.random() * 10000);
    const reservationNumber = `RES-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}${String(new Date().getDate()).padStart(
      2,
      "0"
    )}-${String(reservationId).padStart(4, "0")}`;

    // 予約IDと番号を保存
    localStorage.setItem("last_reservation_id", reservationId);
    localStorage.setItem("last_reservation_number", reservationNumber);

    // 予約完了ページへ遷移
    router.push("/reservation/complete");
  } catch (error) {
    message.error("予約の確定に失敗しました。もう一度お試しください。");
  } finally {
    submitting.value = false;
  }
}
</script>
