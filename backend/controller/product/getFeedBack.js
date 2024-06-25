const feedBackModel = require("../../models/feedBackModel");

const getFeedBackController = async (req, res) => {
  try {
    const allFeedBack = await feedBackModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All FeedBack",
      success: true,
      error: false,
      data: allFeedBack,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getFeedBackController;
