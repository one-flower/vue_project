const handleTree = (
  list: any[],
  idStr: string = "id",
  pidStr: string = "pid",
  childrenStr: string = "children",
): any[] => {
  const id: string = idStr.trim()
  const pid: string = pidStr.trim()
  const children: string = childrenStr.trim()
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
