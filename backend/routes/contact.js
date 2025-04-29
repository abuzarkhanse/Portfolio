const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // ✅ log data
    const { name, email, message } = req.body;

    const text = `
📬 *New Contact Form Submission*:

👤 *Name*: ${name}
📧 *Email*: ${email}
📝 *Message*: ${message}
    `;

    const chatId = process.env.CHAT_ID;
    const botToken = process.env.BOT_TOKEN;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await axios.post(url, {
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    });

    console.log("Telegram response:", response.data); // ✅ log success
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Telegram send error:", error); // ✅ log error
    res.status(500).send("❌ Error occurred. Please try again.");
  }
});

module.exports = router;