import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/AppLayout.css'; // Ensure this CSS file is present

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
