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

const paymentZaloSchema = new mongoose.Schema(
  {
    pay: {
      type: Array,
    },
    userId: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
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

const paymentZaloModel = mongoose.model("paymentZalo", paymentZaloSchema);

module.exports = paymentZaloModel;
