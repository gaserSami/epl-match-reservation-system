import React from 'react';
import '../styles/Header.css';
import userIcon  from '../assets/user.png';
import logo from '../assets/logo.png';

function Header({ onSignIn, currentPage }) {
  const guestView = (<header className='Header'>
  <div className="logo">
    <img src={logo} alt="Logo" />
  </div>
  <div className="signIn">
    <button onClick={onSignIn}>Sign In</button>
  </div>
</header>);
const userView = (
<header className='Header'>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="userInfo">
        <span className="username">Username</span>
        <img src={userIcon} alt="" />
      </div>
    </header>
  );
  const idleView = (
    <header className='Header'>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="userInfo">
          </div>
        </header>
      );
  return (
    currentPage === 'SignUp' || currentPage === 'SignIn' ? idleView :
    currentPage === 'MainPage' ? guestView :
    null
  );

}

export default Header;
