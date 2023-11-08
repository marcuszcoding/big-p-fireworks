import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/DropdownMenu.css';

function DropdownMenu() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="mobile-menu">
      <button className="dropdown-button" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/" className="nav-link" onClick={closeDropdown}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/shop" className="nav-link" onClick={closeDropdown}>
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/contact" className="nav-link" onClick={closeDropdown}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link style={{ textDecoration: 'none' }} to="/locations" className="nav-link" onClick={closeDropdown}>
              Locations
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;

