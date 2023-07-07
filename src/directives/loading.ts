// import { createLoading } from '@/components/Loading/index.vue'
// import type { Directive, App } from 'vue'

// const loadingDirective: Directive = {
//   mounted(el, binding) {
//     const tip = el.getAttribute('loading-tip')
//     const background = el.getAttribute('loading-background')
//     const size = el.getAttribute('loading-size')
//     const fullscreen = !!binding.modifiers.fullscreen
//     const instance = createLoading(
//       {
//         tip,
//         background,
//         size: size || 'large',
//         loading: !!binding.value,
//         absolute: !fullscreen,
//       },
//       fullscreen ? document.body : el
//     )
//     el.instance = instance
//   },
//   updated(el, binding) {
//     const instance = el.instance
//     if (!instance) return
//     instance.setTip(el.getAttribute('loading-tip'))
//     if (binding.oldValue !== binding.value) {
//       instance.setLoading?.(binding.value && !instance.loading)
//     }
//   },
//   unmounted(el) {
//     el?.instance?.close()
//   },
// }

// export function setupLoadingDirective(app: App) {
//   app.directive('loading', loadingDirective)
// }

// export default loadingDirective
import Loading from '@/components/Loading/index.vue'
import type { Directive, App } from 'vue'
const loadingDirective: Directive = {
  mounted(el, binding) {
    console.log('---')

    const app = createApp(Loading)

    //动态创建一个div节点，将app挂载在div上,我们的 loading 组件将替换此 div 标签的 innerHTML
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      // v-loading传过来的值储存在 binding.value 中
      // append(el)
      el.appendChild(el.instance.$el)
    }
  },
  updated(el, binding) {
    console.log('===');
    
    el.removeChild(el.instance.$el)
  },
}

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective)
}

export default loadingDirective // 导出
