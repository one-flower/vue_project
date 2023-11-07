type msgType = "success" | "warning" | "error" | "info"

/**
 * @desc el消息提示
 * @met
 */
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
 * @method success 成功
 * @method warning 警告
 * @method error 错误
 * @method info 提示
 */
export const toast = new Toast()

interface BoxOption {
  title?: string
  type?: msgType
  confirmText?: string
  cancelText?: string
}

/**
 * @desc el confirm确认框
 * @param {string} content 内容
 * @param {boxOption} boxOption title 标题 type 类型 confirmText 确认按钮文字 cancelText 取消按钮文字
 * @returns Promise<boolean>
 */
export function toastBox(content: string = "", boxOption: BoxOption = {}): Promise<boolean> {
  const { title = "提示", type = "warning", confirmText = "确认", cancelText = "取消" } = boxOption

  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(content, title, {
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
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
