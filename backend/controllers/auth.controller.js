const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// SIGN UP
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, gender } = req.body;

    console.log("Signup payload received:", req.body);

    // 1️⃣ Validate required fields
    if (!firstName || !lastName || !email || !phone || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 3️⃣ Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    console.log("User exists check result:", userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5️⃣ Create user
    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      gender,
      profilePic:
        req.body.profilePic ||
        "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    });

    console.log("User created successfully:", user);

    // 6️⃣ Respond with token
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Failed to register user:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
};


// LOGIN
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
