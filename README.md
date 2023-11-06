# 描述

B端后台管理系统

# 项目文件

- [git地址]()
- [接口文档]()
- [前端代码规范]()

# 构建

- [vue3中文官网](https://cn.vuejs.org/)
- [pinia中文官网](https://pinia.web3doc.top/)
- [typescript中文官网](http://typescript.p2hp.com/)
- [vite中文官网](https://cn.vitejs.dev/)

# 运行

```bash
# 克隆项目
git clone https://github.com/xxxx.git

# 进入项目
cd web-pc

# 安装依赖
npm install

# 运行
npm run dev

# 打包
npm run build:dev
npm run build:prod
```

# 项目结构

```bash
├── build                   # 构建相关
├── mock                    # 本地模拟数据
├── public                  # 静态资源
├── src                     # 源代码
│   ├── api                 # 所有请求
│   ├── assets              # 静态资源
│   ├── components          # 全局公用组件
│   ├── directives          # 全局公用指令
│   ├── hooks               # 全局公用方法
│   ├── layout              # 全局公用布局
│   ├── locales             # 国际化配置
│   ├── router              # 路由
│   ├── stores              # 全局公用状态管理
│   ├── styles              # 全局公用样式
│   ├── types               # 全局公用类型
│   ├── utils               # 全局公用工具
│   ├── views               # 所有页面
│   ├── App.vue             # 入口页面
│   └── main.ts             # 入口文件
├── tsconfig.json           # ts配置文件
├── vue.config.js           # vue配置文件
└── package.json            # package.json
```
