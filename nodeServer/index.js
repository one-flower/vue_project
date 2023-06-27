const express = require('express')
const { getDb, saveDb } = require('./db')

const app = express()

// 解析表单请求体  application/json
app.use(express.json())
// 解析表单请求体  application/x-www-form-urlencoded
app.use(express.urlencoded())
/**
 * app.method(path, handle)
 * app    express实例
 * method 请求方法
 * path   请求地址
 * handle 处理
 */
// req请求头  res 响应
// 查询
app.get('/todos/query', async (req, res) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})
// 详情
app.get('/todos/detail', async (req, res) => {
  try {
    const db = await getDb()
    const todo = db.todos.find(item => item.id === Number.parseInt(req.params.id))

    if (!todo) {
      return res.status(404).end()
    }

    res.status(200).json(todo)
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})
// 添加
app.post('/todos/add', async (req, res) => {
  try {
    // 1.获取参数
    const todo = req.body

    // 2.数据验证
    if (!todo) {
      return res.status(422).json({
        error: '需要请求信息'
      })
    }
    if (!todo.title) {
      return res.status(422).json({
        error: 'title不能为空'
      })
    }

    // 3.数据处理
    const db = await getDb()
    const lastTodo = db.todos[db.todos.length - 1]
    todo.id = lastTodo ? lastTodo.id + 1 : 1
    db.todos.push({
      id: lastTodo ? lastTodo.id + 1 : 1,
      title: todo.title
    })
    await saveDb(db)

    // 4.发送响应
    res.status(200).json(todo)
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})
// 新增
app.patch('/todos/update', async (req, res) => {
  try {
    const todo = req.body
    const db = await getDb()
    if (!todo) {
      return res.status(422).json({
        error: '需要请求信息'
      })
    }
    if (!todo.id) {
      return res.status(422).json({
        error: 'id不能为空'
      })
    }
    if (!todo.title) {
      return res.status(422).json({
        error: 'title不能为空'
      })
    }
    const ret = db.todos.find(item => {
      return item.id === Number.parseInt(todo.id)
    })
    if (!ret) {
      return res.status(404).end()
    }
    Object.assign(ret, todo)
    ret.id = Number.parseInt(ret.id)
    await saveDb(db)

    res.status(200).json(ret)
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})
//删除
app.delete('/todos/delete', async (req, res) => {
  try {
    const todo = req.body
    const db = await getDb()
    if (!todo) {
      return res.status(422).json({
        error: '需要请求信息'
      })
    }
    if (!todo.id) {
      return res.status(422).json({
        error: 'id不能为空'
      })
    }
    const index = db.todos.findIndex(item =>
      item.id === Number.parseInt(todo.id)
    )
    if (index === -1) {
      return res.status(404).json({
        error: '无响应数据'
      })
    }
    db.todos.splice(index, 1)
    await saveDb(db)
    res.status(200).end('删除成功')
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})
// 开启服务
app.listen(9000, () => {
  console.log('listen启动');
})