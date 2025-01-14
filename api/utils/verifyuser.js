import cookieParser from "cookie-parser";
import errorhandler from "./error.js";
import jwt  from "jsonwebtoken";

const verfyUser=async (req,res,next)=>{
    const token = req.cookies?.access_token;
    if(!token)return next(errorhandler("unauthorize",401));

    await  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorhandler("forbidden",403));
        req.user=user;
        next();
     })
    
     

}
export default verfyUser;