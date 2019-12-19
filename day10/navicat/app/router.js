'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.index);

  //登录
  router.post("/login",controller.user.login)

  //注册
  router.post("/register",controller.user.register)

  //根据角色查询菜单
  router.get("/menu",controller.user.menu)

  //删除录入成绩学生
  router.get('/del',controller.user.del)

  //获取没有录入所有学生
  router.get("/students",controller.user.students)

  //录入成绩
  router.post("/score",controller.scores.score)

  //查询今天录入成绩的学生
  router.get("/scorelist",controller.scores.scorelist)

  //修改成绩
  router.post("/update",controller.scores.update)

  //模糊搜索
  router.get("/like",controller.scores.like)

  //获取所有学生
  router.get('/getxmlist',controller.user.getxmlist)

  //删除成员
  router.get("/delxmlist",controller.user.delxmlist)

  //修改成员
  router.post("/updateon",controller.scores.updateon)

  //查看详情
  router.get("/delit",controller.scores.delit)

  //获取所有学生成绩
  router.get("/getscorelist",controller.user.getscorelist)

  //获取当天学生成绩
  router.get('/getdayscore',controller.user.getdayscore)

  //进入区间
  router.get("/area",controller.scores.area)

  //分页
  router.post("/paging",controller.user.paging)  
};
