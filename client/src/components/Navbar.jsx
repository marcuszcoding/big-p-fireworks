import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">
          Big P Fireworks
        </a>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/shop" className="nav-link">
              Shop
            </a>
          </li>
          <li className="nav-item">
            <a href="/Contact" className="nav-link">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="/locations" className="nav-link">
              Locations
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/login" className="login-link">
          Login
        </a>
        <a href="/carts" className="cart-link">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
