import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from "../images/bigpfireworksLogo.webp"
import "../styles/Navbar.css"


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Fireworks Website Logo"/>
        </Link>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className="nav-link">
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="login-link">
          Login
        </Link>
        <Link to="/carts" className="cart-link">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
