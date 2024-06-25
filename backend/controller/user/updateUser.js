const userModel = require("../../models/userModel");

async function updateUser(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, address, email, name, role, numberphone, profilePic } =
      req.body;

    // Construct payload with only fields that are provided and need updating
    const payload = {};
    if (email) payload.email = email;
    if (name) payload.name = name;
    if (address) payload.address = address;
    if (numberphone) payload.numberphone = numberphone;
    if (profilePic) payload.profilePic = profilePic;
    if (role) payload.role = role;

    // Find and update user by userId
    const updateUser = await userModel.findByIdAndUpdate(userId, payload, {
      new: true, // Return the updated document
    });

    // Check if user was found and updated
    if (!updateUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    res.json({
      data: updateUser,
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUser;
