# 开发规范
### 技术栈

- JavaScript框架：`Vue2.x` 
- 开发语言 `JavaScript`
- 构建工具 `Webpack`
- 全局状态管理 `Vuex`
- 路由管理 `Vue-Router`
- CSS预处理器 `Less` + `CSS Module`
- UI库： `Vant 3.x`

### 项目结构
```plain
├── dist                          输出目录
├── public                        一些在index.html中引入的公共文件(不经过构建工具编译)
└── src                           业务代码根目录
    ├── api                       api
    │   └── modules               module根据业务分块
    ├── assets                    静态资源（style、image、font、icon etc）
    │   ├── image                 图片
    │   └── style                 样式
    ├── component                 通用组件
    │   ├── global                全局组件，会被自动全局注册
    │   ├── local                 本地组件，使用需要导入
    │   ├── vant                  按需引入vant组件
    ├── plugin                    全局插件
    ├── router                   
    │   └── module                module根据业务分块，会被自动收集
    ├── store                     vuex定义
    │   └── module                module根据业务分块，会被自动收集
    ├── utils                     工具方法
    └── view                      业务页面（原则上按照业务模块分文件夹) 
```

#### 规约
原则上以[Vue官方-风格指南](https://v3.cn.vuejs.org/style-guide/)为准。

#### 命名规约
- 为了降低在创建文件夹/文件时的心智负担，所有文件夹和文件的命名均为单数
- 除components文件夹下，其他所有文件和文件夹均为驼峰命名
- 组件名除了根级 `App` 外，均使用多单词。

#### coding规约

- 非必须的场合，不允许`disable eslint check`
- 组件/页面请务必增加`name`属性，这样在开发者工具中调试时，可以直观的区分各个组件
- 每次提交代码前使用`npm run lint`检查代码，即使是`warning`也尽可能修复（git commit前会自动检查）
- 降低代码重复率，也不要过度设计。(除非已知后续会复用，否则第一次可以不用抽象出公用组件，在第二次复用时，请尽可能抽象出公共组件，同时在项目的`README`文件更新)
- 非特殊场合，请使用`css module`来书写样式,引入的`css module`对象统一命名为`$style`
- `css`命名最好使用`BEM`规范，在有明确层级关系的元素上，必须使用`BEM`
- 因为是移动端项目，因此请不要使用`overflow`属性(兼容性问题)，项目中基于`better-scroll`封装了`scroll-view`组件，可以按需使用
- 项目根目录下有一些`.`开头的文件，主要是一些配置文件，如无必要，请不要修改（尤其是`prettier`和`eslint`配置文件)

#### 配置说明

- `package.json`
  - `build:*` 构建各个环境
  - `local` 启动本地开发环境
  - `dev` 启动开发环境
  - `lint` 校验代码
- `.eslintrc.js``.prettierrc.js`语法检查配置，**请不要随意修改**
- `.env:*`环境变量,用来给不同环境配置
- `.env.local`本地局域网调试环境变量，该文件不会上传至git
- `vue.config.js`构建配置文件，**请不要随意修改，**目前已有功能详见项目中的`README.md`，主要功能如下：
  - 为`/src` `/components` `/views`等文件夹设置了别名和路径提示，详情见vue.config.js
  - webpack优化（如果需要）
  - 
#### 路由使用
- 增加新的router模块时，只需要在`/src/router/module`文件夹中新增对应的模块即可，会自动收集该目录下所有模块
- 请使用路由动态加载，并为每个路由增加`webpackChunkName`。e.g:

```javascript
const ApprovalorHome = () => import(/* webpackChunkName: "approvalor" */ '@/view/home/approvalor/index.vue');
```
- 为每个页面增加 `meta.title` 属性，来自动修改 `page title`
- 如有需要，配置 `meta.keepAlive` 属性为 `true` ，禁止页面自动销毁

#### 全局状态管理
- 每个模块中的 `action` 、 `mutation-type` 、 `mutation` 、 `state` 请分别写在独立的文件中
- 为每个模块开启 `namespace`