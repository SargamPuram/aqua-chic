import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Ensure you have this CSS file

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Aqua-Chic</h1>
      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/signin">SignIn</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/photoupload">PhotoUpload</Link>
        <Link to="/photogallery">PhotoGallery</Link>
        <Link to="/leaderboard">LeaderBoard</Link>
        <Link to="/theme-generator">Theme Generator</Link>
      </nav>
    </header>
  );
}

export default Header;
