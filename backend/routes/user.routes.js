const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const { getMyProfile, updateMyProfile } = require("../controllers/user.controller");
const multer = require("multer");

// Setup multer for profile image upload
const storage = multer.memoryStorage(); // store in memory, or diskStorage for disk
const upload = multer({ storage });

router.get("/me", protect, getMyProfile);

// Update profile route
router.put("/me", protect, upload.single("profilePic"), updateMyProfile);

module.exports = router;
