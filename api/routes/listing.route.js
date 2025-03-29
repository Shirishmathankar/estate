import express from "express";
import { createListing, uploadImages } from "../controllers/listing.controller.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

// ✅ Route for creating a listing with multiple image uploads
router.post(
  "/create",
  upload.fields([{ name: "imageUrls", maxCount: 7 }]), 
  createListing
);

// ✅ Separate route for uploading images
router.post(
  "/upload",
  upload.array("images", 6), 
  uploadImages
);

export default router;
