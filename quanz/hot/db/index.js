let mysql=require("mysql")

module.exports=(sql,params=[])=>{
    let connection=mysql.createConnection({
        port:3306,host:"localhost",user:"root",password:"root",database:"zic"
    })

    connection.connect((error)=>{
        if(error){
            console.log("链接失败")
        }else{
            console.log("链接成功")
        }
    })

    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(error,result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
            
            connection.end()
        })
    })
}