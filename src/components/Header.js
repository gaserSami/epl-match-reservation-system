import React from 'react';
import '../styles/Header.css';
import userIcon  from '../assets/user.png';
import logo from '../assets/logo.png';

function Header() {
  const guestView = (<header>
  <div className="logo">
    <img src="../components/logo.png" alt="Logo" />
  </div>
  <div className="signIn">
    <button>Sign In</button>
  </div>
</header>);
const userView = (
<header>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="userInfo">
        <span className="username">Username</span>
        <img src={userIcon} alt="" />
      </div>
    </header>
  );
  return (
    userView
  );
}

export default Header;
