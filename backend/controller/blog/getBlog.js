const blogModel = require("../../models/blogModel");
async function GetBlogController(req, res) {
  try {
    const allBlog = await blogModel.find();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: allBlog,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = GetBlogController;
