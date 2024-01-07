import { createI18n } from "vue-i18n"
// 导入语言
import zhCnLocal from "element-plus/es/locale/lang/zh-cn"
import enLocal from "element-plus/es/locale/lang/en"
// 本地语言
import zhCn from "./zhCn"
import en from "./en"

export const messages = {
  "zh-cn": {
    ...zhCnLocal,
    ...zhCn,
  },
  en: {
    ...enLocal,
    ...en,
  },
}
type Languange = "zh-cn" | "en"
export type { Languange }
// 创建 i18n
export const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局模式，可以直接使用 $t
  locale: localStorage.getItem("language") || import.meta.env.VITE_LANGUAGE,
  messages: messages,
})
