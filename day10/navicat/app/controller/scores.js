'use strict';

const Controller = require('egg').Controller;

class ScoresController extends Controller {
  //录入成绩
  async score() {
    let { ctx, service } = this
    let { theory, skill, username, num } = ctx.request.body
    let { roleId } = ctx.into
    let time = ctx.helper.time()
    if (theory && skill && username && num) {
      if (roleId == 1 || roleId == 2) {
        try {
          let addscores = await service.scores.addscore(theory, skill, username, num, time)
          ctx.body = {
            code: 1,
            msg: "录入成功",
            addscores
          }
        } catch (e) {
          ctx.body = {
            code: 0,
            msg: "录入失败"
          }
        }
      } else {
        ctx.body = {
          code: 4,
          msg: "权限不足"
        }
      }
    } else {
      ctx.body = {
        code: 3,
        msg: "参数丢失"
      }
    }
  }

  //查询今天录入成绩的学生
  async scorelist() {
    let { ctx, service } = this
    let time = ctx.helper.time()
    let theoryarr = [];
    let skillarr = [];
    let name = [];
    let scorelists = await service.scores.scorelist(time)
    await scorelists.forEach(item => {
      theoryarr.push(item.theory)
      skillarr.push(item.skill)
      name.push(item.username)
    })
    ctx.body = {
      code: 1,
      data: scorelists,
      list: {
        theoryarr,
        skillarr,
        name
      }
    }
  }

  //修改成绩
  async update() {
    let { ctx, service } = this
    let { id, theory, skill } = ctx.request.body
    let { roleId } = ctx.into
    if (id && theory && skill) {
      if (roleId == 2 || roleId == 1) {
        let list = await service.scores.updates(theory, skill, id)
        ctx.body = {
          code: 1,
          msg: "修改成功",
          list
        }
      } else {
        ctx.body = {
          code: 4,
          msg: "权限不足"
        }
      }
    } else {
      ctx.body = {
        code: 3,
        msg: "参数丢失"
      }
    }
  }


  //模糊搜索
  async like() {
    let { ctx, service } = this
    let { key } = ctx.query
    let data = await service.scores.like(key);
    if(data.length){
      ctx.body = {
        code: 1,
        data
      }
    }else{
      ctx.body = {
        code: 0,
        msg:"未找到"
      }
    }
  }

  //修改成员信息
  async updateon() {
    let { ctx, service } = this
    let { username, num, id, role } = ctx.request.body
    let { roleId } = ctx.into
    if (roleId == 1 || roleId == 2) {
      if (username && num && id) {
        await service.scores.updateon(username, num, role, id)
        ctx.body = {
          code: 1,
          msg: "修改成功"
        }
      } else {
        ctx.body = {
          code: 3,
          msg: "参数丢失"
        }
      }
    } else {
      ctx.body = {
        code: 4,
        msg: "权限不足"
      }
    }
  }

  //详情
  async delit() {
    let { ctx, service } = this
    let { num } = ctx.query
    if (num) {
      let data = await service.scores.delit(num)
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
        msg: "获取数据",
        data: {
          theoryarr,
          skillarr,
          timearr
        }
      }
    } else {
      ctx.body = {
        code: 3,
        msg: "参数丢失"
      }
    }
  }

  //今日区间
  async area() {
    let { ctx, service } = this
    let areas = ["0-69", '70-79', '80-89', '90-100']
    let arr = []
    try {
      for (var i = 0; i < areas.length; i++) {
        let aa = await service.scores.area(areas[i], 'theory')
        let bb = await service.scores.area(areas[i], 'skill')
        arr.push({ product: areas[i], '理论': aa[0]['count(*)'], '技能': bb[0]["count(*)"] })
      }
      ctx.body = {
        code: 1,
        data:{
          arr,
          areas
        }
      }
    } catch (e) {
      ctx.body = {
        code: 0,
        msg: e
      }
    }
  }


}

module.exports = ScoresController;
