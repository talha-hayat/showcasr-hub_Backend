import express from 'express';
import { createproduct } from '../controller/product.controller.js';

const productRoute = express.Router();

productRoute.post("/",createproduct)

export default productRoute;