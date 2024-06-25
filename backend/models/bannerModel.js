const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    productImage: [],
  },
  {
    timestamps: true,
  }
);

const bannerModel = mongoose.model("banner", bannerSchema);

module.exports = bannerModel;
