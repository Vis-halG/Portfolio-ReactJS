import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    //
    const serviceID = "service_klq9jdv";   
    const templateID = "template_1kbwnkp";
    const publicKey = "fn4MO7uR0wrM9al_P";   

    // 
    const templateParams = {
      name,
      subject,
      email,
      to_email: "vishalgupta25980@gmail.com",
    };

    try {
      const { default: emailjs } = await import("emailjs-com");
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      alert("✅ Message sent successfully!");
      setName("");
      setSubject("");
      setEmail("");
    } catch (error) {
      console.error("❌ EmailJS Error:", error);
      alert("❌ Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-form-container" id="contact_section">
      <div className="contact-title">
        <h1 className="title">Let's get Started.</h1>
        <p className="subtitle">- CONTACT FORM</p>
      </div>

      <div className="contact-form">
        <form className="form" onSubmit={handleSubmit}>
          <p className="form-text">
            My name is
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" ENTER YOUR NAME..."
              className="input-field"
              required
            />
            and I have a
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder=" WEBSITE, FULL-TIME JOB"
              className="input-field"
              required
            />
            that needs help.
          </p>

          <p className="form-text">
            You can reach me at
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" YOUR EMAIL ADDRESS..."
              className="input-field"
              required
            />
            to get things started.
          </p>

          <button type="submit" className="submit-button" disabled={isSending}>
            {isSending ? "Sending..." : "— SEND INFO"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
