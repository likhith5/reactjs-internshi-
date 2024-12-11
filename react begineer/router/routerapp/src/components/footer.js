// src/components/Footer.js
import React from 'react';
import './footer.css'; // Optional styling for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Quest Infromatices 2024. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
