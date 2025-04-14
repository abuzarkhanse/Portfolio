import React from "react";
import './index.css';
import Home from "./Routes/Home";
import About from "./Routes/About";
import Project from "./Routes/Project";
import Contact from "./Routes/Contact";
import DownloadCv from "./Routes/DownloadCv";
import PaymentPage from "./Routes/PaymentPage";
import PricingCards from "./components/PricingCards";
// import Payment from "./Routes/Payment";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/downloadcv" element={<DownloadCv />} />
        <Route path="/Payment" element={<PaymentPage />} />
        {/* <Route path="/payment" element={<Payment />} /> */}
      </Routes>
    </>
  );
}

export default App;
