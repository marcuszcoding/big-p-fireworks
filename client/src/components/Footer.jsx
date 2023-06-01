import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter">
        <h3>Subscribe to our Newsletter</h3>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-and-conditions">Terms and Conditions</a>
        <p>&copy; {new Date().getFullYear()} Marcus & Domarra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;