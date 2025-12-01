import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    // 服务信息
    service_type_id: null,
    service_name: '',
    duration_minutes: 0,
    base_price: 0,
    
    // 店铺信息
    store_id: null,
    store_name: '',
    store_address: '',
    
    // 日期时间
    reservation_date: '',
    reservation_time: '',
    estimated_end_time: '',
    
    // 车辆信息
    vehicle_id: null,
    vehicle_info: {
      license_plate: '',
      manufacturer: '',
      model: ''
    },
    
    // 代车信息
    needs_loaner: false,
    loaner_car_id: null,
    loaner_car_info: null,
    
    // 优惠券信息
    coupon_id: null,
    discount_amount: 0,
    final_price: 0
  }),
  
  getters: {
    isServiceSelected: (state) => !!state.service_type_id,
    isStoreSelected: (state) => !!state.store_id,
    isDateTimeSelected: (state) => !!state.reservation_date && !!state.reservation_time,
    isVehicleSelected: (state) => !!state.vehicle_id,
    
    // 计算总价
    totalPrice: (state) => {
      return state.base_price - state.discount_amount
    }
  },
  
  actions: {
    selectService(service) {
      this.service_type_id = service.id
      this.service_name = service.name
      this.duration_minutes = service.duration
      this.base_price = service.price
    },
    
    selectStore(store) {
      this.store_id = store.id
      this.store_name = store.name
      this.store_address = store.address
    },
    
    selectDateTime(date, time, endTime) {
      this.reservation_date = date
      this.reservation_time = time
      this.estimated_end_time = endTime
    },
    
    selectVehicle(vehicle) {
      this.vehicle_id = vehicle.id
      this.vehicle_info = {
        license_plate: vehicle.license_plate,
        manufacturer: vehicle.manufacturer,
        model: vehicle.model
      }
    },
    
    selectLoanerCar(needsLoaner, loanerCar = null) {
      this.needs_loaner = needsLoaner
      if (needsLoaner && loanerCar) {
        this.loaner_car_id = loanerCar.id
        this.loaner_car_info = {
          car_number: loanerCar.car_number,
          license_plate: loanerCar.license_plate
        }
      } else {
        this.loaner_car_id = null
        this.loaner_car_info = null
      }
    },
    
    applyCoupon(coupon) {
      if (coupon) {
        this.coupon_id = coupon.id
        this.discount_amount = coupon.discount_amount
        this.final_price = this.base_price - this.discount_amount
      } else {
        this.coupon_id = null
        this.discount_amount = 0
        this.final_price = this.base_price
      }
    },
    
    resetReservation() {
      this.$reset()
    }
  }
})