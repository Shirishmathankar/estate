import express from "express"
import errorhandler from "../utils/error.js"
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import uploadcloudinary from "../utils/cloudinary.js"
import { Listing } from "../models/listing.model.js"

export const userUpdate = async (req, res, next) => {
  try {
    // Check if user is authorized to update this account
    if (req.user.id !== req.params.id) {
      return next(errorHandler("You can only make changes to your own account", 401));
    }

    // Initialize update fields
    const updateFields = {};

    // Hash password if provided
    if (req.body.password) {
      updateFields.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update username & email if provided
    if (req.body.username) updateFields.username = req.body.username;
    if (req.body.email) updateFields.email = req.body.email;

    // Handle Avatar Upload if Provided
    if (req.files?.avatar && req.files.avatar.length > 0) {
      const avatarLocalPath = req.files.avatar[0].path;

      try {
        const uploadedAvatar = await uploadcloudinary(avatarLocalPath);
        if (uploadedAvatar?.secure_url) {
          updateFields.avatar = uploadedAvatar.secure_url;
        }
      } catch (cloudinaryError) {
        console.error("Cloudinary Upload Error:", cloudinaryError);
        return next(errorHandler("Failed to upload avatar", 500));
      }
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(req.params.id, 
      { $set: updateFields }, 
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler("User not found", 404));
    }
// Remove password from response
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

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



export const getUserListings = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(errorHandler("Unauthorized access", 401));
    }
     
    if (req.user.id.toString() !== req.params.id) {
      return next(errorHandler("You can only check your own listings", 403));
    }

    const listings = await Listing.find({ userRef: req.params.id });

    if (!listings.length) {
      return res.status(404).json({ success: false, message: "No listings found" });
    }

    res.status(200).json({ success: true, listings });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res ,next)=>{
  try {
    
   const user =await User.findById(req.params.id);

   if(!user) return next(errorhandler("user not found!",404))
    const  {password : pass , ...rest} = user._doc
    res.status(200).json(rest)
  }
  catch(error){
    next(error);
  }
};
