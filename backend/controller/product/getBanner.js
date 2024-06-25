const bannerModel = require("../../models/bannerModel");

const getBannerController = async (req, res) => {
  try {
    const allBanner = await bannerModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All Banner",
      success: true,
      error: false,
      data: allBanner,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getBannerController;
