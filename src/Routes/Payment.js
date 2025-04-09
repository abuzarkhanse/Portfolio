import React from "react";
import PaymentForm from "../components/Payment/PaymentForm.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
