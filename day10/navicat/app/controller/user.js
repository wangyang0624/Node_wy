'use strict';

const Controller = require('egg').Controller;
const jwt = require("jsonwebtoken")

class UserController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.body = '1111';
  }

  //登录
  async login() {
    const { ctx, service } = this;
    let { num, password } = ctx.request.body;
    if (num && password) {
      let hcm = ctx.helper.hmc(password)
      let data = await service.user.login(num, hcm)
      if (data.length) {
        let token = jwt.sign({ num, roleId: data[0].role }, 'jiaoyan', { expiresIn: 60 * 60 * 38 })
        ctx.body = {
          code: 1,
          msg: "登陆成功",
          token,
          data
        }
      } else {
        ctx.body = {
          code: 3,
          msg: "无此用户 请重新输入"
        }
      }
    } else {

      ctx.body = {
        code: 2,
        msg: "参数丢失"
      }
    }

  }

  //注册 
  async register() {
    const { ctx, service } = this;

    let { username, password, num, role = 3 } = ctx.request.body;
    if (username && password && num) {
      let list = await ctx.service.user.jy(num)
      if (list.length) {
        ctx.body = {
          code: 2,
          msg: `学号已存在！！！${num}`
        }
      } else {
        let hcm = ctx.helper.hmc(password)
        await service.user.register(username, hcm, num, role)
        ctx.body = {
          code: 1,
          msg: "注册成功"
        }
      }
    } else {
      ctx.body = {
        code: 3,
        msg: "参数丢失"
      }
    }
  }

  //根据角色查询菜单
  async menu() {
    let { ctx, service } = this;
    let { roleId } = ctx.into

    if (roleId) {
      try {
        let data = await service.user.menu(roleId)
        ctx.body = {
          code: 1,
          data
        }
      } catch (e) {
        ctx.body = {
          code: 3,
          msg: e
        }
      }
    } else {
      ctx.body = {
        code: 2,
        msg: "参数丢失"
      }
    }
  }

  //删除学生
  async del() {
    let { ctx } = this
    let { id } = ctx.query
    let { roleId } = ctx.into
    if (id) {
      if (roleId != 1) {
        ctx.body = {
          code: 4,
          msg: "权限不足"
        }
      } else {
        await ctx.service.user.del(id)
        ctx.body = {
          code: 1,
          msg: "删除成功"
        }
      }
    } else {
      ctx.body = {
        code: 2,
        msg: "参数丢失"
      }
    }
  }

  //获取没有录入所有学生
  async students() {
    let { ctx, service } = this
    let std = await service.user.student()
    ctx.body = {
      code: 1,
      msg: std
    }
  }

  //获取所有学生
  async getxmlist() {
    let { ctx, service } = this
    let data = await service.user.getxmlist()
    // let theoryarr = [];
    // let skillarr = [];
    // let timearr = [];
    // await data.forEach(item => {
    //   theoryarr.push(item.theory)
    //   skillarr.push(item.skill)
    //   timearr.push(`${new Date(item.time).getMonth()}-${new Date(item.time).getDate()}`)
    // })
    ctx.body = {
      code: 1,
      data
    }
  }

  //删除成员
  async delxmlist() {
    let { ctx, service } = this
    let { id } = ctx.query
    if (id) {
      await service.user.delxmlist(id)
      ctx.body = {
        code: "1",
        msg: "删除成功"
      }
    } else {
      ctx.body = {
        code: "3",
        msg: "参数丢失"
      }
    }
  }

  //获取全部的人数成绩
  async getscorelist() {
    let { ctx, service } = this
    let data = await service.user.getscorelist()
    let theoryarr = [];
    let skillarr = [];
    let timearr = [];
    await data.forEach(item => {
      theoryarr.push(item.theory)
      skillarr.push(item.skill)
      timearr.push(`${new Date(item.time).getMonth()}-${new Date(item.time).getDate()}`)
    })
    ctx.body = {
      code: 1,
      data,
      list: {
        theoryarr,
        skillarr,
        timearr
      }
    }
  }

  //获取当天成绩的学生
  async getdayscore(){
    let { ctx, service } = this
    let data = await service.user.getdayscore()
    let theoryarr = [];
    let skillarr = [];
    let timearr = [];
    await data.forEach(item => {
      theoryarr.push(item.theory)
      skillarr.push(item.skill)
      timearr.push(`${new Date(item.time).getMonth()}-${new Date(item.time).getDate()}`)
    })
    ctx.body = {
      code: 1,
      data,
      list: {
        theoryarr,
        skillarr,
        timearr
      }
    }
  }

  //分页
 async paging(){
    let { ctx, service } = this
    let {pageSize=1,limit=2}=ctx.request.body
    let pagenum=await service.user.pagenum()
    if(pageSize&&limit){
      let start=(pageSize-1)*limit
      let data= await service.user.paging(start,limit)
      ctx.body={
        code:1,
        data,
        pagenum:pagenum[0]["count(*)"]
      }
    }else{
      ctx.body={
        code:3,
        msg:"参数丢失"
      }
    }
  }
  
}

module.exports = UserController;
