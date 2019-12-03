#! /usr/bin/env node

let app=require("../server/index")

let static=require("koa-static")

let {version}=require("../package.json")

let argv=process.argv.slice(2)

let prot=8080



app.use(static(process.cwd()))

if(argv[0]==="-v"){
    console.log(version)
}else{
    prot=argv[1]?argv[1]:prot
    app.listen(prot,()=>{
        console.log("开启成功"+prot)
    })
}