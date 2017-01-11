## 项目描述:
该项目是由node.js为webServer,react结合redux的前端框架进行封装

本地开发需要在config目录下建立local.json文件进行本地环境配置

在项目目录下执行命令安装依赖包:

>`npm install`

在项目目录下执行命令启动本地开发环境:

>`npm run start`

测试环境的打包:

>`npm run deploy:test`

生产环境打包:

>`npm run deploy:prod`

## 项目目录：

>bin 可执行文件

>build webpack配置文件

>config 项目配置文件

>dist 项目打包生成目录

>server 本地服务主程序

>src 项目资源目录

## 项目配置：

>在config目录下的index文件,包含该项目的本地、开发、测试、生产都在该文件内进行设置

## webpack配置：

>在build目录下的webpack.config文件,会针对环境的不同进行不同的处理

## 本地server：

>本地开发时会启动webServer方便开发,server下的main是入口文件,会根据开发环境进行不同的处理,
在开发模式下会启动webpack的热更新功能,其他模式下会返回dist目录下的静态资源模拟线上环境,
对项目的api访问进行了反向代理,方便以测试环境的api请求进行本地开发

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

>该项目一共使用3个reducers

>location 路由跳转相关

>page 路由页面设置相关 统一处理页面设置,在页面初始化时申明该页面的page使用

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

>Common

>Env 当前环境配置

>Events 简单的事件封装

##### 路由层:

>目录 src/routes

>index 是路由的入口文件

>PageNotFound 404

>template 新建路由时的参考模板
