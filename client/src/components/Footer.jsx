import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="newsletter">
          <h3>Subscribe to our Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-section">
        <div className="links-section">
          <div className="privacy-terms">
            <a href="/privacy-policy">Privacy Policy</a>
            <span className='spacer'>|</span>
            <a href="/terms-and-conditions">Terms and Conditions</a>
          </div>
          <p className="rights-text">&copy; {new Date().getFullYear()} Marcus & Domara. All rights reserved.</p>
        </div>
      </div>
      <div className="footer-section">
        <div className="social-section">
          <p className="social-text">Check Out Our Socials</p>
          <div className="social-links">
            <a href="https://instagram.com/bigpfireworks?igshid=Y2IzZGU1MTFhOQ==" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.facebook.com/BigPFireworks" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
