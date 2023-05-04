import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: [
    {
      title: String,
      price: Number,
      description: String,
      thumbnail: String,
      status: Boolean,
      stock: Number,
      code: Number,
      category: String,
    },
  ],
});

const Cart = model('cart', cartSchema);

export default Cart;
