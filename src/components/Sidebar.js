import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Sidebar.css'

function Sidebar(props) {
  const [personalDetails, setPersonalDetails] = useState(null);

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${props.userID}`);
        setPersonalDetails(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchPersonalDetails();
  }, [props.userID]);

  const listItems = props.listItems.map((item, index) => (
    <div key={index} className={`menu-item ${props.activeItem === item ? 'active' : ''}`} onClick={() => props.handleItemClick(item)}>
      <span>{item}</span>
    </div>
  ));

  return (
    <div className="sidebar">
      {listItems}
      <div className="menu-item settings">
        <img src="" alt="" className="sideIcon" />
        {personalDetails && <span onClick={() => props.handleSettingsClick(personalDetails)} >Settings</span>}
      </div>
    </div>
  );
}

export default Sidebar;