import React from 'react';
import Header from './Header';
import '../App.css';
import { Link } from 'react-router-dom'; // Import Link

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/photoupload">Upload Photo</Link></li>
          <li><Link to="/photogallery">Photo Gallery</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
