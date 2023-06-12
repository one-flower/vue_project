import { defineStore } from "pinia";
interface LayoutStore {
  elSize: "" | "large" | "default" | "small";
  silderStatus: boolean;
  navIndex: number;
  navList: any[];
}

export const LayoutStore = defineStore({
  id: "layout",
  state: (): LayoutStore => ({
    elSize: "default",
    silderStatus: false,
    navIndex: 0,
    navList: [],
  }),
  getters: {},
  actions: {
    // 更改尺寸
    changeSize(e: "" | "large" | "default" | "small") {
      this.elSize = e;
    },
    // aside 伸缩
    changeAsideStatus() {
      this.silderStatus = !this.silderStatus;
    },
    setNavIndex(index: number) {
      this.navIndex = index;
    },
    // nav 中 tag导航块
    setNavList(route: any) {
      console.log(route, this.navList);

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
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [
      {
        storage: sessionStorage,
        paths: ["elSize", "silderStatus", "navIndex", "navList"],
      },
    ],
  },
});
