import React from 'react';
import '../styles/Header.css';
import userIcon from '../assets/user.png';
import logo from '../assets/logo.png';

// Logo component
function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
  );
}

function Header(props) {
  const currentPage = props.currentPage;

  // View for guest users
  const guestView = (
    <header className="Header">
      <Logo />
      <div className="signIn">
        <button onClick={() => props.onSignIn()}>Sign In</button>
      </div>
    </header>
  );

  // View for logged-in users
  const userView = (
    <header className="Header">
      <Logo />
      <div className="userInfo">
        <span className="username">{props.username}</span>
        <img src={userIcon} alt="" />
      </div>
    </header>
  );

  // View for idle state
  const idleView = (
    <header className="Header">
      <Logo />
    </header>
  );

  // Determine which view to render based on the current page
  let view;
  switch (currentPage) {
    case 'signUp':
    case 'signIn':
      view = idleView;
      break;
    case 'mainPage':
      view = guestView;
      break;
    case 'fanPage':
    case 'EFAPage':
    case 'siteAdminPage':
      view = userView;
      break;
    default:
      view = null;
  }

  return view;
}

export default Header;
