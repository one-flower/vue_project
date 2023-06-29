const format = (value) => {
  const date = new Date(value); // 通过时间戳创建一个 Date 对象

  const year = date.getFullYear(); // 获取年份
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份（需要加 1，且补 0）
  const day = String(date.getDate()).padStart(2, '0'); // 获取日期（补 0）
  const hours = String(date.getHours()).padStart(2, '0'); // 获取小时（补 0）
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 获取分钟（补 0）
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 获取秒数（补 0）

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
  format
}