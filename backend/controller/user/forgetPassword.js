const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function forgetPassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Ensure all required fields are provided
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Function to get hashed password from database
    const getHashedPasswordByEmail = async (email) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
        return user.password; // Assuming 'password' is the hashed password field in your schema
      } catch (error) {
        console.error("Error fetching hashed password:", error);
        throw new Error("Error fetching hashed password");
      }
    };

    // Function to verify password using bcrypt
    const verifyPassword = async (inputPassword, hashedPassword) => {
      try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
      } catch (error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Error comparing passwords");
      }
    };

    // Function to hash password using bcrypt
    const hashPassword = async (password) => {
      try {
        const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
      } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Error hashing password");
      }
    };

    try {
      // Get hashed password from database
      const hashedPasswordFromDatabase = await getHashedPasswordByEmail(email);

      // Verify old password
      const isPasswordMatch = await verifyPassword(
        oldPassword,
        hashedPasswordFromDatabase
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ error: "Invalid old password" });
      }

      // Hash new password
      const hashedNewPassword = await hashPassword(newPassword);

      // Update password in database
      await User.updateOne({ email }, { password: hashedNewPassword });

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error processing password change:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } catch (err) {
    console.error("Request error:", err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = forgetPassword;
