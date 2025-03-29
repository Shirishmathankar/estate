
import mongoose from "mongoose";
import { Listing } from "../models/listing.model.js";
import uploadcloudinary from "../utils/cloudinary.js";

export const createListing = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "❌ Form data is missing. Check Postman settings." });
    }
 console.log(req.body.imageUrls,req.body.regularPrice,req.body.discountPrice)
    // ✅ Ensure imageUrls exist and are an array
    let imageUrls = req.body.imageUrls;
    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({ message: "❌ No images provided. Upload images first." });
    }

    // ✅ Convert `regularPrice` and `discountPrice` to numbers
    const regularPrice = Number(req.body.regularPrice);
    const discountPrice = Number(req.body.discountPrice);

    if (isNaN(regularPrice) || isNaN(discountPrice)) {
      return res.status(400).json({ message: "❌ Prices must be valid numbers." });
    }

    // ✅ Validate discount price
    if (discountPrice >= regularPrice) {
      return res.status(400).json({ message: "❌ Discount price must be less than regular price." });
    }

    // ✅ Ensure `userRef` is a valid ObjectId
    

    const listing = new Listing({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      regularPrice,
      discountPrice,
      bathrooms: Number(req.body.bathrooms) || 1, // Default to 1 if missing
      bedrooms: Number(req.body.bedrooms) || 1, // Default to 1 if missing
      furnished: req.body.furnished === "true",
      parking: req.body.parking === "true",
      type: req.body.type,
      offer: req.body.offer === "true",
      userRef: req.body.userRef,
      imageUrls,
    });

    await listing.save();

    console.log("✅ Listing Saved in MongoDB:", listing);
    res.status(201).json({ message: "✅ Listing created successfully", listing });
  } catch (error) {
    console.error("❌ Error Creating Listing:", error);
    next(error);
  }
};



export const uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "❌ No images found in request." });
    }

    let imageUrls = [];

    try {
      imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const uploadResult = await uploadcloudinary(file.path);
          return uploadResult?.secure_url || null;
        })
      );

      // Remove any `null` values (if upload fails for some images)
      imageUrls = imageUrls.filter(url => url);
    } catch (error) {
      console.error("❌ Image Upload Failed:", error);
      return res.status(500).json({ success: false, message: "❌ Image upload failed." });
    }

    console.log("✅ Images uploaded:", imageUrls);
    res.status(200).json({ success: true, imageUrls });
  } catch (error) {
    console.error("❌ Error in uploadImages API:", error);
    next(error);
  }
};

