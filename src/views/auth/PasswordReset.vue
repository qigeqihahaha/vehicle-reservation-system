<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
    <!-- 成功通知 -->
    <div v-if="emailSent" class="fixed top-16 left-0 right-0 flex justify-center z-10">
      <div class="bg-white rounded-lg shadow-md px-4 py-3 flex items-center max-w-md">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">パスワードリセット用のメールを送信しました</p>
        </div>
      </div>
    </div>

    <div class="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
      <div class="px-6 py-8 md:px-8">
        <div v-if="!emailSent">
          <div class="flex justify-center">
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          
          <h2 class="mt-6 text-center text-2xl font-bold text-gray-800">
            パスワードをリセット
          </h2>
          
          <p class="mt-2 text-center text-sm text-gray-600">
            登録されたメールアドレスを入力してください。<br>パスワードリセット用のリンクをお送りします。
          </p>
          
          <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            class="mt-8 space-y-6"
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
            
            <div>
              <n-button
                type="primary"
                block
                size="large"
                :loading="loading"
                class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                @click="handleSubmit"
              >
                リセットリンクを送信
              </n-button>
            </div>
          </n-form>
        </div>
        
        <div v-else>
          <div class="flex justify-center">
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          
          <h2 class="mt-6 text-center text-2xl font-bold text-gray-800">
            パスワードをリセット
          </h2>
          
          <div class="mt-8 text-center">
            <div class="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-800">メールを送信しました</h3>
            <p class="mt-2 text-sm text-gray-600">
              {{ formValue.email }} 宛にパスワードリセット用のリンクを送信しました。<br>
              メールをご確認の上、リンクをクリックしてパスワードをリセットしてください。
            </p>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
            ログイン画面に戻る
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'

const message = useMessage()
const loading = ref(false)
const emailSent = ref(false)

// フォームデータ
const formValue = reactive({
  email: ''
})

// バリデーションルール
const rules = {
  email: [
    { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' },
    { type: 'email', message: '有効なメールアドレスを入力してください', trigger: 'blur' }
  ]
}

const formRef = ref(null)

// フォーム送信処理
async function handleSubmit() {
  loading.value = true
  
  try {
    await formRef.value?.validate()
    
    // ここでAPIリクエストを送信
    // 実際の実装では、パスワードリセットのAPIを呼び出す
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    emailSent.value = true
    message.success('パスワードリセット用のメールを送信しました')
  } catch (e) {
    // バリデーションエラー
  } finally {
    loading.value = false
  }
}
</script>