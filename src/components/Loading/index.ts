import { createVNode, render } from "vue"
import myLoad from "./loading.vue"

// 虚拟dom
const show = ref(false)
const tip = ref("加载中...")
const vm = createVNode(myLoad, { show: show, tip: tip })

render(vm, document.createElement("div"))

const load = {
  /**
   * @desc 打开loading
   * @param title 提示内容
   * @param target loading容器，默认body
   */
  open(title: any = "加载中", flag: boolean = true) {
    let targetNode: Element = document.querySelector(".appmain-container") || document.body
    if (!flag) targetNode = document.body
    show.value = true
    tip.value = title
    if (!vm || !vm.el) {
      return;
    }
    targetNode.appendChild(vm.el as Element)
  },
  close(s: number = 1) {
    setTimeout(() => {
      if (vm?.el && vm.el.parentNode) {
        vm.el.parentNode.removeChild(vm.el);
      }
    }, s * 1000);
  },
}
export default load
