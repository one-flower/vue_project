import { _RouteRecordBase } from "vue-router"

declare module "vue-router" {
  interface _RouteRecordBase {
    menuId: number
  }

  interface RouteMeta {
    title?: string
    icon?: string
  }
}
