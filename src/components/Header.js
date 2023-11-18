import React from 'react';
import '../styles/Header.css';
import userIcon  from '../assets/user.png';
import logo from '../assets/logo.png';

function Header(props) {
  const currentPage = props.currentPage;
  const guestView = (<header className='Header'>
  <div className="logo">
    <img src={logo} alt="Logo" />
  </div>
  <div className="signIn">
    <button onClick={() => props.onSignIn()}>Sign In</button>
  </div>
</header>);
const userView = (
<header className='Header'>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="userInfo">
        <span className="username">{props.username}</span>
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
    currentPage === 'signUp' || currentPage === 'signIn' ? idleView :
    currentPage === 'mainPage' ? guestView :
    currentPage === 'fanPage' ? userView :
    currentPage === 'EFAPage' ? userView :
    null
  );

}

export default Header;
