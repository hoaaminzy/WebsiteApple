const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const deleteProduct = require("../controller/product/deleteProduct");
const FeedBackProductController = require("../controller/product/feedbackProduct");
const getFeedBackController = require("../controller/product/getFeedBack");
const getBannerController = require("../controller/product/getBanner");
const BannerProductController = require("../controller/product/bannerProduct");
const updateBannerController = require("../controller/product/updateBanner");
const updatePaymentStatusController = require("../controller/product/updateCod");
const UploadBlogController = require("../controller/blog/uploadBlog");
const GetBlogController = require("../controller/blog/getBlog");
const forgetPassword = require("../controller/user/forgetPassword");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post("/forgetPassword", forgetPassword);
//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

//product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);
router.delete("/delete-product/:id", deleteProduct);
router.post("/feedbackProduct", FeedBackProductController);
router.get("/allFeedBack", getFeedBackController);
router.get("/allBanner", getBannerController);
router.post("/create-banner", BannerProductController);
router.post("/update-banner", updateBannerController);
router.post("/updatePaymentStatus/:id", updatePaymentStatusController);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

//blog
router.post("/create-blog", UploadBlogController);
router.get("/all-blog", GetBlogController);
module.exports = router;
