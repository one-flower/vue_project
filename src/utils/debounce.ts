import { toast } from "./tips"
/**
 * @desc 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 */
const debounce = (func: any, wait: number = 1, immediate: boolean = false) => {
  let timer: NodeJS.Timeout | null
  let context: unknown
  let args: any[] | null
  // 延迟执行函数
  const later = () =>
    setTimeout(() => {
      // 延迟函数执行完毕，清空缓存的定时器序号
      timer = null
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait * 1000)

  // 这里返回的函数是每次实际调用的函数
  return function (_this: unknown, ...params: any[]) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later()
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(_this, params)
      } else {
        context = _this
        args = params
      }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
    } else {
      toast.warning("请勿频繁点击")
      clearTimeout(timer)
      timer = later()
    }
  }
}

export default debounce
