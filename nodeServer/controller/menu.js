const { getDb, saveDb } = require('@db/index')
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
    body.redirect ? data.redirect = body.redirect : ''
    db.menu.push(data)
    await saveDb(db)

    res.status(201).json({
      code: 200,
      data: data,
      message: '添加成功'
    })
  } catch (err) {
    next(err)
  }
}
// 更新
exports.update = async (req, res, next) => {
  try {
    let body = req.body

    const db = await getDb()
    const ret = db.menu.find(item => {
      return item.id === Number.parseInt(body.id)
    })
    if (!ret) {
      return res.status(404).end()
    }
    Object.assign(ret, body)
    ret.id = Number.parseInt(ret.id)
    await saveDb(db)

    res.status(201).json({
      code: 200,
      data: ret,
      message: '更新成功'
    })
  } catch (err) {
    next(err)
  }
}
exports.delete = async (req, res, next) => {
  try {
    let body = req.body

    const db = await getDb()
    const index = db.menu.findIndex(item =>
      item.id === Number.parseInt(body.id)
    )
    if (!index) {
      return res.status(404).end()
    }
    db.menu.splice(index, 1)
    await saveDb(db)

    res.status(201).json({
      code: 200,
      data: [],
      message: '删除成功'
    })
  } catch (err) {
    next(err)
  }
}
// 查询
exports.query = async (req, res, next) => {
  try {
    let body = req.body
    const db = await getDb()
    if (!body.title) {
      delete body.title
    }
    if (!body.path) {
      delete body.path
    }
    const data = db.menu.filter(item => {
      return (item.title.indexOf(body.title) && item.path.indexOf(body.path))
    })
    res.status(200).json({
      code: 200,
      data,
      message: '查询成功'
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
      data,
      message: '查询成功'
    })

  } catch (err) {
    next(err)
  }
}