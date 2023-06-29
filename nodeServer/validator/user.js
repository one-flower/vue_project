const { body, query } = require('express-validator')
const validate = require('@middleware/validate')
const { User } = require('@model/index')
const md5 = require('@util/md5')

exports.register = validate([
  body('username')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async username => {
      const user = await User.findOne({ username })
      console.log(user, 'username');
      if (user) {
        return Promise.reject('用户名已存在')
      }
    }),
  body('password').notEmpty().withMessage('密码不能为空'),
  body('email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
])

exports.login = [
  validate([
    query('username').notEmpty().withMessage('用户名不能为空'),
    query('password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    query('username')
      .custom(async (username, { req }) => {
        const user = await User.findOne({ username }).select('password')
        if (!user) {
          return Promise.reject('用户名不存在')
        }
        req.user = user
      }),
  ]),
  validate([
    query('password')
      .custom(async (password, { req }) => {
        if (md5(password) !== req.user.password) {
          return Promise.reject('密码错误')
        }
      })
  ])
]