import express from 'express';
import { createproduct } from '../Controller/product.controller.js';
import upload from '../middleware/multer.js';

const productRoute = express.Router();

productRoute.post("/", upload.single("image"), createproduct);

export default productRoute;