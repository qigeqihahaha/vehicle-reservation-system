<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
       <StepIndicator :currentStep="1" />

      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">サービスを選択</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          ご希望のメンテナンスサービスを選択してください。
        </p>
      </div>

      <!-- サービスタイプ選択 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <!-- サービスタイプ1 -->
        <div
          class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2"
          :class="
            selectedService === 'oil_change'
              ? 'border-blue-500'
              : 'border-transparent'
          "
          @click="selectService('oil_change')"
        >
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">オイル交換</h3>
          <p class="text-gray-600 mb-6">
            エンジンオイルの交換作業。エンジンの寿命を延ばし、燃費向上に効果的です。
          </p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-blue-600">¥5,000〜</span>
            <span class="text-sm text-gray-500">所要時間: 30分</span>
          </div>
          <n-tag
            type="success"
            size="small"
            class="mt-4"
            v-if="selectedService === 'oil_change'"
            >選択中</n-tag
          >
        </div>

        <!-- サービスタイプ2 -->
        <div
          class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2"
          :class="
            selectedService === 'tire_rotation'
              ? 'border-blue-500'
              : 'border-transparent'
          "
          @click="selectService('tire_rotation')"
        >
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">
            タイヤローテーション
          </h3>
          <p class="text-gray-600 mb-6">
            タイヤの位置を入れ替えることで、タイヤの摩耗を均一にし、寿命を延ばします。
          </p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-green-600">¥4,000〜</span>
            <span class="text-sm text-gray-500">所要時間: 45分</span>
          </div>
          <n-tag
            type="success"
            size="small"
            class="mt-4"
            v-if="selectedService === 'tire_rotation'"
            >選択中</n-tag
          >
        </div>

        <!-- サービスタイプ3 -->
        <div
          class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2"
          :class="
            selectedService === 'inspection'
              ? 'border-blue-500'
              : 'border-transparent'
          "
          @click="selectService('inspection')"
        >
          <div
            class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">点検・診断</h3>
          <p class="text-gray-600 mb-6">
            車両の総合点検と診断。問題を早期発見し、大きなトラブルを未然に防ぎます。
          </p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-yellow-600">¥8,000〜</span>
            <span class="text-sm text-gray-500">所要時間: 60分</span>
          </div>
          <n-tag
            type="success"
            size="small"
            class="mt-4"
            v-if="selectedService === 'inspection'"
            >選択中</n-tag
          >
        </div>
      </div>

      <!-- 追加オプション -->
      <div class="max-w-5xl mx-auto mt-12">
        <h2 class="text-xl font-bold text-gray-800 mb-6">追加オプション</h2>

        <div class="bg-white p-6 rounded-xl shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-center">
              <n-checkbox v-model:checked="options.filter_change">
                <div>
                  <span class="font-medium text-gray-800"
                    >エアフィルター交換</span
                  >
                  <p class="text-sm text-gray-600 mt-1">
                    エンジンの空気取り込み効率を向上させます
                  </p>
                </div>
              </n-checkbox>
              <span class="ml-auto font-medium text-gray-800">+¥2,000</span>
            </div>

            <div class="flex items-center">
              <n-checkbox v-model:checked="options.fluid_check">
                <div>
                  <span class="font-medium text-gray-800"
                    >各種フルード点検</span
                  >
                  <p class="text-sm text-gray-600 mt-1">
                    ブレーキ液、冷却水などの点検と補充
                  </p>
                </div>
              </n-checkbox>
              <span class="ml-auto font-medium text-gray-800">+¥1,500</span>
            </div>

            <div class="flex items-center">
              <n-checkbox v-model:checked="options.wiper_replace">
                <div>
                  <span class="font-medium text-gray-800">ワイパー交換</span>
                  <p class="text-sm text-gray-600 mt-1">
                    視界確保のためのワイパーゴム交換
                  </p>
                </div>
              </n-checkbox>
              <span class="ml-auto font-medium text-gray-800">+¥3,000</span>
            </div>

            <div class="flex items-center">
              <n-checkbox v-model:checked="options.battery_check">
                <div>
                  <span class="font-medium text-gray-800">バッテリー点検</span>
                  <p class="text-sm text-gray-600 mt-1">
                    バッテリーの状態チェックと端子清掃
                  </p>
                </div>
              </n-checkbox>
              <span class="ml-auto font-medium text-gray-800">+¥1,000</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 次へボタン -->
      <div class="max-w-5xl mx-auto mt-12 flex justify-between">
        <n-button size="large" class="rounded-lg" @click="$router.push('/')">
          戻る
        </n-button>

        <n-button
          type="primary"
          size="large"
          class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          :disabled="!selectedService"
          @click="nextStep"
        >
          次へ進む
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { NButton, NCheckbox, NTag } from "naive-ui";
import { useReservationStore } from "@/stores/reservation";
import StepIndicator from "@/components/reservation/StepIndicator.vue";

const router = useRouter();
const reservationStore = useReservationStore();

// 選択されたサービス
const selectedService = ref("");

// 追加オプション
const options = reactive({
  filter_change: false,
  fluid_check: false,
  wiper_replace: false,
  battery_check: false,
});

// サービス選択
function selectService(service) {
  selectedService.value = service;
}

// サービス名を取得する補助関数
function getServiceName(serviceType) {
  switch (serviceType) {
    case "oil_change":
      return "オイル交換";
    case "tire_rotation":
      return "タイヤローテーション";
    case "inspection":
      return "点検・診断";
    default:
      return "";
  }
}

// サービス所要時間を取得する補助関数
function getServiceDuration(serviceType) {
  switch (serviceType) {
    case "oil_change":
      return 30;
    case "tire_rotation":
      return 45;
    case "inspection":
      return 60;
    default:
      return 0;
  }
}

// サービス価格を取得する補助関数
function getServicePrice(serviceType) {
  let basePrice = 0;
  switch (serviceType) {
    case "oil_change":
      basePrice = 5000;
      break;
    case "tire_rotation":
      basePrice = 4000;
      break;
    case "inspection":
      basePrice = 8000;
      break;
  }

  // オプションの価格を追加
  if (options.filter_change) basePrice += 2000;
  if (options.fluid_check) basePrice += 1500;
  if (options.wiper_replace) basePrice += 3000;
  if (options.battery_check) basePrice += 1000;

  return basePrice;
}

// 次のステップへ
function nextStep() {
  if (!selectedService.value) return;

  // 予約情報を保存
  // サービスタイプに基づいてサービス情報を作成
  const serviceInfo = {
    id: selectedService.value,
    name: getServiceName(selectedService.value),
    duration: getServiceDuration(selectedService.value),
    price: getServicePrice(selectedService.value),
  };

  reservationStore.selectService(serviceInfo);

  // 次のステップへ移動
  router.push("/reservation/store");
}
</script>
