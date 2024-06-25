const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const moment = require("moment");
const qs = require("qs");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const axios = require("axios");
const paymentModel = require("./models/paymentModel");
const paymentZaloModel = require("./models/paymentModelZalo");
const codModel = require("./models/codModel");
const productModel = require("./models/productModel");
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
const configZalo = {
  app_id: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create", // Ensure this is correct
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

app.post("/paymentZalo", async (req, res) => {
  const { totalPrice, userId, products, user } = req.body;

  const embed_data = {
    redirecturl: "http://localhost:3000/checkout", // Replace with your actual success URL
  };

  const transID = Math.floor(Math.random() * 1000000);

  const order = {
    app_id: configZalo.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: userId,
    app_time: Date.now(),
    item: JSON.stringify(
      products.map((item) => ({
        _id: item._id,
        quantity: item.quantity,
        sellingPrice: item.sellingPrice,
      }))
    ),
    embed_data: JSON.stringify(embed_data),
    amount: totalPrice,
    callback_url: "https://c6d0-2001-ee0-4b77-f1b0-b8e8-6076-e9b3-f436.ngrok-free.app/callbackZalo", // Replace with your actual callback URL
    description: `TopZone - Payment for order #${transID}`,
    bank_code: "",
  };

  const data = `${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, configZalo.key1).toString();

  try {
    const formattedProducts = products.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.sellingPrice,
    }));

    const paymentZalo = new paymentZaloModel({
      pay: order,
      userId: userId,
      products: formattedProducts,
      user: user,
    });
    await paymentZalo.save();

    const result = await axios.post(configZalo.endpoint, null, {
      params: order,
    });

    if (result.data.return_code !== 1) {
      throw new Error(result.data.return_message);
    }

    return res.status(200).json(result.data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

//Callback endpoint from ZaloPay
app.post("/callbackZalo", (req, res) => {
  let result = {};
  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    const mac = CryptoJS.HmacSHA256(dataStr, configZalo.key2).toString();

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
    } else {
      const dataJson = JSON.parse(dataStr);
      console.log(
        "Update order status to success where app_trans_id =",
        dataJson.app_trans_id
      );
      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    console.error("Error:", ex.message);
    result.return_code = 0;
    result.return_message = ex.message;
  }

  res.json(result);
});

//Check payment status endpoint
app.post("/check-status-order-zalo", async (req, res) => {
  const { app_trans_id } = req.body;

  const postData = {
    app_id: configZalo.app_id,
    app_trans_id,
  };

  const data =
    postData.app_id + "|" + postData.app_trans_id + "|" + configZalo.key1;
  postData.mac = CryptoJS.HmacSHA256(data, configZalo.key1).toString();

  const postConfig = {
    method: "post",
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams(postData).toString(),
  };

  try {
    const result = await axios(postConfig);
    console.log(result.data);
    return res.status(200).json(result.data);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/paymentCod", async (req, res) => {
  const { totalPrice, userId, products, user } = req.body;
  try {
    const formattedProducts = products.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
      price: product.sellingPrice,
    }));

    // Update star count for each product
    for (const product of formattedProducts) {
      await productModel.findByIdAndUpdate(product.productId, {
        $inc: { star: 1 },
      });
    }

    const cod = new codModel({
      userId: userId,
      products: formattedProducts,
      user: user,
      total: totalPrice,
    });
    const savedCod = await cod.save();

    return res.status(200).json(savedCod);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
});

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

  const { totalPrice, userId, products, user } = req.body;
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

    for (const product of formattedProducts) {
      await productModel.findByIdAndUpdate(product.productId, {
        $inc: { star: 1 },
      });
    }

    const payment = new paymentModel({
      pay: [response.data],
      userId: userId,
      products: formattedProducts,
      user: user,
    });
    await payment.save();

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
});

app.post("/callback", async (req, res) => {
  console.log("callback:", req.body);

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

app.get("/allCodPayments", async (req, res) => {
  try {
    const codPayments = await codModel.find().sort({ createdAt: -1 });
    res.status(200).json(codPayments);
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
