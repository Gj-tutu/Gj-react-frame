## 项目描述:
该项目是由node.js为webServer,react结合redux的前端框架进行封装

在项目目录下执行命令安装依赖包:

>`npm run i` //国内安装添加淘宝npm地址
>`npm i` //国外正常安装

在项目目录下执行命令启动本地开发环境:

>`npm run start`

启动资源服务器:

>`npm run static` //用来运行打包好的静态资源

自动打包:

>`npm run deploy`  //deploy:test 测试环境打包  deploy:prod 生产环境打包

## 项目目录：

>bin 可执行文件

>build webpack配置文件

>config 项目配置文件

>dist 项目打包生成目录

>server 本地服务主程序

>src 项目资源目录

## 项目配置：

>可在项目根目录的config内进行统一配置,web.js为前端专属配置文件,index.js为统一配置加出入口

####web配置项
    serverHost: '127.0.0.1' //本地服务启动地址
    serverPort: '3000' //本地服务启动端口
    title: 'Gj-react-frame' //页面默认标题
    description: 'Gj-react-frame' //页面默认描述
    keyword: 'Gj-react-frame' //页面默认关键字
    scripts: [
        'http://www.xxx.com/test.js'
    ] //项目需加载外部js地址
    proxy: [
        {
            target: 'http://www.xxx.com',
            from: '/api',
            to: ''
        }
    ] //本地服务所需要开启的代理接口

## webpack配置：

>在build目录下的webpack.config文件,会针对环境的不同进行不同的处理 
//一般情况下无需修改

## 本地server：

>本地开发时会启动webServer方便开发,server下的main是入口文件,会根据开发环境进行不同的处理,
在开发模式下会启动webpack的热更新功能,其他模式下会返回静态资源模拟线上环境

## 前端页面资源：
>在src目录下包含所有前端原始资源文件

#### 前端资源目录:

>components 组件库 独立的样式组件和功能组件

>containers 容器库

>data 数据接口层

>layouts 布局库

>lib 扩展服务类

>routes 路由

>static 静态资源文件

>store store和reducers文件

>styles 样式文件

>index.html 入口文件

>main 主程序

##### reducers:

>目录 src/store

>该项目一共使用2个reducers

>location 路由跳转相关

>data 数据接口 统一处理数据接口,在页面初始化时申请该页面所需使用的data资源,进行页面和数据的绑定

##### 数据接口层:

>目录 src/data

>用来划分数据分层,简化页面关联数据的使用方式,通过对接口的定义可进行配置缓存策略

>在页面开发时,只需要申明所需使用的数据,弱化页面和数据的依赖关系

>base 用来存放一些服务接口和基础数据

##### 扩展服务类:

>目录 src/lib

>Api 封装项目api请求,简化ajax的使用

>ApiSetting 项目api的相关配置

>Cache 本地缓存策略的封装

>Common 核心

>Env 当前环境配置

>Events 简单的事件封装

>Tools 工具包

##### 路由层:

>目录 src/routes

>index 是路由的入口文件

>PageNotFound 404

>home 默认首页

>demo 简单操作实例

## 功能说明:

#### 约束:
1.数据请求需在store/data内进行封装,便于页面按需使用和按需进行全局数据缓存

2.添加事件需在lib/Event中进行定义,便于事件的统一管理

3.api需配置在ApiSetting内,便于统一管理

4.页面样式需配置独立class或者id下,防止页面间样式相互影响,因为按需加载,本地开发时样式基本不会影响,但上线会进行样式打包合并压缩去重,如有命名冲突会导致页面样式相互影响问题,如需设置统一样式可在style下app进行设定ß

5.以页面为单位进行开发,需创建page.js

6.组件开发需在components/index进行配置,便于统一管理和区分环境, 调用方式例如: 

    import { Test } from './components'

7.页面的数据操作需定义在option文件中,具体可参考demo

8.路由层目录结构以模块进行注册,模块以文件夹形式添加在routes目录下,添加模块在routes/index中添加,模块内页面由模块目录下index进行自我管理,页面以文件夹形式添加在模块目录下,具体格式可参考demo

#### 新增生命周期:
1.inPage 进入页面后,页面渲染加同步操作完成后触发

2.outPage 离开页面后,跳转到新页面前

3.initData 页面通过验证后会触发一次,一次页面访问只会触发一次

4.updateDate 页面通过验证后,在触发initData后的页面渲染都会触发

//可参考demo新增生命周期

#### 数据处理:
1.页面暂存数据
`通过state实现,页面跳转都会清除,相同路由不同页面跳转也会清除,例如:`

    /page/1 -> /page/2

2.页面缓存数据
`通过页面option下进行操作,不同路由页面不共享,相同路由页面共享数据`

3.全局缓存数据
`通过store/data下进行操作,不同路由间共享`

//可参考demo数据操作

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

#### Api使用:
`Restful 调用方式:`

    /*在ApiSetting中进行配置*/
    const ApiSetting = {
        query: {
            method: POST, //POST, GET, PUT, DELETE
            url: '/xx/{id}' //id为参数变量
        }
    }

    /*Api.request第一个参数接受ApiSetting配置格式, 参数二为请求所需的参数*/
    Api.request(ApiSetting.query, {id: 1}) //参数id会替换url中的{id}


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

#### demo:
    启动本地服务 npm run start 后访问/demo demo只在开发环境中可访问
