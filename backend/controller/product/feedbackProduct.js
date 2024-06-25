const feedBackModel = require("../../models/feedBackModel");

async function FeedBackProductController(req, res) {
  try {
    const { name, rating, numberphone, review, userId, productId } =
      req.body;

    const feedbackProduct = new feedBackModel(req.body);
    const saveFeedBackProduct = await feedbackProduct.save();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,  
      data: saveFeedBackProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = FeedBackProductController;
