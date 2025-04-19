const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const chatId = '6144143160';
  const botToken = '7654084999:AAGI8c75B-k9orEIa3jD-q8jKVINCU6O8wc';
  const text = `📬 *New Contact Form Submission*:\n\n👤 *Name*: ${name}\n📧 *Email*: ${email}\n📝 *Message*: ${message}`;

  try {
    const telegramRes = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }
    );

    if (telegramRes.status === 200) {
      return res.status(200).json({ message: 'Message sent successfully' });
    } else {
      return res.status(500).json({ message: 'Telegram error' });
    }
  } catch (err) {
    console.error('Telegram send error:', err.message);
    return res.status(500).json({ message: 'Failed to send to Telegram' });
  }
});

module.exports = router;
