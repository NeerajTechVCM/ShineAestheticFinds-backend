const Product = require("../model/products");


module.exports.uploadProduct = async (req, res) => {
  const { name, link, image, description } = req.body;

  // Basic validation
  if (!name || !link || !image || !description) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Create new product
    const newProduct = new Product({
      name,
      link,
      image,
      description,
      // uploadedBy: req.user?.id, // Uncomment if using authentication
    });

    // Save to database
    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error uploading product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while uploading product",
    });
  }
};



exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};


exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, link, description } = req.body;

    // Validate input
    if (!name && !image && !link && !description) {
        return res.status(400).json({ message: 'No fields to update provided', success: false });
    }

const updateproduct={};
if (name){
    updateproduct.name=name;
 }
if (image){
    updateproduct.image=image;
 }
if (link){
    updateproduct.link=link;
 }
if (description){
    updateproduct.description=description;
 }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateproduct, { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while editing product.",
    });
  }
};
