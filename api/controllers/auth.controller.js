import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import errorhandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import userSlice from "../../client/src/redux/user/userSlice.js";

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
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // Awaiting findOne
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;

      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generate_pass = 
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashpassword = bcryptjs.hashSync(generate_pass, 10);

      const newuser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + 
                  Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashpassword,
        avatar: req.body.photo,
      });
      await newuser.save();

      const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET); // Using newuser._id
      const { password, ...rest } = newuser._doc;

      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
}
export const signout=async (req,res,next)=>{
    try{
     res.clearCookie('access_token');
     res.status(201).json('sign out successfully')
    }
    catch(error){
       next(error);
    }
}