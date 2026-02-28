const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, admin: { email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { adminLogin };
