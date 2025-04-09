import "./FooterStyles.css";
import React from 'react';
import { FaFacebook, FaGithub, FaHome, FaInstagram, FaLinkedin, FaMailBulk, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="location">
            <FaHome size={20} style={{ color: "#4169E1", marginRight: "1rem" }} />
            <div>
              <p>ABUZAR KHAN</p>
              <p>22621, Haripur PAF-IAST</p>
              <p>Pakistan</p>
            </div>
          </div>
          <div className="phone">
            <h4>
              <FaPhone size={20} style={{ color: "green", marginRight: "1rem" }} /> 
              +92-346-9900986
            </h4>
          </div>
          <div className="email">
            <h4>
              <FaMailBulk size={20} style={{ color: "#FFA500", marginRight: "1rem" }} /> 
              <a href="mailto:mrabuzar459@gmail.com">mrabuzar459@gmail.com</a>
            </h4>
          </div>
        </div>

        <div className="right">
          <h4>About me</h4>
          <p>This is Abuzar Khan, Software Engineering Student and MERN-Stack Developer for more...   <a href="https://www.linkedin.com/in/abuzarkhan-pakistan/">(Click Me!)</a>.</p>
          <div className="our-social"><p>See Our Social's:</p></div>
          <div className="social">
            <a href="https://www.facebook.com/AbuzarKhan9900?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} style={{ color: "#1877F2", marginRight: "0.5rem" }} />
            </a>
            <a href="https://twitter.c`om/abuzarkhanse" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} style={{ color: "#1DA1F2", marginRight: "0.5rem" }} />
            </a>
            <a href="https://www.instagram.com/abuzarkhanse/?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} style={{ color: "#E4405F", marginRight: "0.5rem" }} />
            </a>
            <a href="https://youtube.com/@abuzarkhanse" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={30} style={{ color: "#``FF0000", marginRight: "0.5rem" }} />
            </a>
            <a href="https://www.linkedin.com/in/abuzar-khan-pakistan" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} style={{ color: "#0077B5", marginRight: "0.5rem" }} />
            </a>
            <a href="https://github.com/abuzarkhanse" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} style={{ color: "#333", marginRight: "0.5rem" }} />
            </a>
          </div>
        </div>
      </div>
      {/* Copyright Notice */}
      <div className="copyright">
        <p>&copy; 2025 All rights reserved. Designed & Developed by Abuzar Khan</p>
      </div>
    </div>
  )
}

export default Footer;
