const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = await Contact.create({ name, email, message });
    res.status(201).json({ message: "Message sent successfully", contact: newContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
