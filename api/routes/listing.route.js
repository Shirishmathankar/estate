import express from "express";
import { createListing, uploadImages } from "../controllers/listing.controller.js";
import { upload } from "../utils/multer.js";
import verfyUser from "../utils/verifyuser.js";
import { deleteListing } from "../controllers/listing.controller.js";
import { updateListing } from "../controllers/listing.controller.js";
import { getListing } from "../controllers/listing.controller.js";
import { getListings } from "../controllers/listing.controller.js";

const router = express.Router();


router.post(
  "/create",
  upload.fields([{ name: "imageUrls", maxCount: 7 }]), 
  createListing
);

router.post(
  "/upload",
  upload.array("images", 6), 
  uploadImages
);
router.delete("/delete/:id",verfyUser,deleteListing)
router.post("/update/:id",verfyUser,updateListing)
router.get("/getListing/:id",getListing)
router.get("/get",getListings)
export default router;
