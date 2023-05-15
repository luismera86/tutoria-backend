import { Schema, model } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  thumbnail: String,
  status: Boolean,
  stock: Number,
  code: Number,
  category: String,
});

productSchema.plugin(mongoosePaginate);
const ProductModel = model('product', productSchema);

export default ProductModel;
