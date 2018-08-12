## 项目描述:

该项目是由 node.js 为 webServer,react 结合 redux 的前端框架进行封装

在项目目录下执行命令安装依赖包:

> `npm run i` //国内安装添加淘宝 npm 地址
> `npm i` //国外正常安装

在项目目录下执行命令启动本地开发环境:

> `npm run start`

启动资源服务器:

> `npm run static` //用来运行打包好的静态资源

自动打包:

> `npm run deploy` //deploy:test 测试环境打包 deploy:prod 生产环境打包

## 项目目录：

> bin 可执行文件

> build webpack 配置文件

> config 项目配置文件

> dist 项目打包生成目录

> server 本地服务主程序

> src 项目资源目录

## 项目配置：

> 可在项目根目录的 config 内进行统一配置,web.js 为前端专属配置文件,index.js 为统一配置加出入口

####web 配置项
serverHost: '127.0.0.1' //本地服务启动地址
serverPort: '3000' //本地服务启动端口
title: 'Gj-react-frame' //页面默认标题
description: 'Gj-react-frame' //页面默认描述
keyword: 'Gj-react-frame' //页面默认关键字
scripts: [
'http://www.xxx.com/test.js'
] //项目需加载外部 js 地址
proxy: [
{
target: 'http://www.xxx.com',
from: '/api',
to: ''
}
] //本地服务所需要开启的代理接口

## webpack 配置：

> 在 build 目录下的 webpack.config 文件,会针对环境的不同进行不同的处理
> //一般情况下无需修改

## 本地 server：

> 本地开发时会启动 webServer 方便开发,server 下的 main 是入口文件,会根据开发环境进行不同的处理,
> 在开发模式下会启动 webpack 的热更新功能,其他模式下会返回静态资源模拟线上环境

## 前端页面资源：

> 在 src 目录下包含所有前端原始资源文件

#### 前端资源目录:

> components 组件库 独立的样式组件和功能组件

> containers 容器库

> data 数据接口层

> layouts 布局库

> services 扩展服务类

> routes 路由

> static 静态资源文件

> store store 和 reducers 文件

> styles 样式文件

> index.html 入口文件

> main 主程序

##### reducers:

> 目录 src/store

> 该项目一共使用 2 个 reducers

> location 路由跳转相关

> data 数据接口 统一处理数据接口,在页面初始化时申请该页面所需使用的 data 资源,进行页面和数据的绑定

##### 数据接口层:

> 目录 src/data

> 用来划分数据分层,简化页面关联数据的使用方式,通过对接口的定义可进行配置缓存策略

> 在页面开发时,只需要申明所需使用的数据,弱化页面和数据的依赖关系

> base 用来存放一些服务接口和基础数据

##### 扩展服务类:

> 目录 src/services

> Api 封装项目 api 请求,简化 ajax 的使用

> Cache 本地缓存策略的封装

> Common 核心

> Env 当前环境配置

> Events 简单的事件封装

> Tools 工具包

##### 路由层:

> 目录 src/routes

> index 是路由的入口文件

> PageNotFound 404

> home 默认首页

## 功能说明:

#### 约束:

1.数据请求需在 store/data 内进行封装,便于页面按需使用和按需进行全局数据缓存

2.添加事件需在 lib/Event 中进行定义,便于事件的统一管理

3.api 需配置在 ApiSetting 内,便于统一管理

4.页面样式需配置独立 class 或者 id 下,防止页面间样式相互影响,因为按需加载,本地开发时样式基本不会影响,但上线会进行样式打包合并压缩去重,如有命名冲突会导致页面样式相互影响问题,如需设置统一样式可在 style 下 app 进行设定 ß

5.以页面为单位进行开发,需创建 page.js

6.组件开发需在 components/index 进行配置,便于统一管理和区分环境, 调用方式例如:

    import { Test } from './components'

7.页面的数据操作需定义在 option 文件中,具体可参考 demo

8.路由层目录结构以模块进行注册,模块以文件夹形式添加在 routes 目录下,添加模块在 routes/index 中添加,模块内页面由模块目录下 index 进行自我管理,页面以文件夹形式添加在模块目录下,具体格式可参考 demo

#### 新增生命周期:

1.inPage 进入页面后,页面渲染加同步操作完成后触发

2.outPage 离开页面后,跳转到新页面前

3.initData 页面通过验证后会触发一次,一次页面访问只会触发一次

4.updateDate 页面通过验证后,在触发 initData 后的页面渲染都会触发

//可参考 demo 新增生命周期

#### 数据处理:

1.页面暂存数据
`通过state实现,页面跳转都会清除,相同路由不同页面跳转也会清除,例如:`

    /page/1 -> /page/2

2.页面缓存数据
`通过页面option下进行操作,不同路由页面不共享,相同路由页面共享数据`

3.全局缓存数据
`通过store/data下进行操作,不同路由间共享`

//可参考 demo 数据操作

#### 数据操作:

`数据操作使用redux进行处理,每个页面的option为该页面的数据处理中心使用方法如下:`

    /*定义相关申明和常量*/
    export const KEY = 'demo-testOne-option' //设定唯一key,不可重复
    export const option = true //申明是为页面option
    const ADD = 'ADD' //定义操作标识符,页面之间不冲突

    /*同步操作*/
    function add(num) {
        return {
            KEY,
            type: ADD,
            payload: {
                value: num
            }
        }
    }

    /*异步操作*/
    function asyncAdd(num) {
        return (dispatch, getState) => {
            setTimeout(() => {
                dispatch({
                    KEY,
                    type: ADD,
                    payload: {
                        value: num
                    }
                })
            }, 1000)
        }
    }

    /*添加操作进页面props内,注意命名不可与页面props内其他变量重名*/
    export const action = {
        add,
        asyncAdd
    }
    // 在页面内通过this.props.add()使用

    /*定义操作,通过操作标识符识别*/
    const ACTION_HANDLERS = {
        [ADD](state, action) {
            state.num = action.payload.value + state.num
            return {
                ...state
            }
        }
    }

    /*定义初始值 如果该页面不需要使用申明为null*/
    export const initState = {
        num: 0
    }

#### Api 使用:

`Restful 调用方式:`

    Api.post,Api.get,Api.form第一个参数url, 参数二为请求所需的参数
    url: '/xx/{id}' //id为参数变量
    Api.post(url, {id: 1}) //参数id会替换url中的{id}

`统一调用方式,根据接口灵活性,在数据中心处理所需参数,解耦页面与接口之间的关系,通过数据中心进行操作`

#### 页面可配置参数:

    path: '/' //路由配置
    title: 'Gj-react-frame' //页面标题
    description: 'Gj-react-frame' //页面描述
    keyword: 'Gj-react-frame' //页面关键字
    needLogin: true //开启登录验证 默认false
    repeat: true //页面进行返回操作时,默认不执行initData,开启该功能,initData将被执行

#### 图标使用:

`项目图标统一使用iconfont,可通过style/iconfont/demo.html查看可使用的图标使用方式如下:`

    import { Icon } from '../../../../components'
