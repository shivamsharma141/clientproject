import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },

    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: String,
    },

    shippingAddress: {
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    items: [
      {
        productId: String,
        name: String,
        variant: String,
        price: Number,
        quantity: Number,
      },
    ],

    amount: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["ONLINE", "COD"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    orderStatus: {
      type: String,
      enum: ["PLACED", "CONFIRMED"],
      default: "PLACED",
    },

    cfPaymentId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);