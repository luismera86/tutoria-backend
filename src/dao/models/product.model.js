import { Schema, model } from "mongoose";

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

const Product = model("product", productSchema);

export default Product;
