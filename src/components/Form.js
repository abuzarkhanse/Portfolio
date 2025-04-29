import "./FormStyles.css";
import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionStatus(null);

    try {
      const response = await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setSubmissionStatus("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setSubmissionStatus("❌ Something went wrong. Please try again.");
      }
      
      setTimeout(() => setSubmissionStatus(null), 4000);
      
    } catch (error) {
      console.error("Error sending message:", error.response || error);
      setSubmissionStatus("❌ Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Your Name:</label>
        <input type="text" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Message:</label>
        <textarea rows="6" placeholder="Type your message here" required value={message} onChange={(e) => setMessage(e.target.value)} />

        <button className="btn" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      {submissionStatus && (
        <div className={`toast ${submissionStatus.startsWith("✅") ? "success" : "error"}`}>
          {submissionStatus}
        </div>
      )}

    </div>
  );
};

export default Form;