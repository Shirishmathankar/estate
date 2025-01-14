import express from "express"
import {userDelete, userUpdate } from "../controllers/user.controller.js"
import verfyUser from "../utils/verifyuser.js"
import { upload } from "../utils/multer.js"
const  router=express.Router()

router.post("/update/:id",verfyUser, upload.fields([{
    name:"avatar",
    maxCount:1
  }]),userUpdate)   
router.delete("/delete/:id",verfyUser,userDelete)  
export default router    