let Koa = require("koa")

let htp= new Koa()


htp.use(async (ctx,next)=>{
    let end=new Date()*1
    console.log("第一次")
    
    await next();
    console.log("第一次结束")
    let start=new Date()*1
    let trent=start-end
    console.log(trent)
})

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

// htp.listen(8080,()=>{
//     console.log("开启成功")
// })

module.exports=htp