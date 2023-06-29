// const { User } = require('@model/index')
// const db = require('@model/index')
const { getDb, saveDb } = require('@db/index')
const md5 = require('@util/md5')
const { format } = require('@util/index')
// 创建
exports.register = async (req, res, next) => {
  try {
    let body = req.body

    const db = await getDb()
    const lastIndex = db.user[db.user.length - 1]
    const id = lastIndex ? lastIndex.id + 1 : 1
    const data = {
      id: id,
      username: body.username,
      password: md5(body.password),
      name: body.name || null,
      sex: body.sex || null,
      age: body.age || null,
      img: body.img || null,
      createdTime: format(Date.now()),
      updateTime: format(Date.now()),
    }
    db.user.push(data)
    await saveDb(db)

    res.status(201).json({
      code: 200,
      data: data
    })
  } catch (err) {
    next(err)
  }
}
// 登录
exports.login = async (req, res, next) => {
  try {
    const query = req.query
    const db = await getDb()

    const data = db.user.find(item => item.admin === query.admin)
    if (data.password === md5(query.password)) {
      delete data.password
      data.token = 'iamTokennnnnnnnnnnnnnnnnnnn'
      res.status(200).json({
        code: 200,
        data
      })
    }else{
      res.status(200).json({
        code: 403,
        message: '密码错误'
      })
    }

  } catch (err) {
    next(err)
  }
}