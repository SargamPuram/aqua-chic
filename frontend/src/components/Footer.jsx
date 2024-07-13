import React from 'react';
import '../styles/Footer.css'; // Ensure this CSS file is present

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Aqua-Chic. All rights reserved.</p>
      <p>
        <a href="https://github.com/SargamPuram/aqua-chic" target="_blank" rel="noopener noreferrer">GitHub</a> | 
        <a href="https://x.com/auroraaaa_here" target="_blank" rel="noopener noreferrer">Twitter</a> |
        <a href="https://www.linkedin.com/in/sargam-puram-188806257/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </footer>
  );
}

export default Footer;
