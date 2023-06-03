const VALIDATION = {
  pwd: {
    value: /^([A-Za-z0-9]{6,20})$/i,
    label: '请输入6-20位登录密码',
  },
  code_num: {
    value: /^([A-Za-z0-9]{4})$/i,
    label: '请输入正确的验证码',
  },
  is_tel: {
    value: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
    label: '请输入正确的座机号码',
  },
  is_phone: {
    value: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
    label: '请输入正确的电话号码',
  },
}

function isCode(rule: any, value: any, callback: any) {
  if (value === '') {
    callback(new Error('请输入信息'))
  } else if (value && VALIDATION.code_num.value.test(value)) {
    callback(new Error(VALIDATION.code_num.label))
  } else {
    callback()
  }
}

export { 
  isCode
}




