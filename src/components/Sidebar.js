import React from "react";
import '../styles/Sidebar.css'

function Sidebar(props) {
  const listItems = props.listItems.map((item, index) => (
    <div key={index} className={`menu-item ${props.activeItem === item ? 'active' : ''}`} onClick={() => props.handleItemClick(item)}>
      <span>{item}</span>
    </div>
  ));

  //given props.username
  //query get user details
  const personalDetails = {
    username: 'Username',
    email: 'gasersami@gmail.com',
    password: 'ksadmsd',
    firstName: 'Gaser',
    lastName: 'Sami',
    city:'Giza',
    address:'136, hadayek el bte5',
    birthdate:"2023-01-01",
    gender:"male"
  };

  return (
    <div className="sidebar">
      {listItems}
      <div className="menu-item settings">
        <img src="" alt="" className="sideIcon" />
        <span onClick={() => props.handleSettingsClick(personalDetails)} >Settings</span>
      </div>
    </div>
  );
}

export default Sidebar;