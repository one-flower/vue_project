import { createVNode, render } from "vue"
import myLoad from "./loading.vue"

// 虚拟dom
const show = ref(false)
const tip = ref("加载中...")
const vm = createVNode(myLoad, { show: show, tip: tip })
render(vm, document.createElement("div"))

const targetNode = ref<Element>(document.body)
const load = {
  /**
   * @desc 打开loading
   * @param title 提示内容
   * @param target loading容器，默认body
   */
  open(title: any = "加载中", target: Element = targetNode.value) {
    show.value = true
    tip.value = title
    if (!vm || !vm.el) {
      return
    }
    target.appendChild(vm.el as Element)
  },
  close(s: number = 1) {
    setTimeout(() => {
      if (vm?.el && vm.el.parentNode) {
        vm.el.parentNode.removeChild(vm.el)
      }
    }, s * 1000)
  },
  setTarget(target: Element) {
    targetNode.value = target || document.body
  },
}
export default load
