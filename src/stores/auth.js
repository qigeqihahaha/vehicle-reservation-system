import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('user-token') || null,
    user: JSON.parse(localStorage.getItem('user-info')) || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  },
  
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('user-token', token)
    },
    
    setUser(user) {
      this.user = user
      localStorage.setItem('user-info', JSON.stringify(user))
    },
    
    // 模拟登录 - 修复参数处理
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 从传入的对象中获取email和password
        const { email, password } = credentials
        
        // 假设登录成功
        if (email === 'test@example.com' && password === 'password') {
          const token = 'fake-jwt-token'
          const user = {
            id: 1,
            email: email,
            first_name: '太郎',
            last_name: '田中',
            customer_id: 1
          }
          
          this.setToken(token)
          this.setUser(user)
          return true
        } else {
          throw new Error('メールアドレスまたはパスワードが正しくありません')
        }
      } catch (error) {
        this.error = error.message
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 模拟注册
    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 假设注册成功
        return {
          success: true,
          message: '認証メールを送信しました',
          user_id: 1
        }
      } catch (error) {
        this.error = error.message
        return { success: false, message: error.message }
      } finally {
        this.loading = false
      }
    },
    
    // 登出
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('user-token')
      localStorage.removeItem('user-info')
    }
  }
})