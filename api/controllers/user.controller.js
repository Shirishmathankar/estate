import express from "express"
import errorhandler from "../utils/error.js"
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import uploadcloudinary from "../utils/cloudinary.js"


export const userUpdate= async (req,res,next)=>{
    if(req.user.id!=req.params.id){
     return next(errorhandler("you can do changes only in your account",401))
    }
    try{
      if(req.body.password){
        req.body.password= bcryptjs.hashSync(req.body.password,10)
      }

      const avatarlocalpath=await req.files?.avatar[0]?.path;
    console.log(avatarlocalpath)
     const avatar=await uploadcloudinary(avatarlocalpath)
      
      const updateUser= await User.findByIdAndUpdate(req.params.id,{
      $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:avatar.secure_url
      }
 
      },{new:true})
      console.log(updateUser) 
      const {password , ...rest}=updateUser._doc
      res.status(200).json(rest);
    }
    catch(error){
       next(error);
    }    
  
}

export const userDelete=async (req,res,next)=>{

   if(req.user.id!=req.params.id){
    next(errorhandler(401,"you can delete only your account"));
    }
    try{
       await User.findByIdAndDelete(req.user.id);
       res.clearCookie("access_token")
       res.status(200).json("user delete successfully");
    }
    catch(error){
      next(error);
    }

}

