const express = require('express')
const { getDb, saveDb } = require('@db')
const userCtrl = require('@controller/user')
const userVildator = require('@validator/user')
// 创建可挂载的路由处理器模块
const user = express.Router()

// 
user.post('/register', userVildator.register, userCtrl.register)
// 查询
user.get('/query', async (req, res, next) => {
  try {
    console.log('---');
    const db = await getDb()
    res.status(200).json(db.menu)
  } catch (err) {
    next(err)
  }
})
// 详情
user.get('/detail', async (req, res, next) => {
  try {
    const db = await getDb()
    const data = db.menu.find(item => item.id === Number.parseInt(req.params.id))

    if (!data) {
      return res.status(404).end()
    }

    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})
// 添加
user.post('/add', async (req, res, next) => {
  try {
    // 1.获取参数
    const data = req.body

    // 2.数据验证
    if (!data) {
      return res.status(422).json({
        error: '需要请求信息'
      })
    }
    if (!data.title) {
      return res.status(422).json({
        error: 'title不能为空'
      })
    }

    // 3.数据处理
    const db = await getDb()
    const lastIndex = db.menu[db.menu.length - 1]
    data.id = lastIndex ? lastIndex.id + 1 : 1
    db.menu.push({
      id: lastIndex ? lastIndex.id + 1 : 1,
      title: data.title
    })
    await saveDb(db)

    // 4.发送响应
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})
// 新增
user.patch('/update', async (req, res, next) => {
  try {
    const data = req.body
    const db = await getDb()
    if (!data) {
      return res.status(422).json({
        error: '需要请求信息'
      })
    }
    if (!data.id) {
      return res.status(422).json({
        error: 'id不能为空'
      })
    }
    if (!data.title) {
      return res.status(422).json({
        error: 'title不能为空'
      })
    }
    const ret = db.menu.find(item => {
      return item.id === Number.parseInt(data.id)
    })
    if (!ret) {
      return res.status(404).end()
    }
    Object.assign(ret, data)
    ret.id = Number.parseInt(ret.id)
    await saveDb(db)

    res.status(200).json(ret)
  } catch (err) {
    next(err)
  }
})
//删除
user.delete('/delete', async (req, res, next) => {
  try {
    const data = req.body
    const db = await getDb()
    if (!data) {
      return res.status(422).json({
        error: '需要请求信息'
      })
    }
    if (!data.id) {
      return res.status(422).json({
        error: 'id不能为空'
      })
    }
    const index = db.menu.findIndex(item =>
      item.id === Number.parseInt(data.id)
    )
    if (index === -1) {
      return res.status(404).json({
        error: '无响应数据'
      })
    }
    db.menu.splice(index, 1)
    await saveDb(db)
    res.status(200).end('删除成功')
  } catch (err) {
    next(err)
  }
})

module.exports = user