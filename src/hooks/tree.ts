/**
 * @desc 多选树，父子不关联关系维护
 * @param { 'data, check, oldCheck' } event 选中数据 选中状态 未选中状态
 * @param {ref<InstanceType<typeof ElTree>>} treeRef 树节点ref
 * @param {string} id
 * @param {string} pid
 */

const treeCheckChange = (event: any, treeRef: any, id: string = "id", pid: string = "parentId") => {
  const { data, check } = event
  const tId = id
  const tPid = pid

  if (check === false) {
    // 判断子节
    if (data.children) {
      // 循环子集将他们的选中取消
      data.children.forEach((item: any) => {
        treeRef.value!.setChecked(item[tId], false, false)
      })
    }
  } else {
    //否则(为选中状态)
    //判断父节点id是否为空
    if (data.parentId !== -1) {
      //如果不为空则将其选中
      treeRef.value!.setChecked(data[tPid], true, false)
    }
  }
}

export { treeCheckChange }
