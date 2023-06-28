const { body } = require('express-validator')
const validate = require('@middleware/validate')
const { User } = require('@model/index')

exports.register = validate([
  body('userName')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async userName => {
      const user = await User.findOne({ userName })
      console.log(user,'userName');
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

  ]),
  validate([

  ]),
]