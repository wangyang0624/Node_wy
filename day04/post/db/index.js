const mysql = require('mysql');

module.exports = (sql,params=[]) => {
    let connection = mysql.createConnection({
        host:'localhost',
        port:3306,
        user:'root',
        password:'root',
        database:'wy'
    })

    //1.创建链接
    connection.connect((error) => {
        if(error){
            console.log("数据库连接失败")
        }else{
            console.log("数据库连接成功")
        }
    })

    //2.增删改查询

    return new Promise((resolve,reject) => {
        connection.query(sql,params,(error,results) => {
            if(error){
                reject(error)
            }else{
                resolve(results)
            }
            //3.关闭链接
            connection.end();
        })
    }) 
}





// module.exports = connection

// nodejs  增删改查  创建链接  关闭链接
