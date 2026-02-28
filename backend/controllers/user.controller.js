const User = require("../models/User");

// Get profile
const getMyProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
const updateMyProfile = async (req, res) => {
  
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;
    user.gender = req.body.gender || user.gender;

    // Address comes as JSON string from frontend
    if (req.body.address) {
      user.address = JSON.parse(req.body.address);
    }

    // Handle profile image
    if (req.file) {
      // Save as base64 for simplicity or use cloud storage
      user.profilePic = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMyProfile, updateMyProfile };
