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
      if (this.navList.length === 0) {
        this.navList.push(route);
        this.setNavIndex(0);
      } else {
        let arr = this.navList.map((item) => {
          return item.fullPath;
        });
        if (!arr.includes(route.fullPath)) {
          this.navList.push(route);
          this.setNavIndex(arr.length);
        }
      }
    },
    removeNavList(routeIndex: number) {
      if (routeIndex === this.navList.length) {
        this.navIndex = routeIndex--;
      } else {
        this.navIndex = routeIndex;
      }

      this.navList.slice(routeIndex, 1);
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
