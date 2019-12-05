let connection = require('./index')

function query(sql,params=[]){
    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(error,results)=>{
            if(error){
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports=query