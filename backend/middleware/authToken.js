const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("token", token);

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("Error in auth:", err);
        return res.status(403).json({
          message: "Invalid or expired token. Please login again.",
          error: true,
          success: false,
        });
      }

      console.log("decoded", decoded);

      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    console.log("Catch error:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
