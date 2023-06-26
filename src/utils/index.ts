const handleTree = (
  list: any[],
  idStr: string = 'id',
  pidStr: string = 'pid',
  childrenStr: string = 'children'
) => {
  let arr = list
  let id: string = idStr
  let pid: string = pidStr
  let children: string = childrenStr
  let endList: any[] = []
  let obj: any = {}
  list.forEach((item) => {
    obj[item[id]] = item
  })

  list.forEach((item) => {
    let fObj = obj[item[pid]]
    if (fObj) {
      !fObj[children] && (fObj[children] = [])
      fObj[children].push(item)
    } else {
      endList.push(item)
    }
  })

  return endList
}

export { handleTree }
