import { defineStore } from "pinia";
interface LayoutStore {
  navList: any[];
  silderStatus: boolean;
  elSize: "" | "large" | "default" | "small";
}

export const LayoutStore = defineStore({
  id: "layout",
  state: (): LayoutStore => ({
    navList: [],
    silderStatus: false,
    elSize: "default",
  }),
  getters: {},
  actions: {
    // aside 伸缩
    changeAsideStatus() {
      this.silderStatus = !this.silderStatus;
    },
    // 更改尺寸
    changeSize(e: "" | "large" | "default" | "small") {
      this.elSize = e;
    },
    // nav 中 tag导航块
    setNavList(route: any) {
      if (this.navList.length === 0) this.navList.push(route);
      let arr = this.navList.map((item) => {
        return item.fullPath;
      });
      if (!arr.includes(route.fullPath)) this.navList.push(route);
    },
    removeNavList(route: any) {
      this.navList = this.navList.filter((item) => {
        return item.fullPath !== route.fullPath;
      });
    },
  },
});
