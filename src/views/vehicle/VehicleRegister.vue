<template>
  <main-layout>
    <div class="flex items-center gap-4 mb-6">
      <n-button quaternary circle @click="goBack">
        <template #icon>
          <n-icon>←</n-icon>
        </template>
      </n-button>
      <h1 class="text-2xl font-bold text-gray-800 m-0">車両登録</h1>
    </div>

    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
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
            登録する
          </n-button>
        </div>
      </n-form>
    </div>
  </main-layout>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMessage } from "naive-ui";
import {
  NButton,
  NForm,
  NFormItemRow,
  NInput,
  NInputNumber,
  NSelect,
  NDatePicker,
  NIcon,
} from "naive-ui";
import MainLayout from "@/layouts/MainLayout.vue";

const router = useRouter();
const route = useRoute();
const message = useMessage();

const formRef = ref(null);
const submitting = ref(false);
const currentYear = new Date().getFullYear();

// 表单数据
const formValue = reactive({
  manufacturer: null,
  model: "",
  year: null,
  license_plate: "",
  mileage: null,
  inspection_expiry: null,
  color: null,
  fuel_type: null,
  engine_size: null,
  notes: "",
});

// 表单验证规则
const rules = {
  manufacturer: {
    required: true,
    message: "メーカーを選択してください",
    trigger: "blur",
  },
  model: {
    required: true,
    message: "車種を入力してください",
    trigger: "blur",
  },
  year: {
    required: true,
    message: "年式を選択してください",
    trigger: "blur",
  },
  license_plate: {
    required: true,
    message: "ナンバープレートを入力してください",
    trigger: "blur",
  },
  mileage: {
    required: true,
    message: "走行距離を選択してください",
    trigger: "blur",
  },
  inspection_expiry: {
    required: true,
    type: "number",
    message: "車検期限を選択してください",
    trigger: "blur",
  },
};

// 制造商选项
const manufacturerOptions = [
  { label: "トヨタ", value: "トヨタ" },
  { label: "ホンダ", value: "ホンダ" },
  { label: "日産", value: "日産" },
  { label: "マツダ", value: "マツダ" },
  { label: "スバル", value: "スバル" },
  { label: "スズキ", value: "スズキ" },
  { label: "三菱", value: "三菱" },
  { label: "レクサス", value: "レクサス" },
  { label: "ダイハツ", value: "ダイハツ" },
  { label: "輸入車", value: "輸入車" },
];

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
  { label: "ホワイト", value: "white" },
  { label: "ブラック", value: "black" },
  { label: "シルバー", value: "silver" },
  { label: "グレー", value: "gray" },
  { label: "レッド", value: "red" },
  { label: "ブルー", value: "blue" },
  { label: "グリーン", value: "green" },
  { label: "イエロー", value: "yellow" },
  { label: "ブラウン", value: "brown" },
  { label: "パープル", value: "purple" },
  { label: "その他", value: "other" },
];

// 燃料类型选项
const fuelTypeOptions = [
  { label: "ガソリン", value: "gasoline" },
  { label: "ディーゼル", value: "diesel" },
  { label: "ハイブリッド", value: "hybrid" },
  { label: "電気", value: "electric" },
  { label: "水素", value: "hydrogen" },
  { label: "その他", value: "other" },
];

// 返回上一页
function goBack() {
  // 检查是否是从预约流程中跳转过来的
  const reservationState = localStorage.getItem("reservation_state");

  if (reservationState) {
    const state = JSON.parse(reservationState);
    router.push(state.path || "/vehicles");
  } else {
    router.push("/vehicles");
  }
}

// 提交表单
async function handleSubmit() {
  submitting.value = true;

  try {
    await formRef.value?.validate();

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 假设注册成功
    message.success("車両を登録しました");

    // 检查是否是从预约流程中跳转过来的
    const reservationState = localStorage.getItem("reservation_state");

    if (reservationState) {
      localStorage.removeItem("reservation_state");
      const state = JSON.parse(reservationState);
      router.push(state.path || "/vehicles");
    } else {
      router.push("/vehicles");
    }
  } catch (error) {
    // 表单验证失败
    if (error instanceof Error) {
      message.error(error.message || "車両の登録に失敗しました");
    }
  } finally {
    submitting.value = false;
  }
}
</script>