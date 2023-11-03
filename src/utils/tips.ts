type msgType = "success" | "warning" | "error" | "info"

class Toast {
  static duration: number = 3000
  static showClose: boolean = false
  static show(msg: string, type: msgType): void {
    ElMessage({
      message: msg,
      type: type,
      duration: this.duration,
      showClose: this.showClose,
    })
  }
  success(msg: string) {
    return Toast.show(msg, "success")
  }
  warning(msg: string) {
    return Toast.show(msg, "warning")
  }
  error(msg: string) {
    return Toast.show(msg, "error")
  }
  info(msg: string) {
    return Toast.show(msg, "info")
  }
}
/**
 * @desc el提示
 * @param {string} msg 提示信息
 */
export const toast = new Toast()

/**
 * @desc el confirm确认框
 * @param {string} content 内容
 * @param {string} title 标题
 * @param {msgType} type 类型
 * @param {string} confirmButtonText 确认text
 * @param {string} cancelButtonText 取消text
 * @returns Promise<boolean>
 */
export function confirm(
  content: string = "",
  title: string = "提示",
  type: msgType = "warning",
  confirmButtonText: string = "确认",
  cancelButtonText: string = "取消",
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(content, title, {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      type: type,
    })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}
