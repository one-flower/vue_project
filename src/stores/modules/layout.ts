import { Language } from "element-plus/es/locale"
import { defineStore } from "pinia"
interface LayoutStore {
  elSize: "" | "large" | "default" | "small"
  silderStatus: boolean
  language: string
}

const Layout = defineStore({
  id: "layout",
  state: (): LayoutStore => ({
    elSize: "default",
    silderStatus: false,
    language: "zhCn",
  }),
  getters: {},
  actions: {
    // 更改尺寸
    setSize(e: "" | "large" | "default" | "small") {
      this.elSize = e
    },
    // aside 伸缩
    changeAsideStatus() {
      this.silderStatus = !this.silderStatus
    },
    // 语言
    setLanguage(e: string) {
      this.language = e
    },
    getLanguage() {
      return this.language
    },
  },
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [
      {
        storage: sessionStorage,
        paths: ["elSize", "silderStatus"],
      },
    ],
  },
})

export default Layout
