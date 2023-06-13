import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/BIGPlogowp.png"
import { useShopCart } from '../hooks/ShopContext'
import "../styles/Navbar.css"
import { useState, useEffect } from 'react';
import decode from "jwt-decode";
import { useAuth } from '../hooks/AuthContext';



const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const {cartItemsCount} = useShopCart()


  useEffect(() => {
    if(currentUser) {
      setIsAdmin(currentUser.admin_role)
    }
   
  }, [currentUser]);

  const handleLogout = async() => {
    await logout()
    navigate('/login')
  };

  console.log(currentUser, isAdmin)

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Fireworks Website Logo" className="navbar-logo-img" />
        </Link>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/shop" className="nav-link">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/locations" className="nav-link">
              Locations
            </Link>
          </li>
          {currentUser && isAdmin && ( // Condition to show the "Admin" link
            <li className="nav-item">
              <Link style={{ textDecoration: 'none' }} to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-right">
        {currentUser ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link style={{ textDecoration: 'none' }} to="/login" className="login-link">
            Login
          </Link>
        )}
        <Link to="/cart" className="cart-link">
          <span className="fa-stack">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            {cartItemsCount() > 0 && <span className="cart-count">{cartItemsCount()}</span>}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
