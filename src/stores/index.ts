import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

// modules 统一管理
import { UserStore } from './modules/user'
import { LayoutStore } from './modules/layout'

export default function appStore() {
  return {
    UserStore: UserStore(),
    LayoutStore: LayoutStore(),
  }
}