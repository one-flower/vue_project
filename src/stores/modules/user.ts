import { defineStore } from "pinia"
import { login } from "@/api/sys/user"

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
}

const User = defineStore({
  id: "user",
  state: (): UserState => ({
    account: "",
    name: "",
    avatarUrl: "",
    token: "",
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
