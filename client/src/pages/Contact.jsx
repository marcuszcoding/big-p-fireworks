import React from 'react'
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className='p1'>We would love to hear from you! Please fill out the form below to get in touch.</p>
      <p className='p2'>If not you can also phone us at <strong>(361)-772-2141</strong>!</p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber">Phone Number:</label>
          <input type="phonenumber" id="phonenumber" name="phonenumber" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;