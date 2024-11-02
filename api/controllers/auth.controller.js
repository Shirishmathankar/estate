import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import errorhandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup=async (req,res,next )=>{
    const {username,email,password}=req.body
    const hashpassword=bcryptjs.hashSync(password,10);
    const newuser=new User({username,email,password:hashpassword})
    try
      {  await newuser.save();
       res.status(201).json("user created succesfully")
      }
     catch (error) {
       next(error);
    }
    
}
export const signin=async (req,res,next)=>{

  const {email,password}=req.body;

  try{


    const validemail=await User.findOne({email})

    if(!validemail)return (next(errorhandler("user not found",404)))

      const validpassword=await bcryptjs.compareSync(password,validemail.password)

      if(!validpassword)return (next(errorhandler("wrong credential",401)))

        const token=jwt.sign({id:validemail._id},process.env.JWT_SECRET)

        const {password:pass,...rest}=validemail._doc

        res.cookie("access_token",token,{httpOnly:true}).status(200).json(rest)

 }
 catch(error){
  next(error);
 }
}