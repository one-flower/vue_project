import { defineStore } from 'pinia'
import { login } from '@/api/user'
import router from '@/router'
import { toast } from '@/utils/tips'
import type { RouteRecordRaw } from 'vue-router'

interface loginForm {
  username: string
  password: string
  code: string
}

interface UserState {
  token: string
  account: string
  name: string
  headImg: string
  sex: number
  menuIds: number[]
  menuList: RouteRecordRaw[]
}

export const UserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: '',
    account: '',
    name: '',
    headImg: '',
    sex: 0,
    menuIds: [],
    menuList: [],
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info
    },
    setAccount(account: string) {
      this.account = account
    },
    setName(name: string) {
      this.name = name
    },
    setHeadImg(headImg: string) {
      this.headImg = headImg
    },
    setSex(sex: number) {
      this.sex = sex
    },
    setMenuIds(menuIds: number[]) {
      this.menuIds = menuIds
    },
    setMenuList(menuList: RouteRecordRaw[]) {
      this.menuList = menuList
    },
    resetState() {
      this.token = ''
    },
    /**
     * @description: 登录
     */
    async login(loginForm: loginForm): Promise<any> {
      return new Promise((resolve, reject) => {
        login(loginForm)
          .then((res) => {
            let data = res.data
            this.setToken(data.token)
            this.setAccount(data.account)
            this.setName(data.name)
            this.setHeadImg(data.headImg)
            this.setSex(data.sex)
            this.setMenuIds(data.menuIds)
            resolve(true)
          })
          .catch((err) => {
            console.log(err, 'err')
            reject(err)
          })
      })
    },

    /**
     * @description: 登出
     */
    async logout() {
      this.resetState()
      router.replace('/login')
      // 路由表重置
      location.reload()
    },
  },
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [
      {
        storage: sessionStorage,
        paths: ['token', 'account', 'name', 'headImg', 'sex', 'menuIds'],
      },
    ],
  },
})
