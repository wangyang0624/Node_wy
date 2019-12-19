'use strict';

const Service = require('egg').Service;

class ScoresService extends Service {
   //录入成绩
   async addscore(theory,skill,username,num,time){
        return this.app.mysql.query("insert into scorelist (theory,skill,username,num,time) values (?,?,?,?,?)",
        [theory,skill,username,num,time])
   }

   //获取今天录入成绩的学生
   async scorelist(item){
    return this.app.mysql.query('select * from scorelist where date_format(time,"%Y-%m-%d")=?',[item])
   }

   //修改成绩
   async updates(theory,skill,id){
      return this.app.mysql.query('update scorelist set theory=?,skill=? where id=?',[theory,skill,id])
   }

   //模糊搜索
   async like(key){
      let time = this.ctx.helper.time();
      return this.app.mysql.query(`select * from scorelist where username like '%${key}%' and date_format(time,"%Y-%m-%d")='${time}'`)
   }

   //修改信息
   async updateon(username,num,role,id){
      await this.app.mysql.query('update xmlist set username=?,num=?,role=? where id=?',[username,num,role,id])
   }

   //详情
   async delit(num){
     return await this.app.mysql.query('select * from scorelist where num=?',[num])
   }


   //区间
   async area(areas,string){
      let min=areas.split("-")[0];
      let max=areas.split("-")[1];
      let time = this.ctx.helper.time();
      return await this.app.mysql.query( `select count(*) from scorelist where (scorelist.${string}>=${min} and scorelist.${string}<=${max})
      and date_format(scorelist.time,'%Y-%m-%d')=?
      `,[time])
   }
}

module.exports = ScoresService;
