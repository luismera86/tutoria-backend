import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product"
        },
        quantity: Number
      },
    ],
    default: []

  },
});

cartSchema.pre("find", function () {
  this.populate("products.product")
})

const CartModel = model('cart', cartSchema);

export default CartModel;
