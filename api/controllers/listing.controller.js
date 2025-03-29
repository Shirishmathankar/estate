import { Listing } from "../models/listing.model.js";
import uploadcloudinary from "../utils/cloudinary.js";

export const createListing = async (req, res, next) => {
  try {
   

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "❌ Form data is missing. Check Postman settings." });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      

      try {
        imageUrls = await Promise.all(
          req.files.map(async (file) => {
            
            const uploadResult = await uploadcloudinary(file.path);
          
            return uploadResult?.secure_url || null;
          })
        );

        // Remove any `null` values (if upload fails for some)
        imageUrls = imageUrls.filter(url => url);
      } catch (error) {
        return next(errorHandler("Failed to upload images", 500));
      }
    } else {
      console.warn("⚠️ No images found in request");
    }

    // 2️⃣ **Save Listing in MongoDB After Upload**
    const listing = new Listing({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      regularPrice: Number(req.body.regularPrice),
      discountPrice: Number(req.body.discountPrice),
      bathrooms: Number(req.body.bathrooms),
      bedrooms: Number(req.body.bedrooms),
      furnished: req.body.furnished === "true",
      parking: req.body.parking === "true",
      type: req.body.type === "true",
      offer: req.body.offer === "true",
      userRef: req.body.userRef,
      imageUrls: imageUrls, 
    });

    await listing.save();

    console.log("✅ Listing Saved in MongoDB:", listing);
    res.status(201).json({ message: "✅ Listing created successfully", listing });
  } catch (error) {
    console.error("❌ Error Creating Listing:", error);
    next(error);
  }
};
