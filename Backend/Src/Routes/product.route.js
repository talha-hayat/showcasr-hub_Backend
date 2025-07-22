import express from "express";
import  { createProduct , deleteProductsbyid, editProductsbyid, getAllProducts, getProductsbyid } from "../Controller/product.controller.js"

const productRoute = express.Router();

productRoute.post("/",createProduct)
productRoute.get('/', getAllProducts);
productRoute.get('/:id', getProductsbyid);
productRoute.delete('/:id', deleteProductsbyid);
productRoute.put('/:id', editProductsbyid);

export default productRoute;
