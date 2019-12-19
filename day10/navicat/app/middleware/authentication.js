const jwt=require("jsonwebtoken")
module.exports=()=>{
    return async(ctx,next)=>{
        let writeArr=['/login','/register']

        if(writeArr.includes(ctx.path)){
            await next()
        }else{
            try{
                let token=ctx.get('token');
                ctx.into =jwt.verify(token,"jiaoyan");
                await next();
            }catch(e){
                ctx.body={
                    code:0,
                    msg:e
                }
            }
        }
    }
}