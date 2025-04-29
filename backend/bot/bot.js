const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = "7654084999:AAGI8c75B-k9orEIa3jD-q8jKVINCU6O8wc";

const bot = new TelegramBot(BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message);
});


bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '👋 Hello! This bot is active and working.');
});