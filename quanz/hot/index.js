let k = require("koa")

let htp = new k()

let static = require("koa-static")

let path = require("path")

let router = require("koa-router")()

let bodyparser = require("koa-bodyparser")

let query = require("./db/index")

htp.use(bodyparser())
htp.use(router.routes())
htp.use(static(path.join(__dirname, "db")))

//登录
router.get("/api/dlxx", async ctx => {
    let { username, password } = ctx.query
    let list = await query('select * from dlxx where username=?', [username])
    if (list.length) {
        if (username == list[0]["username"] && password == list[0]["password"]) {
            ctx.body = {
                code: 1,
                msg: "登录成功",
                year: list[0]["year"],
                id:list[0]["id"]
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "登陆失败"
            }
        }
    }
})

//注册
router.post('/api/zc', async ctx => {
    let { username, password, year } = ctx.request.body
    if (username && password) {
        let name = await query('select * from dlxx where username=?', [username])
        if (name.length) {
            ctx.body = {
                code: 0,
                msg: "用户存在"
            }
        } else {
            await query('insert into dlxx (username,password,year) values (?,?,?)', [username, password, year])
            ctx.body = {
                code: 1,
                msg: "添加成功"
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "数据丢失"
        }
    }
})

//修改数
router.post("/api/xg", async ctx => {
    let { newpassword, password, year, id, user } = ctx.request.body

    // if (id) {
    if (newpassword && password) {
        await query('update dlxx set password=? where id=?', [newpassword, id])
        ctx.body = {
            code: 1,
            msg: "操作成功"
        }
    } else if (year||user) {
        await query('update dlxx set year=?,username=? where id=?', [year,user, id])
        ctx.body = {
            code: 1,
            msg: "操作成功"
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "数据丢失"
        }
    }
    // } else {
    //     ctx.body = {
    //         code: 2,
    //         msg: "数据丢失"
    //     }
    // }
})

//模糊搜索
router.get('/api/mh', async ctx => {
    let { username } = ctx.query
    try {
        let obj = await query(`select * from listb where name like '%${username}%'`)
        ctx.body = {
            code: '1',
            msg: "搜索成功",
            obj
        }
    } catch (e) {
        ctx.body = {
            code: '0',
            msg: "无数据"
        }
    }
})

//列表获取
router.get("/api/lists", async ctx => {
    let list = await query("select * from listb")
    ctx.body = {
        list
    }
})




htp.listen(2000)
console.log("开启成功")