<template>
  <n-config-provider :theme="currentTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <div class="min-h-screen flex flex-col bg-gray-50">
              <header-component v-if="!isAuthPage" />
              <main class="flex-grow p-4 md:p-6">
                <slot></slot>
              </main>
              <footer-component v-if="!isAuthPage" />
            </div>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  NConfigProvider, 
  NLoadingBarProvider, 
  NDialogProvider, 
  NNotificationProvider,
  NMessageProvider 
} from 'naive-ui'
import { themeConfig, themeOverrides } from '@/theme'
import HeaderComponent from './Header.vue'
import FooterComponent from './Footer.vue'

const route = useRoute()

// 判断是否是认证页面
const isAuthPage = computed(() => {
  return ['Login', 'Register', 'PasswordReset', 'EmailVerification'].includes(route.name)
})

// 使用浅色主题
const currentTheme = computed(() => themeConfig.light)
</script>