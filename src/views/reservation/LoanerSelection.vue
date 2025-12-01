<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
      <StepIndicator :currentStep="5" />

      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          代車が必要ですか？
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          サービス中に代車が必要な場合は選択してください。
        </p>
      </div>

      <!-- 代車オプション選択 -->
      <div class="max-w-5xl mx-auto">
        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
          <n-radio-group
            v-model:value="needsLoaner"
            class="flex justify-center gap-8"
          >
            <n-radio :value="true" class="text-lg">
              <div class="flex items-center gap-2">
                <span class="font-medium">代車が必要</span>
              </div>
            </n-radio>
            <n-radio :value="false" class="text-lg">
              <div class="flex items-center gap-2">
                <span class="font-medium">不要</span>
              </div>
            </n-radio>
          </n-radio-group>
        </div>

        <!-- 代車選択エリア -->
        <div v-if="needsLoaner" class="mt-8">
          <h3 class="text-xl font-semibold text-gray-800 mb-6">
            利用可能な代車:
          </h3>

          <div
            v-if="loanerCars.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <div
              v-for="car in loanerCars"
              :key="car.id"
              class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 overflow-hidden"
              :class="
                selectedLoanerCar?.id === car.id
                  ? 'border-blue-500'
                  : 'border-transparent'
              "
              @click="selectLoanerCar(car)"
            >
              <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                  <div
                    class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl"
                  >
                    車
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800">
                    {{ car.type }} {{ car.car_number }}
                  </h3>
                </div>

                <div class="space-y-3 text-gray-700">
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-bold">ナンバー</span>
                    <span>{{ car.license_plate }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-bold">燃料</span>
                    <span>{{ car.fuel_type }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-bold">料金</span>
                    <span>{{
                      car.fee === 0 ? "無料" : `¥${car.fee.toLocaleString()}`
                    }}</span>
                  </div>
                </div>

                <n-tag
                  type="success"
                  size="small"
                  class="mt-4"
                  v-if="selectedLoanerCar?.id === car.id"
                  >選択中</n-tag
                >
              </div>
            </div>
          </div>

          <div
            v-else
            class="bg-white rounded-xl shadow-md p-8 mb-8 text-center"
          >
            <n-empty description="申し訳ございません。現在代車がございません" />
          </div>

          <div
            class="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-8"
          >
            <div class="flex items-center gap-2 text-yellow-800">
              <span class="font-medium"
                >注意：代車は満タン返しでお願いします</span
              >
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
            :disabled="needsLoaner && !selectedLoanerCar"
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
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { NButton, NIcon, NEmpty, NRadio, NRadioGroup, NTag } from "naive-ui";
import { useReservationStore } from "@/stores/reservation";
import StepIndicator from "@/components/reservation/StepIndicator.vue";

const router = useRouter();
const message = useMessage();
const reservationStore = useReservationStore();

const needsLoaner = ref(false);
const selectedLoanerCar = ref(null);

// 代車データ
const loanerCars = ref([
  {
    id: 1,
    car_number: "A-001",
    license_plate: "品川 500 れ 11-11",
    type: "軽自動車",
    fuel_type: "ガソリン",
    fee: 0,
  },
  {
    id: 2,
    car_number: "B-002",
    license_plate: "品川 300 す 22-22",
    type: "コンパクトカー",
    fuel_type: "ガソリン",
    fee: 0,
  },
]);

// 既存の選択を復元
onMounted(() => {
  if (reservationStore.needs_loaner !== undefined) {
    needsLoaner.value = reservationStore.needs_loaner;

    if (needsLoaner.value && reservationStore.loaner_car_id) {
      selectedLoanerCar.value = loanerCars.value.find(
        (car) => car.id === reservationStore.loaner_car_id
      );
    }
  }
});

// 代車が必要かどうかの状態が変わったとき、選択した代車をリセット
watch(needsLoaner, (newValue) => {
  if (!newValue) {
    selectedLoanerCar.value = null;
  }
});

function selectLoanerCar(car) {
  selectedLoanerCar.value = car;
}

function goBack() {
  router.push("/reservation/vehicle");
}

function goToNextStep() {
  if (needsLoaner.value && !selectedLoanerCar.value) {
    message.warning("代車を選択してください");
    return;
  }

  // 代車選択を保存
  reservationStore.selectLoanerCar(needsLoaner.value, selectedLoanerCar.value);

  // 次のステップへ
  router.push("/reservation/coupon");
}
</script>
