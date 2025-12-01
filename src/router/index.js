import { createRouter, createWebHistory } from 'vue-router'

// 认证相关页面
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import PasswordReset from '../views/auth/PasswordReset.vue'
import EmailVerification from '../views/auth/EmailVerification.vue'

// 首页
import Home from '../views/Home.vue'

// 预约相关页面
import ServiceSelection from '../views/reservation/ServiceSelection.vue'
import StoreSelection from '../views/reservation/StoreSelection.vue'
import DateTimeSelection from '../views/reservation/DateTimeSelection.vue'
import VehicleSelection from '../views/reservation/VehicleSelection.vue'
import LoanerSelection from '../views/reservation/LoanerSelection.vue'
import CouponSelection from '../views/reservation/CouponSelection.vue'
import ReservationConfirmation from '../views/reservation/ReservationConfirmation.vue'
import ReservationComplete from '../views/reservation/ReservationComplete.vue'
import ReservationList from '../views/reservation/ReservationList.vue'
import ReservationDetail from '../views/reservation/ReservationDetail.vue'
import ReservationCancel from '../views/reservation/ReservationCancel.vue'

// 车辆相关页面
import VehicleList from '../views/vehicle/VehicleList.vue'
import VehicleRegister from '../views/vehicle/VehicleRegister.vue'
import VehicleEdit from '../views/vehicle/VehicleEdit.vue'

// 个人中心页面
import MyPage from '../views/mypage/MyPage.vue'

// 店铺信息页面
import StoreList from '../views/store/StoreList.vue'

const routes = [
  // 认证路由
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: PasswordReset
  },
  {
    path: '/email-verification',
    name: 'EmailVerification',
    component: EmailVerification
  },
  
  // 首页
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  // 预约路由
  {
    path: '/reservation/service',
    name: 'ServiceSelection',
    component: ServiceSelection
  },
  {
    path: '/reservation/store',
    name: 'StoreSelection',
    component: StoreSelection
  },
  {
    path: '/reservation/datetime',
    name: 'DateTimeSelection',
    component: DateTimeSelection
  },
  {
    path: '/reservation/vehicle',
    name: 'VehicleSelection',
    component: VehicleSelection
  },
  {
    path: '/reservation/loaner',
    name: 'LoanerSelection',
    component: LoanerSelection
  },
  {
    path: '/reservation/coupon',
    name: 'CouponSelection',
    component: CouponSelection
  },
  {
    path: '/reservation/confirm',
    name: 'ReservationConfirmation',
    component: ReservationConfirmation
  },
  {
    path: '/reservation/complete',
    name: 'ReservationComplete',
    component: ReservationComplete
  },
  {
    path: '/reservations',
    name: 'ReservationList',
    component: ReservationList
  },
  {
    path: '/reservations/:id',
    name: 'ReservationDetail',
    component: ReservationDetail
  },
  {
    path: '/reservations/:id/cancel',
    name: 'ReservationCancel',
    component: ReservationCancel
  },
  
  // 车辆路由
  {
    path: '/vehicles',
    name: 'VehicleList',
    component: VehicleList
  },
  {
    path: '/vehicles/register',
    name: 'VehicleRegister',
    component: VehicleRegister
  },
  {
    path: '/vehicles/:id/edit',
    name: 'VehicleEdit',
    component: VehicleEdit
  },
  
  // 个人中心路由
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  
  // 店铺信息路由
  {
    path: '/stores',
    name: 'StoreList',
    component: StoreList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 模拟认证检查
  const isAuthenticated = localStorage.getItem('user-token')
  
  // 需要认证的路由
  const requiresAuth = !['Login', 'Register', 'PasswordReset', 'EmailVerification'].includes(to.name)
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router