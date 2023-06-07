import { _RouteRecordBase } from "vue-router";

interface metaType {
  title?: string;
  icon?: string;
}
declare module "vue-router" {
  interface _RouteRecordBase {
    menuId: number;
    meta: metaType;
  }
}
