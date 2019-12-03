## koa
### koa框架介绍 https://koa.bootcss.com/

##### koa出现的历史背景

nodejs是一个异步的世界，官方API支持的都是callback形式的异步编程模型，这会带来许多问题，例如：callback嵌套问题 2.异步函数中可能同步调用callback返回数据，带来不一致性。为了解决以上问题koa出现了。

##### koa--基于nodejs平台的下一代web开发框架

koa是由express原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的web框架。使用koa编写web应用，可以免除重复繁琐的回调函数嵌套，并极大的提升错误处理的效率。koa不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写web应用变得得心应手。
###### 开发思路和express差不多，最大的特点是可以避免异步嵌套

###### 安装

npm i koa -S

###### 使用

const Koa = require('==koa==');

const app = new Koa();

//配置中间件

app.use(async (ctx,next) => {
    ctx.body = '==hello koa2=='
})

app.listen(3000,()=>{
    console.log("==服务启动成功，port:3000==")
})

    htp.use(async (ctx,next)=>{
    let end=new Date()*1
    console.log("第一次")
    
    await next();
    console.log("第一次结束")
    let start=new Date()*1
    let trent=start-end
    console.log(trent)})

    function dli (){
     return new Promise((resolve,reject)=>{
      setTimeout(()=>{
         resolve("123")
            console.log("123")
        },2000)
    })
        }

    htp.use(async (ctx,next)=>{
    console.log("第2次")
    await dli();
    console.log("第2次结束")
    })
    
    htp.listen(8080,()=>{
    console.log("开启成功")
    })

#### 1.koa-bodyparser 接收并处理post请求传递的参数，放到req.request.body上


    let bodyparser = require('koa-bodyparser');

    app.use(bodyparser())
    

#### 2.koa-static处理静态资源

    let koaStatic = require('koa-static');

    app.use(koaStatic(path.join(process.cwd(),'public'))
    
####  3.处理路由
        let router = require('koa-router');