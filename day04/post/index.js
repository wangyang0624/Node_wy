let koa = require("koa")

let app = new koa()

let path = require("path")

let static = require("koa-static")

const router = require("koa-router")();

const bodyparser = require("koa-bodyparser")

let query = require('./db/index')

app.use(static(path.join(__dirname, "serve")))
app.use(bodyparser())
app.use(router.routes())

//查找
router.get("/api/look", async (ctx, next) => {
    try {
        let list = await query('select * from wylist');
        ctx.body = {
            code: 1,
            data: list
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            data: e
        }
    }
})

//增
router.post("/api/list", async (cxt, next) => {
    let { user, name } = cxt.request.body
    if (user && name) {
        let userlist = await query('select * from wylist where username=?', [user])
        if (userlist.length) {
            cxt.body = {
                code: '3',
                msg: "用户存在"
            }
        } else {
            try {
                await query('insert into wylist (username,password) value (?,?)', [user, name])
                cxt.body = {
                    code: 1,
                    msg: "添加成功"
                }
            } catch (e) {
                cxt.body = {
                    code: 0,
                    data: e
                }
            }
        }
    }
})

//删a
router.get("/api/del", async (cxt, next) => {
    console.log(cxt.query)
    let { id } = cxt.query
    if (id) {
        await query('delete from wylist where id=?', [id])
        cxt.body = {
            code: "0",
            msg: "删除成功"
        }
    } else {
        cxt.body = {
            code: "1",
            msg: "没有此ID"
        }
    }
})


//改
router.post('/api/update',async (cxt)=>{
    let {user,name,id} = cxt.request.body
    if(user && name && id){
        try{
            await query(`update wylist set username=?,password=? where id=?`,[user,name,id]) 
            cxt.body={
                code:1,
                msg:"修改成功"
            }
        }catch(e){
            cxt.body={
                code:0,
                msg:"修改失败"
            }
        }
    }else{
        cxt.body={
            code:2,
            msg:"参数丢失"
        }
    }
})

//模糊搜索
router.get('/api/like',async (ctx)=>{
    let  {name} = ctx.query
    try{
      let list=  await query(`select * from wylist where username like '%${name}%'`,[name])
        ctx.body={
            code:1,
            msg:list
        }
    }catch(e){
        ctx.body={
            code:0,
            msg:"查找失败"
        }
    }
})

//分页器
router.get("/api/limit", async (cxt, next) => {
    let { pagenum=1,limit=2 } = cxt.query
    
    let oud=await query(`select count(*) from wylist `)
    let start=(pagenum-1)*limit
    try{
        let list=   await query(`select * from wylist limit ${start},${limit}`)
        cxt.body = {
            code: "1",
            msg:list,
            data:oud[0]['count(*)']
        }
    }catch(e){
        ctx.body={
            code:0,
            msg:"失败"
        }
    }
})

app.listen(3000, () => {
    console.log("启动成功")
})