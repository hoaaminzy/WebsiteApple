const bannerModel = require("../../models/bannerModel");

async function BannerProductController(req, res) {
  try {
    const { image } = req.body;

    const bannerProduct = new bannerModel(req.body);
    const saveBannerProduct = await bannerProduct.save();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveBannerProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = BannerProductController;
