const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/payments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Payment = mongoose.model("Payment", {
  tx_ref: String,
  transaction_id: String,
  plan: String,
  amount: Number,
  verified: Boolean,
  createdAt: { type: Date, default: Date.now },
});

// Flutterwave secret key
const FLW_SECRET_KEY = "FLWSECK-xxxxxxxxxxxxxxxxx-X";

app.post("/api/verify-payment", async (req, res) => {
  const { transaction_id, tx_ref, amount, plan } = req.body;

  try {
    const result = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
      },
    });

    const data = result.data.data;
    const verified = data.status === "successful";

    await Payment.create({
      tx_ref,
      transaction_id,
      plan,
      amount,
      verified,
    });

    res.json({ success: true, verified, data });
  } catch (err) {
    console.error("Verification error:", err.response?.data || err);
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));