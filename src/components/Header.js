/*
  Header component
  This component is responsible for rendering the header of the page.
  It also handles the click events on the sign in button.
*/

// importing dependencies
import React from "react";
// importing styles
import "../styles/Header.css";
// importing assets
import userIcon from "../assets/user.png";
import logo from "../assets/logo.png";

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
    <header className={`Header ${props.className}`}>
      <Logo />
      <div className="signIn">
        <button onClick={() => props.onSignIn()}>Sign In</button>
      </div>
    </header>
  );

  // View for logged-in users
  const userView = (
    <header className={`Header ${props.className}`}>
      <Logo />
      <div className="userInfo">
        <span className="username">{props.username}</span>
        <img src={userIcon} alt="" />
        <button className="logout-button" onClick={() => props.onLogOut()}>Log out</button>
      </div>
    </header>
  );

  // View for idle state
  const idleView = (
    <header className={`Header ${props.className}`}>
      <Logo />
    </header>
  );

  // Determine which view to render based on the current page
  let view;
  switch (currentPage) {
    case "signUp":
    case "signIn":
      view = idleView;
      break;
    case "mainPage":
      view = guestView;
      break;
    case "fanPage":
    case "EFAPage":
    case "siteAdminPage":
      view = userView;
      break;
    default:
      view = null;
  }

  return view;
}

export default Header;
