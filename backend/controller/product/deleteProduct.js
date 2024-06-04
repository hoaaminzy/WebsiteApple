const productModel = require("../../models/productModel");

const deleteProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;

    const product = await productModel.findByIdAndDelete(idProduct);

    res.json({
      data: product,
      message: "product",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = deleteProduct
