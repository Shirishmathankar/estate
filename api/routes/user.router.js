import express from "express"
import {userDelete, userUpdate } from "../controllers/user.controller.js"
import verfyUser from "../utils/verifyuser.js"
import { upload } from "../utils/multer.js"
import { getUserListings} from "../controllers/user.controller.js"
import { getUser } from "../controllers/user.controller.js"
const  router=express.Router()

router.post("/update/:id",verfyUser, upload.fields([{
    name:"avatar",
    maxCount:1
  }]),userUpdate)   
router.delete("/delete/:id",verfyUser,userDelete)  
router.get("/listings/:id",verfyUser,getUserListings)
router.get("/:id",verfyUser,getUser)
export default router    