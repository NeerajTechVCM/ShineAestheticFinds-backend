const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
