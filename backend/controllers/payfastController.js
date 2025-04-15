const qs = require('qs');
const { generateSignature } = require('../utils/generateSignature');

exports.initiatePayment = (req, res) => {
  const { name, email, amount } = req.body;

  const paymentData = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    return_url: process.env.PAYFAST_RETURN_URL,
    cancel_url: process.env.PAYFAST_CANCEL_URL,
    notify_url: process.env.PAYFAST_NOTIFY_URL,
    amount: Number(amount).toFixed(2),
    item_name: 'Website Plan',
    name_first: name || 'Customer',
    email_address: email || 'example@example.com',
  };

  const signature = generateSignature(paymentData);
  const queryString = qs.stringify({ ...paymentData, signature });

  const paymentUrl = `https://www.payfast.co.za/eng/process?${queryString}`;
  res.json({ paymentUrl });
};

exports.handleIPN = (req, res) => {
  console.log('IPN received:', req.body);
  // Optional: verify signature and store transaction in DB
  res.sendStatus(200);
};