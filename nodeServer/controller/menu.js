const { getDb, saveDb } = require('@db/index')
const md5 = require('@util/md5')
const { format } = require('@util/index')
// 创建
exports.add = async (req, res, next) => {
  try {
    let body = req.body

    const db = await getDb()
    const lastIndex = db.menu[db.menu.length - 1]
    const id = lastIndex ? lastIndex.id + 1 : 1
    const data = {
      id: id,
      menuId: body.menuId,
      pid: body.pid || -1,
      title: body.title || null,
      icon: body.icon || null,
      path: body.path || null,
      component: body.component || null,
      permission: body.permission || null,
      createdTime: format(Date.now()),
      updateTime: format(Date.now()),
    }
    console.log(body, data);
    db.menu.push(data)
    await saveDb(db)

    res.status(201).json({
      code: 200,
      data: data
    })
  } catch (err) {
    next(err)
  }
}
// 查询
exports.query = async (req, res, next) => {
  try {
    const db = await getDb()
    const data = db.menu
    res.status(200).json({
      code: 200,
      data
    })

  } catch (err) {
    next(err)
  }
}
// 详情
exports.detail = async (req, res, next) => {
  try {
    const query = req.query
    const db = await getDb()

    const data = db.menu.find(item => item.menuId === query.menuId)

    res.status(200).json({
      code: 200,
      data
    })

  } catch (err) {
    next(err)
  }
}