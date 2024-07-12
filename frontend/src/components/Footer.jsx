import React from 'react';
import '../styles/Footer.css'; // Ensure this CSS file is present

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Aqua-Chic. All rights reserved.</p>
      <p>
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a> | 
        <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">Twitter</a> |
        <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
    </footer>
  );
}

export default Footer;
