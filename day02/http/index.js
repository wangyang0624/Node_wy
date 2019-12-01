#! /usr/bin/env node

// console.log(1)


let htp= 8080;
let http=require("http")
let server=http.createServer()

let {version} = require("./package.json")

if(process.argv[2]==='-v'){
    console.log(version)
}else if(process.argv[2]=="-p"){
    let ser=process.argv[3]?process.argv[3]:htp
    server.listen(ser,()=>{
        console.log(`服务开启,端口号${ser}`)
    })
}else{
    let ser=process.argv[3]?process.argv[3]:htp
    server.listen(ser,()=>{
        console.log(`服务开启${ser}`)
    })
}

