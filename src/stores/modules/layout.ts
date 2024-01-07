import { defineStore } from "pinia"
import type {Languange} from '@/locales';
interface LayoutStore {
  elSize: "" | "large" | "default" | "small"
  silderStatus: boolean
  language: Languange
}

const Layout = defineStore({
  id: "layout",
  state: (): LayoutStore => ({
    elSize: "default",
    silderStatus: false,
    language: localStorage.getItem("language") || import.meta.env.VITE_LANGUAGE,
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
    setLanguage(e: Languange) {
      this.language = e
      localStorage.setItem("language", e)
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
        paths: ["elSize", "silderStatus"],
      },
    ],
  },
})

export default Layout
