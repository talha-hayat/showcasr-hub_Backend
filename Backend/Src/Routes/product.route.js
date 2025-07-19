import express from "express";
import createProduct from "../Controller/product.controller.js"

const productRoute = express.Router();

productRoute.post("/",createProduct)

export default productRoute;
