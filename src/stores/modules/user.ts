import { defineStore } from 'pinia'
import pinia from '@/stores'
// import { getToken, setToken, removeToken } from '/@/utils/auth'
import router from '@/router'

interface UserState {
  token: string
  auths: string[]
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // token
    token: '',
    // auths
    auths: [],
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info ?? '' // for null or undefined value
      // setToken(info)
    },
    setAuth(auths: string[]) {
      this.auths = auths
    },
    resetState() {
      this.token = ''
      this.auths = []
    },
    /**
     * @description: login
     */
    async login() {},

    /**
     * @description: logout
     */
    async logout() {
      this.resetState()
      router.replace('/login')
      // 路由表重置
      location.reload()
    },
  },
})