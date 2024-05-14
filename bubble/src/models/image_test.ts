import mongoose from 'mongoose';


// a product object to test the image upload function
export interface Products extends mongoose.Document {
    name: string;
    price: Number;
    productImage: String;
}

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 40},
    price: {type: Number, required: true, default: 100},
    productImage: { type: String},
})

const Product = mongoose.model<Products>('products', ProductSchema);

export default Product;
