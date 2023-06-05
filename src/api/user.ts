import request from '@/utils/request'
// import qs from 'qs'
// import { JSEncrypt } from 'jsencrypt'

// function getNewPwd (pwd:string) {
//   const publicKey = `-----BEGIN RSA PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIFIFs9u4Y4lEL9IfPGUJl82iv88ZJQq/JNjNuyazQNyHA7qFH+i+6GbNCjkUXEpdyXCliMWELRS2WpQUn8wn/XGmhELXzhs9C+JJT23+tEYLsnB2mEPG7R1T1/x4aaCVxPiV+A9trvkfa1iVydWhEwl08gw65pDGnD0fJM6XbAwIDAQAB-----END RSA PUBLIC KEY-----`;
//   // 从后台获取公钥，这里省略，直接赋值
//   const encryptor = new JSEncrypt() // 新建JSEncrypt对象
//   encryptor.setPublicKey(publicKey) // 设置公钥
//   const rsaPassWord = encryptor.encrypt(pwd) // 对密码进行加密
//   return rsaPassWord
// }
// // 登录方法
// export function login (info:any) {
//   let rsaPassWord = getNewPwd(info.password)
//   const data = {
//     username: info.username,
//     password: rsaPassWord,
//     kaptcha: info.code
//   }
//   const datas = qs.stringify(data)
//   return request({
//     url: '/security/login',
//     method: 'post',
//     data: datas,
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
//   })
// }

export function loginCode() {
  return request({
    url: 'security/auth/image-captcha',
    method: 'get',
    responseType: 'arraybuffer',
  })
}

export function login(data: any) {
  return request({
    url: '/api/getUserInfo',
    method: 'get',
    data: data,
  })
}
