<template>
  <div class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
      <!-- ステップインジケーター -->
      <StepIndicator :currentStep="4" />

      <!-- ページヘッダー -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">車両を選択</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          サービスを受ける車両を選択してください。
        </p>
      </div>

      <!-- 車両一覧 -->
      <div class="max-w-5xl mx-auto">
        <div
          v-if="vehicles.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <div
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 overflow-hidden"
            :class="
              selectedVehicle?.id === vehicle.id
                ? 'border-blue-500'
                : 'border-transparent'
            "
            @click="selectVehicle(vehicle)"
          >
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl"
                >
                  車
                </div>
                <h3 class="text-xl font-semibold text-gray-800">
                  {{ vehicle.manufacturer }} {{ vehicle.model }}
                </h3>
              </div>

              <div class="space-y-3 text-gray-700">
                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold">ナンバー</span>
                  <span>{{ vehicle.license_plate }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold">走行距離</span>
                  <span>{{ vehicle.mileage.toLocaleString() }} km</span>
                </div>
              </div>

              <n-tag
                type="success"
                size="small"
                class="mt-4"
                v-if="selectedVehicle?.id === vehicle.id"
                >選択中</n-tag
              >
            </div>
          </div>
        </div>

        <div v-else class="bg-white rounded-xl shadow-md p-8 mb-8 text-center">
          <n-empty description="登録済みの車両がありません">
            <template #extra>
              <n-button
                type="primary"
                class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-blue-600"
                @click="goToRegisterVehicle"
              >
                車両を登録する
              </n-button>
            </template>
          </n-empty>
        </div>

        <!-- 新規車両登録ボタン -->
        <div class="mb-12 text-center">
          <n-button
            class="rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow text-blue-600"
            @click="goToRegisterVehicle"
          >
            <template #icon>
              <n-icon>➕</n-icon>
            </template>
            新しい車両を登録
          </n-button>
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
            :disabled="!selectedVehicle"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { NButton, NIcon, NEmpty, NTag } from "naive-ui";
import { useReservationStore } from "@/stores/reservation";
import StepIndicator from "@/components/reservation/StepIndicator.vue";

const router = useRouter();
const message = useMessage();
const reservationStore = useReservationStore();

const selectedVehicle = ref(null);

// 車両データ
const vehicles = ref([
  {
    id: 1,
    license_plate: "品川 500 あ 12-34",
    manufacturer: "トヨタ",
    model: "プリウス",
    mileage: 45000,
  },
  {
    id: 2,
    license_plate: "横浜 300 さ 56-78",
    manufacturer: "ホンダ",
    model: "フィット",
    mileage: 28000,
  },
]);

// 既存の選択を復元
onMounted(() => {
  if (reservationStore.vehicle_id) {
    selectedVehicle.value = vehicles.value.find(
      (vehicle) => vehicle.id === reservationStore.vehicle_id
    );
  }
});

function selectVehicle(vehicle) {
  selectedVehicle.value = vehicle;
}

function goBack() {
  router.push("/reservation/datetime");
}

function goToRegisterVehicle() {
  // 現在の予約状態を保存
  localStorage.setItem(
    "reservation_state",
    JSON.stringify({
      path: router.currentRoute.value.path,
      ...reservationStore.$state,
    })
  );

  router.push("/vehicles/register");
}

function goToNextStep() {
  if (!selectedVehicle.value) {
    message.warning("車両を選択してください");
    return;
  }

  // 選択した車両を保存
  reservationStore.selectVehicle(selectedVehicle.value);

  // 次のステップへ
  router.push("/reservation/loaner");
}
</script>
