const crypto = require('crypto')

// 获取 crypto 支持的散列算法
module.exports = str => {
  return crypto.createHash('md5')
    .update('mkv' + str + 'mkv')
    .digest('hex')
}