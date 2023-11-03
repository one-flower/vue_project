/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ROUTER_NAME: string //router前缀
  readonly VITE_BASE_API: string //api前缀
  readonly VITE_BASE_URL: string //url代理
  readonly VITE_TITLE: string //名称
}

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

