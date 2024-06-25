const blogModel = require("../../models/blogModel");
async function UploadBlogController(req, res) {
  try {
    const uploadBlog = new blogModel(req.body);
    const saveBlog = await uploadBlog.save();

    res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveBlog,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadBlogController;
