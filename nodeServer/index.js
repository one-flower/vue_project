const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('./alias');
const router = require('@router/index')
const errorHandleer = require('./middleware/error-handle')
const fourHandler = require('./middleware/404-handle')
require('./model')

const app = express()
const port = process.env.port || 9000

// 解析表单请求体  application/json
app.use(express.json())
// 解析表单请求体  application/x-www-form-urlencoded
app.use(express.urlencoded())

app.use(morgan('dev'))
app.use(cors())

app.use(router)

// 404处理中间件
app.use(fourHandler())
// 错误处理中间件
app.use(errorHandleer())

// 开启服务
app.listen(port, () => {
  console.log(`服务启动 http://localhost:${port}`);
})