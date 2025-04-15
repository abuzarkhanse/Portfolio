import React, { useEffect, useState } from 'react';
import './PricingCardsStyles.css';
import '../components/PaymentPage.css';

const PricingCards = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [finalAmount, setFinalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openModal = (plan, amount) => {
    setSelectedPlan({ plan, amount });
    setFinalAmount(amount);
    setCustomAmount('');
    setShowModal(true);
  };

  const handlePayment = () => {
    if (selectedPlan.plan === 'Premium' && (!customAmount || isNaN(customAmount))) {
      alert("Please enter a valid custom amount.");
      return;
    }

    const amountToPay = selectedPlan.plan === 'Premium' ? Number(customAmount) : selectedPlan.amount;
    setFinalAmount(amountToPay);

    const txRef = "TXREF_" + Date.now();

    window.FlutterwaveCheckout({
      public_key: "FLWPUBK-xxxxxxxxxxxxxxxxxx-X", // Replace with your actual key
      tx_ref: txRef,
      amount: amountToPay,
      currency: "USD",
      payment_options: "card",
      customer: {
        email: "mrabuzar459@gmail.com",
        name: "Abuzar Khan",
      },
      callback: function (data) {
        console.log("Payment Response: ", data);
        setShowModal(false);
        setShowThanks(true);

        fetch("http://localhost:5000/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tx_ref: txRef,
            transaction_id: data.transaction_id,
            plan: selectedPlan.plan,
            amount: amountToPay,
          }),
        }).then(res => res.json())
          .then(res => console.log("Verified:", res));
      },
      onclose: () => setShowModal(false),
      customizations: {
        title: "Abuzar's Web Services",
        description: `Payment for ${selectedPlan.plan} Plan`,
        logo: "https://yourwebsite.com/logo.png",
      },
    });
  };

  const handleLocalPayment = async () => {
    const amountToPay = selectedPlan.plan === "Premium" ? Number(customAmount) : selectedPlan.amount;
    if (!amountToPay || isNaN(amountToPay)) {
      alert("Please enter a valid amount");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/payfast/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Abuzar Khan", // Replace dynamically if needed
          email: "mrabuzar459@gmail.com", // Replace dynamically if needed
          amount: amountToPay,
        }),
      });
  
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl; // Redirect to PayFast checkout
      } else {
        alert("Failed to create payment");
      }
    } catch (err) {
      console.error("Error creating payment:", err);
      alert("Payment error");
    }
  };
  

  return (
    <div className="pricing">
      <div className="card-container">
        {[
          { plan: "Basic", amount: 50, label: "$ 50", details: ["7 Business Days", "3 pages", "Featured", "Responsive Design"] },
          { plan: "Standard", amount: 100, label: "$ 100", details: ["10 Business Days", "5 pages", "Featured", "Responsive Design"] },
          { plan: "Premium", amount: 0, label: "$ Custom", details: ["12 Business Days", "Pages: Based on your requirements", "Featured", "Responsive Design", "SEO Optimized"] },
        ].map(({ plan, amount, label, details }) => (
          <div key={plan} className="card">
            <h3>- {plan} -</h3>
            <span className="bar"></span>
            <p className="btc">{label}</p>
            {details.map((d, i) => <p key={i}>- {d} -</p>)}
            <button className="btn" onClick={() => openModal(plan, amount)}>
              PURCHASE NOW
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedPlan && (
      <div className="payment-modal-overlay">
        <div className="payment-modal">
          <h2>🔐 Secure Checkout</h2>
          <p>You’re about to purchase the <strong>{selectedPlan.plan}</strong> Plan</p>

          {selectedPlan.plan === "Premium" ? (
            <input
              type="number"
              placeholder="Enter Custom Amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="amount-input"
            />
          ) : (
            <p className="modal-amount">Amount: ${finalAmount}</p>
          )}

          <button className="confirm-btn" onClick={handlePayment}>
            Pay with Flutterwave
          </button>

          <button className="local-btn" onClick={handleLocalPayment}>
            Pay via JazzCash / Easypaisa
          </button>

          <button className="cancel-btn" onClick={() => setShowModal(false)}>
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
            <button onClick={() => setShowThanks(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCards;
