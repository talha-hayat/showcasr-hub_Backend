import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
    }
    ,
    price: {
        type: String,
    }
    ,
    description: {
        type: String,
    }
    ,
    imageurl: {
        type: String,
    }
})

const Product = model('Product', productSchema);
export default Product;

