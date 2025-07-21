import Product from "../Model/product.model.js"

export const createProduct = async (req, res) => {
    try {
        const  product = await Product.create(req.body);
        return res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating the product.",
            error: error.message,
    })
}
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Mongoose se data fetch
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsbyid = async (req, res) => {
  try {
    const id = req.params.id; // Get the product ID from the request parameters
    const products = await Product.findById(id); // Mongoose se data fetch
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductsbyid = async (req, res) => {
  try {
    const id = req.params.id; // Get the product ID from the request parameters
    const products = await Product.findByIdAndDelete(id); // Mongoose se data fetch
    res.status(200).json({message: "Product deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

