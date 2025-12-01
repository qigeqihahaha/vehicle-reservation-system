<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
      <div class="px-6 py-8 md:px-8">
        <div class="flex justify-center mb-6">
          <img src="@/assets/logo.svg" alt="Logo" class="h-16" />
        </div>
        
        <h2 class="text-center text-3xl font-bold text-gray-800 mb-2">
          ログイン
        </h2>
        <p class="text-center text-sm text-gray-600 mb-8">
          車両メンテナンスサービスへようこそ
        </p>
        
        <n-form
          ref="formRef"
          :model="formValue"
          :rules="rules"
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <n-form-item path="email" label="メールアドレス">
            <n-input
              v-model:value="formValue.email"
              placeholder="example@mail.com"
              size="large"
              class="rounded-lg"
            >
              <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </template>
            </n-input>
          </n-form-item>
          
          <n-form-item path="password" label="パスワード">
            <n-input
              v-model:value="formValue.password"
              type="password"
              placeholder="パスワードを入力"
              size="large"
              show-password-on="click"
              class="rounded-lg"
            >
              <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </template>
            </n-input>
          </n-form-item>
          
          <div class="flex items-center justify-between">
            <n-checkbox v-model:checked="formValue.remember">
              <span class="text-sm text-gray-600">ログイン状態を保持</span>
            </n-checkbox>
            
            <router-link to="/password-reset" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
              パスワードを忘れた方
            </router-link>
          </div>
          
          <div>
            <n-button
              type="primary"
              block
              size="large"
              :loading="loading"
              class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              @click="handleSubmit"
            >
              ログイン
            </n-button>
          </div>
        </n-form>
        
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            アカウントをお持ちでない方は
            <router-link to="/register" class="text-blue-600 hover:text-blue-800 font-medium">
              新規会員登録
            </router-link>
          </p>
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
  email: '',
  password: '',
  remember: false
})

// バリデーションルール
const rules = {
  email: [
    { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' },
    { type: 'email', message: '有効なメールアドレスを入力してください', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'パスワードを入力してください', trigger: 'blur' }
  ]
}

const formRef = ref(null)

// フォーム送信処理
async function handleSubmit() {
  loading.value = true
  
  try {
    await formRef.value?.validate()
    
    const success = await authStore.login({
      email: formValue.email,
      password: formValue.password,
      remember: formValue.remember
    })
    
    if (success) {
      message.success('ログインしました')
      router.push('/')
    } else {
      message.error(authStore.error || 'メールアドレスまたはパスワードが正しくありません')
    }
  } catch (e) {
    // バリデーションエラー
  } finally {
    loading.value = false
  }
}
</script>