const {User} = require('@model/index')

exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body)
    await user.save()

    user = user.toJSON()
    delete user.password

    res.status(201).json({
      user
    })
  } catch (err) {
    next(err)
  }
}