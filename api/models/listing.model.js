import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
      validate: {
        validator: function (value) {
          return value < this.regularPrice; // Ensures discount price is lower
        },
        message: "Discount price should be less than regular price",
      },
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: 1,
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: 1,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: Boolean,
      default: false,
    },
    type:{
        type:String,
        required:true

    },
    imageUrls: {
      type: [String], // Ensures array of strings (URLs)
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one image URL is required",
      },
    },
    userRef: {
      type:String,
      require:true
    },
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listingSchema);
