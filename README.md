
# sign

> 面试管理软件

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 功能列表

-   定位功能
-  我的功能
    - 绑定手机号
-  面试功能
    -  添加面试
    -  面试列表
    -  面试详情
    -  面试分享
    -  面试推送
    -  打卡功能
    -  面试导航
- 支付功能

## 模板推送步骤
-获取模板ID
    - 通过模版消息管理接口获取模版ID（详见模版消息管理）
    - 在微信公众平台手动配置获取模版ID
-获取formId
    -正常获取
    -用伪formid  button submit 用form包裹
-调用接口下发模板消息 
