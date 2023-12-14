import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/bigplogoweb.png";
import { useShopCart } from '../hooks/ShopContext';
import { useAuth } from '../hooks/AuthContext';

import DropdownMenu from './DropdownMenu';

import "../styles/Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { cartItemsCount } = useShopCart();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.admin_role)
    }

  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Fireworks Website Logo" className="navbar-logo-img" />
        </Link>
        {isMobile && (
          <DropdownMenu currentUser={currentUser} />
        )}
      </div>
      <div className="navbar-menu">
        <ul className="navbar-nav">
          {!isMobile && (
            <>
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
            </>
          )}
          {currentUser && isAdmin && (
            <li className="nav-item dropdown">
              <Link
                to="/admin"
                className="nav-link dropdown-toggle-admin"
                id="adminDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </Link>
              <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                <li>
                  <Link to="/admin/products/create" className="dropdown-item">
                    Create Product
                  </Link>
                </li>
                <li>
                  <Link to="/admin/products/edit" className="dropdown-item">
                    Edit Product
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders/view" className="dropdown-item">
                    View Orders
                  </Link>
                </li>
                <li>
                  <Link to="/admin/locations" className="dropdown-item">
                    Edit Locations
                  </Link>
                </li>
                <li>
                  <Link to="/admin/categories" className="dropdown-item">
                    Edit Categories
                  </Link>
                </li>
              </ul>
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
