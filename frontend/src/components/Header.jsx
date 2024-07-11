import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
  return (
    <header className="App-header">
      <h1>My Simple React App</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/signin">SignIn</Link> | <Link to="/signup">SignUp</Link> | <Link to="/authdetails">Check</Link>
      </nav>
    </header>
  );
}

export default Header;
