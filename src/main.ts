import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

import '@/styles/index.scss'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'virtual:svg-icons-register' //svg

const app = createApp(App).use(pinia)

app.use(router).mount('#app')