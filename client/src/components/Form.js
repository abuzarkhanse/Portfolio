import "./FormStyles.css";
import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, email, message };

    axios
      .post("http://localhost:5000/send-email", data)
      .then((response) => {
        if (response.status === 200) {
          setName("");
          setEmail("");
          setMessage("");
          setSubmissionStatus("Email sent successfully!");
        } else {
          setSubmissionStatus("Error occurred. Please try again.");
        }
      })
      .catch(() => {
        setSubmissionStatus("Error occurred. Please try again.");
      });
  };

  return (
    <div className="form">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Your Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Message:</label>
        <textarea
          rows="6"
          placeholder="Type your message here"
          required
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <button className="btn">Submit</button>
      </form>

      {submissionStatus && <div className="submission-status">{submissionStatus}</div>}
    </div>
  );
};

export default Form;