const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select("-password");
      if (!admin) throw new Error("Not authorized");
      req.admin = admin;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ message: "No token found" });
  }
};

module.exports = adminProtect;
