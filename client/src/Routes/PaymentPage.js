import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, amount: passedAmount, currency } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState(passedAmount);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openPaymentPopup = () => {
    if (plan === "Premium" && (!customAmount || isNaN(customAmount))) {
      alert("Please enter a valid custom amount.");
      return;
    }
    setFinalAmount(plan === "Premium" ? Number(customAmount) : passedAmount);
    setShowPopup(true);
  };

  const handleFlutterwavePayment = () => {
    const txRef = "TXREF_" + Date.now();

    window.FlutterwaveCheckout({
      public_key: "FLWPUBK-xxxxxxxxxxxxxxxxxx-X", // your public key
      tx_ref: txRef,
      amount: finalAmount,
      currency: currency,
      payment_options: "card",
      customer: {
        email: "customer@example.com",
        name: "Abuzar Khan",
      },
      callback: function (data) {
        console.log("Flutterwave response:", data);
        setShowPopup(false);
        setShowThanks(true);

        // Call your backend to verify and save payment
        fetch("http://localhost:5000/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_ref: txRef,
            transaction_id: data.transaction_id,
            plan,
            amount: finalAmount,
          }),
        })
          .then((res) => res.json())
          .then((res) => console.log("Backend verified:", res));
      },
      onclose: function () {
        setShowPopup(false);
      },
      customizations: {
        title: "Abuzar's Web Services",
        description: `Payment for ${plan} Plan`,
        logo: "https://yourwebsite.com/logo.png",
      },
    });
  };

  return (
    <div className="payment-container">
      <h2>You're purchasing: {plan} Plan</h2>
      {plan === "Premium" ? (
        <input
          type="number"
          placeholder="Enter Custom Amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="amount-input"
        />
      ) : (
        <p>Amount: ${passedAmount}</p>
      )}
      <button className="pay-btn" onClick={openPaymentPopup}>
        Pay Now
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Ready to Pay ${finalAmount}?</h3>
            <button className="flutterwave-btn" onClick={handleFlutterwavePayment}>
              Pay with Flutterwave
            </button>
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showThanks && (
        <div className="thank-you-popup">
          <div className="popup-box">
            <h2>🎉 Payment Successful!</h2>
            <p>Thank you for your purchase.</p>
            <button onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;