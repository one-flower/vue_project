interface OptionTree {
  id?: string
  pid?: string
  children?: string
}
/**
 * @desc 递归父子关系数数组
 * @param { any[] } list 数据源
 * @param { OptionTree } optionTree 配置项 id pid children
 * @returns { Array } any[]
 */
const handleTree = (list: any[], optionTree: OptionTree = {}): any[] => {
  const { id = "id", pid = "pid", children = "children" } = optionTree

  const endList: any[] = []
  const obj: any = {}
  const startList: any[] = []

  // 除去无用的顶级父类，放入obj
  list.map(item => {
    if (item[id] !== -1) {
      obj[item[id]] = item
      startList.push(item)
    }
  })

  startList.forEach(item => {
    const fObj = obj[item[pid]]
    if (fObj) {
      ;(fObj[children] || (fObj[children] = [])).push(item)
    } else {
      endList.push(item)
    }
  })

  return endList
}

export { handleTree }
