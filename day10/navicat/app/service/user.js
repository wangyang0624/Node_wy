const Service = require('egg').Service;
const moment = require("moment")

class UserService extends Service {

    //登录
    async login(num, password) {
        let res = await this.app.mysql.query('select * from xmlist where num=? and password=?', [num, password]);
        return res;
    }

    //注册
    async register(name, pwd, num, role) {
        let res = await this.app.mysql.query("insert into xmlist (username,password,num,role) values (?,?,?,?)", [name, pwd, num, role]);
        return res;
    }

    //校验
    async jy(num) {
        let res = await this.app.mysql.query('select * from xmlist where num=?', [num]);
        return res
    }

    //角色+对应的东西
    async menu(roleId) {
        return this.app.mysql.query(`select * from menulist where power like '%${roleId}%'`)
    }

    //删除录入成绩
    async del(id) {
        return this.app.mysql.query("delete from scorelist where id=?", [id])
    }

    //获取没有录入所有学生
    async student() {
        let time = moment().format("YYYY-MM-DD");
        return this.app.mysql.query('select * from xmlist where xmlist.num not  in (select num from scorelist where DATE_FORMAT(scorelist.time,"%Y-%m-%d")=?) and role not in (1)',
         [time]);
    }

    //获取所有学生
    async getxmlist(){
        return this.app.mysql.query("select * from xmlist where xmlist.role not in (1)")
    }

    //删除成员
    async delxmlist(id){
        return this.app.mysql.query("delete from xmlist where id=?",[id])
    }

  //获取全部的人数
    async getscorelist(){
        return this.app.mysql.query("select * from scorelist")
    }

    //获取今天成绩的学生
    async getdayscore(){
        let time = moment().format("YYYY-MM-DD");
        return this.app.mysql.query("select * from scorelist where DATE_FORMAT(scorelist.time,'%Y-%m-%d')=?",[time])
    }

    //总条数
    async pagenum(){
        let time = this.ctx.helper.time();

        return this.app.mysql.query("select count(*) from scorelist where DATE_FORMAT(scorelist.time,'%Y-%m-%d')=?",[time])
    }

    //分页
    async paging(start,limit){
        return this.app.mysql.query(`select * from scorelist limit ${start},${limit}`)
    }
}

module.exports = UserService;
