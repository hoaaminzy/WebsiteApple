const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    numberphone: String,
    review: String,
    userId: String,
    productId: Object,
  },
  {
    timestamps: true,
  }
);

const feedBackModel = mongoose.model("feedback", feedBackSchema);

module.exports = feedBackModel;
