// src/components/navbars.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleTheme, darkMode }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/user/johndoe">User Profile</Link></li>
      </ul>
      <button onClick={toggleTheme}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
