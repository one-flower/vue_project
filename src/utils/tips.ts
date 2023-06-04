import { ElMessage } from 'element-plus'
type msgType = 'success' | 'warning' | 'error' | 'info'
/**
 * @desc el提示
 * @param message 提示信息
 * @param type 提示类，默认success
 * @param duration 时间，默认3s
 */
export function toast(
  message: string,
  type: msgType = 'success',
  duration: number = 3000,
  showClose: boolean = false
) {
  ElMessage({
    message: message,
    type: type,
    duration: duration,
    showClose: showClose,
  })
}
