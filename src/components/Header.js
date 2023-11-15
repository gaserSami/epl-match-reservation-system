import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="logo">
        <img src="../components/logo.png" alt="Logo" />
      </div>
      <div className="signIn">
        <button>Sign In</button>
      </div>
    </header>
  );
}

export default Header;
