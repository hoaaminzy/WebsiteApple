const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const codSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
    },
    payments: {
      type: String,
      default: "COD",
    },
    status: {
      type: String,
      default: "Chưa thanh toán",
    },
    total: {
      type: String,
    },
    products: {
      type: [productSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const codModel = mongoose.model("Cod", codSchema);

module.exports = codModel;
