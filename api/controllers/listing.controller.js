import mongoose from "mongoose"
import { Listing } from "../models/listing.model.js";
import uploadcloudinary from "../utils/cloudinary.js";
import errorhandler from "../utils/error.js";

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
      furnished: req.body.furnished,
      parking: req.body.parking,
      type: req.body.type,
      offer: req.body.offer,
      userRef: req.body.userRef,
      imageUrls,
    });

    await listing.save();

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
    res.status(200).json({ success: true, imageUrls });
  } catch (error) {
    console.error("❌ Error in uploadImages API:", error);
    next(error);
  }
};

export const deleteListing = async(req, res ,next) =>{
    const listing= await Listing.findById(req.params.id);
    if(!listing){
      return next(errorhandler('listing not found ', 404))
    }
    if(req.user.id!==listing.userRef.toString()){
      return next(errorhandler('you can only delete your listings',401))
    }

    try {
      await Listing.findByIdAndDelete(req.params.id)
      res.status(201).json("listing Created succesfully")
    } catch (error) {
      next(error)
    }
};

export const updateListing = async(req,res,next)=>{
  const listing = await Listing.findById(req.params.id)
  if(!listing){
    next(errorhandler("listing not found",400))
  }
  if(req.user.id!==listing.userRef.toString())
  {
    next(errorhandler("you can edit only your listing", 402))
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.status(200).json(updatedListing)
  } catch (error) {
    next(error)
  }
}
export const getListing = async(req,res,next)=>{
   const listing=await Listing.findById(req.params.id)
   if(!listing){
    next(errorhandler("no listing found",400))
   }
   try {
    res.status(200).json(listing)
   } catch (error) {
    next(error)
   }
}
export const getListings=async(req,res,next)=>{
  try {
    const limit=parseInt(req.query.limit)||9;
    const startIndex=parseInt(req.query.startIndex)||0;
    let offer=req.query.offer;

    if(offer === undefined|| offer==='false'){
      offer = { $in : [false,true]}
    }

    let furnished = req.query.furnished;

    if(furnished === undefined || furnished === 'false'){
      furnished = { $in : [false , true]};
    }

    let parking = req.query.parking;

    if(parking === undefined || parking === 'false'){
      parking ={$in : [false , true]};
    }

    let type=req.query.type;

    if(type===undefined || type === 'all'){
      type = { $in : ['sell' , 'rent']};
    }

    const searchTerm = req.query.searchTerm ||'';

    const sort = req.query.order || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
       name : {$regex: searchTerm, $options: 'i'},
       offer,
       furnished,
       parking,
       type
    }).sort(
      {[sort]: order}
    ).limit(limit).skip(startIndex);

    return res.status(200).json(listings);
    
  } catch (error) {
    next(error)
  }
}