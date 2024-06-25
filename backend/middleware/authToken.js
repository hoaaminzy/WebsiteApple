const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Error in auth:", err);

        // Check for token expiration
        const errorMessage =
          err.name === "TokenExpiredError"
            ? "Token expired. Please login again."
            : "Invalid token. Please login again.";

        return res.status(403).json({
          message: errorMessage,
          error: true,
          success: false,
        });
      }

      console.log("Decoded:", decoded);

      req.userId = decoded._id;
      next();
    });
  } catch (err) {
    console.error("Catch error:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
