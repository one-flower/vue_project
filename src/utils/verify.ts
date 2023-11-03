const VALIDATION = {
  is_pwd: {
    value: /^[a-z0-9]{6,20}$/i,
    label: "请输入6-20位登录密码",
  },
  is_code: {
    value: /^[a-z0-9]{4}$/i,
    label: "请输入正确的验证码",
  },
  is_tel: {
    value: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
    label: "请输入正确的座机号码",
  },
  is_phone: {
    value:
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
    label: "请输入正确的电话号码",
  },
  is_eg: {
    value: /^[a-z]*$/i,
    label: "请输入字母组合",
  },
  is_num_eg: {
    value: /^[a-z0-9]*$/i,
    label: "请输入数字与字母组合",
  },
  is_idCard: {
    value: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    label: "请输入正确的身份证号",
  },
  is_email: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    label: "请输入正确的邮箱",
  },
  is_data: {
    value:
      /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/,
    label: "请输入正确的日期",
  },
}

function vCode(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_code.value.test(value)) {
    callback(new Error(VALIDATION.is_code.label))
  } else {
    callback()
  }
}
function vPwd(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_pwd.value.test(value)) {
    callback(new Error(VALIDATION.is_pwd.label))
  } else {
    callback()
  }
}
function vPhone(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_phone.value.test(value)) {
    callback(new Error(VALIDATION.is_phone.label))
  } else {
    callback()
  }
}
function vEg(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_eg.value.test(value)) {
    callback(new Error(VALIDATION.is_eg.label))
  } else {
    callback()
  }
}
function vNumEg(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_num_eg.value.test(value)) {
    callback(new Error(VALIDATION.is_num_eg.label))
  } else {
    callback()
  }
}
function vIdCard(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_idCard.value.test(value)) {
    callback(new Error(VALIDATION.is_idCard.label))
  } else {
    callback()
  }
}
function vEmail(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_email.value.test(value)) {
    callback(new Error(VALIDATION.is_email.label))
  } else {
    callback()
  }
}
function vDate(rule: any, value: any, callback: any) {
  if (rule.required && !value) {
    callback(new Error("请输入信息"))
  } else if (value && !VALIDATION.is_data.value.test(value)) {
    callback(new Error(VALIDATION.is_data.label))
  } else {
    callback()
  }
}

export { vCode, vPwd, vPhone, vEg, vNumEg, vIdCard, vEmail, vDate }
