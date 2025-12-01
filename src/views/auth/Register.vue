<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
      <!-- 左側：登録フォーム -->
      <div class="flex flex-col md:flex-row">
        <div class="w-full md:w-1/2 p-6 md:p-8">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">新規会員登録</h2>
            <p class="text-sm text-gray-600">アカウントを作成して、車両メンテナンスサービスを始めましょう</p>
          </div>
          
          <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            class="space-y-4"
            @submit.prevent="handleSubmit"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <n-form-item path="lastName" label="姓">
                <n-input
                  v-model:value="formValue.lastName"
                  placeholder="田中"
                  class="rounded-lg"
                />
              </n-form-item>
              
              <n-form-item path="firstName" label="名">
                <n-input
                  v-model:value="formValue.firstName"
                  placeholder="太郎"
                  class="rounded-lg"
                />
              </n-form-item>
            </div>
            
            <n-form-item path="email" label="メールアドレス">
              <n-input
                v-model:value="formValue.email"
                placeholder="example@mail.com"
                class="rounded-lg"
              >
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </template>
              </n-input>
            </n-form-item>
            
            <n-form-item path="phone" label="電話番号">
              <n-input
                v-model:value="formValue.phone"
                placeholder="090-1234-5678"
                class="rounded-lg"
              >
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </template>
              </n-input>
            </n-form-item>
            
            <n-form-item path="password" label="パスワード">
              <n-input
                v-model:value="formValue.password"
                type="password"
                placeholder="8文字以上で入力"
                show-password-on="click"
                class="rounded-lg"
              >
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </template>
              </n-input>
            </n-form-item>
            
            <n-form-item path="confirmPassword" label="パスワード（確認）">
              <n-input
                v-model:value="formValue.confirmPassword"
                type="password"
                placeholder="パスワードを再入力"
                show-password-on="click"
                class="rounded-lg"
              >
                <template #prefix>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </template>
              </n-input>
            </n-form-item>
            
            <div class="flex items-start">
              <n-checkbox v-model:checked="formValue.agreeTerms">
                <span class="text-xs text-gray-600">
                  <a href="#" class="text-blue-600 hover:text-blue-800">利用規約</a>
                  および
                  <a href="#" class="text-blue-600 hover:text-blue-800">プライバシーポリシー</a>
                  に同意します
                </span>
              </n-checkbox>
            </div>
            
            <div>
              <n-button
                type="primary"
                block
                :loading="loading"
                class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                @click="handleSubmit"
              >
                登録する
              </n-button>
            </div>
          </n-form>
          
          <div class="mt-4 text-center">
            <p class="text-xs text-gray-600">
              すでにアカウントをお持ちですか？
              <router-link to="/login" class="text-blue-600 hover:text-blue-800 font-medium">
                ログイン
              </router-link>
            </p>
          </div>
        </div>
        
        <!-- 右側：説明部分 -->
        <div class="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 relative">
          <div class="h-full flex flex-col justify-between">
            <div>
              <div class="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h1 class="text-2xl font-bold text-gray-800 mb-2">会員登録のメリット</h1>
              <p class="text-sm text-gray-600 mb-6">アカウントを作成して、様々な特典をご利用ください</p>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-base font-medium text-gray-800">予約履歴の管理</h3>
                  <p class="mt-1 text-xs text-gray-600">過去のメンテナンス履歴を確認でき、次回の予定も立てやすくなります</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-base font-medium text-gray-800">愛車情報の管理</h3>
                  <p class="mt-1 text-xs text-gray-600">車両情報を登録しておくことで、次回予約時の手続きがスムーズに</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 class="text-base font-medium text-gray-800">特別割引クーポン</h3>
                  <p class="mt-1 text-xs text-gray-600">会員限定の特別割引やキャンペーンをご利用いただけます</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NForm, NFormItem, NInput, NCheckbox, NButton } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

const loading = ref(false)

// フォームデータ
const formValue = reactive({
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeTerms: false
})

// バリデーションルール
const rules = {
  lastName: [
    { required: true, message: '姓を入力してください', trigger: 'blur' }
  ],
  firstName: [
    { required: true, message: '名を入力してください', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' },
    { type: 'email', message: '有効なメールアドレスを入力してください', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'パスワードを入力してください', trigger: 'blur' },
    { min: 8, message: 'パスワードは8文字以上で入力してください', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'パスワードを再入力してください', trigger: 'blur' },
    {
      validator: (rule, value) => value === formValue.password,
      message: 'パスワードが一致しません',
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: '電話番号を入力してください', trigger: 'blur' },
    { pattern: /^[0-9\-]+$/, message: '有効な電話番号を入力してください', trigger: 'blur' }
  ],
  agreeTerms: [
    {
      validator: (rule, value) => value === true,
      message: '利用規約に同意する必要があります',
      trigger: 'change'
    }
  ]
}

const formRef = ref(null)

// フォーム送信処理
async function handleSubmit() {
  loading.value = true
  
  try {
    await formRef.value?.validate()
    
    const success = await authStore.register({
      last_name: formValue.lastName,
      first_name: formValue.firstName,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone
    })
    
    if (success) {
      message.success('会員登録が完了しました')
      router.push('/login')
    } else {
      message.error(authStore.error || '会員登録に失敗しました')
    }
  } catch (e) {
    // バリデーションエラー
  } finally {
    loading.value = false
  }
}
</script>