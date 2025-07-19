import Product from "../Model/product.model.js";

export const createproduct = async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        return res.status(201).json({
            message: "Product created successfully",
            product: product
        })

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating product.",
            error: error.message
        });
    }
}