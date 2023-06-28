const mongoose = require('mongoose');
const { dbUrl } = require('@config/config.default')
// mongodb 数据库
mongoose.connect(dbUrl);

const db = mongoose.connection;
//连接失败
db.on('error', err => {
  console.log('数据库连接失败', err);
});
// 连接成功
db.once('open', function () {
  // we're connected!
  console.log('数据库连接成功');
});
// 创建模型
module.exports = {
  User: mongoose.model('User', require('./user'))
}