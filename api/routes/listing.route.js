import express from "express"
import { createListing } from "../controllers/listing.controller.js"
import { upload } from "../utils/multer.js"

const router=express.Router()


router.post('/create',upload.fields([{
    name:"imageUrls",
    maxCount:1
  }]),createListing)
 
export default router