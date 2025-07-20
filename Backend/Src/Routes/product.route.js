import express from "express";
import  { createProduct , getAllProducts } from "../Controller/product.controller.js"

const productRoute = express.Router();

productRoute.post("/",createProduct)
productRoute.get('/', getAllProducts);

export default productRoute;
