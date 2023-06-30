import { defineStore } from 'pinia'
import { login, menuQuery } from '@/api/user'
import router from '@/router'
import Layout from '@/layout/index.vue'
const modules = import.meta.glob('@/views/**/*.vue') //匹配views文件
import { handleTree } from '@/utils/index'

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
  menuList: any[]
}

export const UserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: '',
    account: '',
    name: '',
    headImg: '',
    sex: 0,
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
    setMenu(menuList: any[]) {
      this.menuList = menuList
    },
    resetState() {
      this.token = ''
    },

    /**
     * @description: 登录
     * @param {loginForm} loginForm username password code
     */
    async login(loginForm: loginForm): Promise<any> {
      return new Promise((resolve, reject) => {
        login(loginForm)
          .then((res) => {
            console.log(res,'sss');
            
            let data = res.data
            this.setToken(data.token)
            this.setAccount(data.account)
            this.setName(data.name)
            this.setHeadImg(data.headImg)
            this.setSex(data.sex)
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

    /**
     * @description: 获取菜单信息
     */
    async menuInfo(): Promise<any[]> {
      return new Promise((resolve, reject) => {
        menuQuery()
          .then((res) => {
            const setComponent = (view: string) => {
              // 路由懒加载
              for (const path in modules) {
                const dir = path.split('views')[1].split('.vue')[0]
                if (dir === view) {
                  return () => modules[path]()
                }
              }
            }
            let r = res.data.map((item: any) => {
              if (item.component) {
                if (item.component === 'Layout') {
                  item.component = Layout
                } else {
                  item.component = setComponent(item.component) // 导入组件
                }
              }
              item.meta = {
                title: item.title,
                icon: item.icon,
              }
              return item
            })
            let newRoute = handleTree(r, 'menuId', 'pid')
            console.log(newRoute);
            
            this.setMenu(newRoute)
            resolve(newRoute)
          })
          .catch((err) => {
            console.log(err, 'err')
            reject(err)
          })
      })
    },
  },
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [
      {
        storage: localStorage,
        paths: ['token', 'account', 'name', 'headImg', 'sex'],
      },
    ],
  },
})
