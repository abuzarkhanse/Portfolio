const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/pay", async (req, res) => {
  const { cardNumber, holderName, expiry, cvv, amount, currency } = req.body;

  try {
    // Here, you'd call Paymob (or another authentic gateway) API using real credentials.
    // This is a mock for demonstration only.
    console.log("Processing payment for", amount, currency);

    // Simulate success
    res.status(200).json({ message: "Payment successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed." });
  }
});

app.listen(5000, () => console.log("Backend server running on http://localhost:5000"));