import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: Number,
      },
    ],
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product")
})

const Cart = model("cart", cartSchema);

export default Cart;
