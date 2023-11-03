module.exports = {
  // 环境
  env: {
    browser: true,
    esnext: true,
    node: true,
  },
  // 集成配置方案
  extends: [
    "@vue/prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "/src/types/.eslintrc-auto-import.json",
  ],
  // 特殊文件处理
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  // 语法解释器
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  // 规则拓展
  plugins: ["@typescript-eslint", "vue"],
  // 规则
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": ["off"], // any校验
    // 打印 debugger
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off", //关闭组件命名规则
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    quotes: 0, //引号类型
    semi: 0, //忽略末尾分号
    "no-const-assign": 2, //禁止修改const声明的变量
    "no-constant-condition": 2, //禁止在条件中使用常量表达式 if(true) if(1)
    "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-args": 2, //函数参数不能重复
    "no-duplicate-case": 2, //switch中的case标签不能重复
    "no-empty": 2, //块语句中的内容不能为空
    "no-empty-character-class": 2, //正则表达式中的[]内容不能为空
    "no-eval": 1, //禁止使用eval
    "no-invalid-this": 2, //禁止无效的this，只能用在构造器，类，对象字面量
    "no-irregular-whitespace": 2, //不能有不规则的空格
    "no-multi-str": 2, //字符串不能用\换行
    "no-multiple-empty-lines": [1, { max: 2 }], //空行最多不能超过2行
    "no-unreachable": 2, //不能有无法执行的代码
    "no-unused-expressions": 2, //禁止无用的表达式
    "no-unused-vars": [2, { vars: "all", args: "after-used" }], //不能有声明后未被使用的变量或参数
    "no-use-before-define": 2, //未定义前不能使用
    "no-useless-call": 2, //禁止不必要的call和apply
    "no-var": 2, //禁用var，用let和const代替
    "consistent-this": [2, "that"], //this别名
    "constructor-super": 2, //非派生类不能调用super，派生类必须调用super
    eqeqeq: 2, //必须使用全等
    // "func-names": 2, //函数表达式必须有名字
    indent: [2, 2], //缩进风格
    "use-isnan": 2, //禁止比较时使用NaN，只能用isNaN()
  },
  globals: {
    TablePage: "readonly", // 将你的全局变量名称添加到这里
  },
}
