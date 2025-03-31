import cookieParser from "cookie-parser";
import errorhandler from "./error.js";
import jwt  from "jsonwebtoken";

const verfyUser = (req, res, next) => {
    try {
   
        if (!req?.cookies || !req?.cookies?.access_token) {
            return next(errorhandler("Unauthorized: No token provided", 401));
        }

        const token = req.cookies.access_token;
    
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return next(errorhandler("Forbidden: Invalid token", 403));
            }

            req.user = user;
            next();
        });
    } catch (error) {
        next(error);
    }
};



export default verfyUser;