<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50 px-4">
    <div class="w-full max-w-600px bg-white rounded-lg shadow-md p-6">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-semibold">車両メンテナンス予約</h1>
      </div>
      
      <n-result
        status="success"
        title="会員登録ありがとうございます"
        description="ご登録いただいたメールアドレスに認証メールを送信しました。メール内のリンクをクリックして、登録を完了してください。"
      >
        <template #footer>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <n-button @click="resendVerificationEmail" :loading="resending" class="sm:w-auto w-full">
              認証メールを再送信
            </n-button>
            <n-button type="primary" @click="goToLogin" class="sm:w-auto w-full">
              ログイン画面へ
            </n-button>
          </div>
        </template>
      </n-result>
      
      <div class="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 class="font-medium text-lg mb-3">メールが届かない場合</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>迷惑メールフォルダをご確認ください</li>
          <li>メールアドレスが正しいことをご確認ください</li>
          <li>数分経ってもメールが届かない場合は、再送信ボタンをクリックしてください</li>
        </ul>
      </div>
      
      <div class="mt-6 text-center text-gray-600">
        <p>
          お問い合わせは
          <a href="mailto:support@example.com" class="text-blue-600 hover:underline">support@example.com</a>
          までご連絡ください
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NResult, NButton } from 'naive-ui'

const router = useRouter()
const message = useMessage()

const resending = ref(false)

// 重新发送验证邮件
async function resendVerificationEmail() {
  resending.value = true
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 假设发送成功
    message.success('認証メールを再送信しました')
  } catch (error) {
    message.error('メールの再送信に失敗しました。もう一度お試しください。')
  } finally {
    resending.value = false
  }
}

function goToLogin() {
  router.push('/login')
}
</script>