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
  total: {
    type: Number,
    default: 0,
  },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});

const cartModel = model("cart", cartSchema);

export { cartModel };
