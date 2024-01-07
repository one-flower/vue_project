import type { App } from "vue"
import { createPinia } from "pinia"
import piniaPersist from "pinia-plugin-persist"
const pinia = createPinia()
pinia.use(piniaPersist)

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

// modules 统一管理
import LayoutStore from "./modules/layout"
import UserStore from "./modules/user"

export { UserStore, LayoutStore }
