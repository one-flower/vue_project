import { createApp } from "vue"

import i18n from "@/locales"
import App from "@/App.vue"
import router from "@/router"
import { setupStore } from "@/stores"

// import { setupGlobDirectives } from '@/directives';

import "@/styles/index.scss"
import "element-plus/theme-chalk/el-message.css"
import "element-plus/theme-chalk/el-message-box.css"
import "virtual:svg-icons-register" //svg

const app = createApp(App)

app.use(router).use(i18n)

// 注册pinia
setupStore(app)
// 自定义指令
// setupGlobDirectives(app)
// 打印错误
// app.config.errorHandler = (err) => {
//   console.log("err", err);
// };
app.mount("#app")
