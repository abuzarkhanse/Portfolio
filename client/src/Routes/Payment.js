import React from "react";
import PaymentForm from "../components/Payment/PaymentForm.js";
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

const Payment = () => {
  return (
    <div>
      <Navbar/>
      <PaymentForm/>
      <Footer/>
    </div>
  )
};

export default Payment;
