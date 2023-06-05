import { _RouteRecordBase } from "vue-router";

interface metaType {
  sys?: boolean;
  hidden?: boolean;
  title?: string;
  icon?: string;
}
declare module "vue-router" {
  interface _RouteRecordBase {
    menuId: number;
    meta: metaType;
  }
}
