// const productModel = require("../../models/productModel")

// const getProductController = async(req,res)=>{
//     try{
//         const allProduct = await productModel.find().sort({ createdAt : -1 })

//         res.json({
//             message : "All Product",
//             success : true,
//             error : false,
//             data : allProduct
//         })

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }

// }

// module.exports = getProductController
const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    // Nhận tham số phân trang từ query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Tìm tất cả sản phẩm với phân trang
    const allProduct = await productModel
      .find()
      .sort({ createdAt: -1 })
      // .skip(skip)
      // .limit(limit);

    // Tính tổng số sản phẩm
    const totalProducts = await productModel.countDocuments();

    res.json({
      message: "All Product",
      success: true,
      error: false,
      data: allProduct,
      total: totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
