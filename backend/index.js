const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const crypto = require("crypto");
const axios = require("axios");
const paymentModel = require("./models/paymentModel");

const app = express();
const PORT = 8080;

const allowedOrigins = [process.env.FRONTEND_URL];
const config = {
  accessKey: "F8BBA842ECF85",
  secretKey: "K951B6PE1waDMi640xX08PD3vg6EkVlz",
  orderInfo: "pay with MoMo",
  partnerCode: "MOMO",
  redirectUrl: "http://localhost:3000/",
  ipnUrl:
    "https://65e2-2402-800-6236-3444-ccd2-7863-b0b-73dd.ngrok-free.app/callback",
  requestType: "captureWallet",
  extraData: "",
  orderGroupId: "",
  autoCapture: true,
  lang: "vi",
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use("/api", router);

app.post("/payment", async (req, res) => {
  const {
    accessKey,
    secretKey,
    orderInfo,
    partnerCode,
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    orderGroupId,
    autoCapture,
    lang,
  } = config;

  const { totalPrice, userId, products } = req.body;
  if (!totalPrice) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Total price is required" });
  }

  const amount = totalPrice.toString();
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  };

  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const formattedProducts = products.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
      price: product.sellingPrice,
    }));

    const payment = new paymentModel({
      pay: [response.data],
      userId: userId,
      products: formattedProducts,
    });
    await payment.save();

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
});

app.post("/callback", async (req, res) => {
  console.log("callback:", req.body);

  // try {
  //   const payment = await paymentModel.findOneAndUpdate(
  //     { "pay.orderId": req.body.orderId },
  //     { $set: { pay: req.body } },
  //     { new: true }
  //   );

  //   if (!payment) {
  //     // Nếu không tìm thấy thanh toán phù hợp, tạo mới
  //     const newPayment = new paymentModel({
  //       pay: [req.body],
  //       userId: "Unknown", // Bạn có thể cập nhật mã này để lưu userId phù hợp
  //     });
  //     await newPayment.save();
  //   }

  //   return res.status(204).json(req.body);
  // } catch (error) {
  //   return res.status(500).json({ statusCode: 500, message: error.message });
  // }
});

app.post("/check-status-transaction", async (req, res) => {
  const { orderId } = req.body;

  const rawSignature = `accessKey=${config.accessKey}&orderId=${orderId}&partnerCode=${config.partnerCode}&requestId=${orderId}`;
  const signature = crypto
    .createHmac("sha256", config.secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = {
    partnerCode: config.partnerCode,
    requestId: orderId,
    orderId,
    signature,
    lang: "vi",
  };

  try {
    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/query",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
});
app.get("/allPayments", async (req, res) => {
  try {
    const payments = await paymentModel.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running on port " + PORT);
  });
});
