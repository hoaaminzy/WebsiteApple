const bannerModel = require("../../models/bannerModel");

async function updateBannerController(req, res) {
  try {
    const { id, productImage } = req.body;

    if (!id || !productImage) {
      return res.status(400).json({
        message: "ID and productImage are required",
        error: true,
        success: false,
      });
    }

    const updateBanner = await bannerModel.findByIdAndUpdate(
      id,
      { productImage },
      { new: true }
    );

    if (!updateBanner) {
      return res.status(404).json({
        message: "Banner not found",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Banner updated successfully",
      data: updateBanner,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error updating banner:", err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateBannerController;
