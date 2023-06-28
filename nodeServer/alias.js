const path = require('path');
require('module-alias/register');

const aliases = {
  '@config': path.resolve(__dirname, 'router'),
  '@controller': path.resolve(__dirname, 'db'),
  '@db': path.resolve(__dirname, 'config'),
  '@middleware': path.resolve(__dirname, 'model'),
  '@model': path.resolve(__dirname, 'controller'),
  "@router": path.resolve(__dirname, 'middleware'),
  "@util": path.resolve(__dirname, 'middleware'),
  "@validator": path.resolve(__dirname, 'middleware'),
  // 添加其他的别名...
};

module.exports = aliases;
