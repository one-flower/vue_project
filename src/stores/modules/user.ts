import { defineStore } from "pinia"
import { login } from "@/api/sys/user"
import { menuQuery } from "@/api/sys/menu"
import Layout from "@/layout/index.vue"
import { handleTree } from "@/utils"

interface loginForm {
  username: string
  password: string
  // code: string
}

interface UserState {
  account: string
  name: string
  avatarUrl: string
  token: string
  menuList: any[]
}

const User = defineStore({
  id: "user",
  state: (): UserState => ({
    account: "",
    name: "",
    avatarUrl: "",
    token: "",
    menuList: [],
  }),
  getters: {
    getToken(): string {
      return this.token
    },
  },
  actions: {
    reset() {
      this.$reset()
    },
    setAccount(account: string) {
      this.account = account
    },
    setName(name: string) {
      this.name = name
    },
    setavatarUrl(avatarUrl: string) {
      this.avatarUrl = avatarUrl
    },
    setToken(token: string) {
      this.token = token
    },
    setMenu(menuList: any[]) {
      this.menuList = menuList
    },
    /**
     * @description: 登录
     * @param {loginForm} loginForm username password
     *
     */
    async login(loginForm: loginForm): Promise<any> {
      return new Promise((resolve, reject) => {
        login(loginForm)
          .then((res: UserState) => {
            this.setAccount(res.account)
            this.setName(res.name)
            this.setavatarUrl(res.avatarUrl)
            this.setToken(res.token)
            resolve(true)
          })
          .catch((err: any) => {
            console.log(err, "err")
            reject(err)
          })
      })
    },
    /**
     * @description: 登出
     */
    async logout(): Promise<boolean> {
      return new Promise(resolve => {
        this.$reset()
        // 路由表重置
        location.href = "/login"
        resolve(true)
      })
    },
    /**
     * @description: 获取菜单信息
     */
    async menuInfo(): Promise<any[]> {
      return new Promise((resolve, reject) => {
        menuQuery({})
          .then(res => {
            const modules = import.meta.glob("@/views/**/*.vue") //匹配views文件
            const setComponent = (view: string) => {
              // 路由懒加载
              for (const path in modules) {
                const dir = path.split("views")[1].split(".vue")[0]
                if (dir === view) {
                  return () => modules[path]()
                }
              }
            }

            const routeList = res.map((item: any) => {
              if (item.component) {
                if (item.component === "Layout") {
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
            const newRoute = handleTree(routeList, { id: "menuId" })

            this.setMenu(newRoute)
            resolve(newRoute)
          })
          .catch(err => {
            console.log(err, "err")
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
        storage: sessionStorage,
        paths: ["account", "name", "avatarUrl", "token"],
      },
    ],
  },
})
export default User
