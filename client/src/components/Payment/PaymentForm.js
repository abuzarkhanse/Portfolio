import React, { useState } from "react";
import "./PaymentStyle.css";
import axios from "axios";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("PKR");
  const [message, setMessage] = useState("");

  const detectCardType = (number) => {
    const firstDigit = number[0];
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "MasterCard";
    return "Unknown";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/pay", {
        cardNumber,
        holderName,
        expiry,
        cvv,
        amount,
        currency,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Payment failed.");
    }
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Card Payment</h2>
        <input
          type="text"
          placeholder="Card Number"
          maxLength="16"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <span className="card-type">{detectCardType(cardNumber)}</span>

        <input
          type="text"
          placeholder="Cardholder Name"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
          required
        />

        <div className="row">
          <input
            type="text"
            placeholder="MM/YY"
            maxLength="5"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="CVV"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="PKR">PKR</option>
          <option value="USD">USD</option>
        </select>

        <button type="submit">Pay Now</button>
        {message && <p className="response-msg">{message}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;