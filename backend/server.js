const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path"); // ✅ ADDED

dotenv.config();

// ---------- Connect MongoDB ----------
connectDB();

const app = express();

// ---------- CORS ----------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ---------- Body Parsers ----------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Or alternatively:
// app.use("/uploads", express.static("uploads"));

// ---------- Routes ----------
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/products", require("./routes/productRoutes"));

// ---------- Health Check (optional but helpful) ----------
app.get("/", (req, res) => {
  res.send("API running successfully");
});

// ---------- Global Error Handler ----------
app.use((err, req, res, next) => {
  console.error("Global error:", err.message);
  res.status(500).json({ message: err.message });
});

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
