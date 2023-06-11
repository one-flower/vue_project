import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)

import '@/styles/index.scss'
// import 'element-plus/theme-chalk/el-message.css'
// import 'element-plus/theme-chalk/el-message-box.css'
import 'virtual:svg-icons-register' //svg

const app = createApp(App)

app.use(router).use(pinia).mount('#app')