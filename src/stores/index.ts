import { UserStore } from "./modules/user";
import { LayoutStore } from "./modules/layout";

export interface appStore {
  UserStore: ReturnType<typeof UserStore>;
  LayoutStore: ReturnType<typeof LayoutStore>;
}

export default function appStore() {
  return {
    UserStore: UserStore(),
    LayoutStore: LayoutStore(),
  }
}