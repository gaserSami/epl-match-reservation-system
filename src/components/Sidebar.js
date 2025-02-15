/*
  This component is responsible for rendering the sidebar.
  It also handles the click events on the sidebar items.
*/

// importing dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
// importing styles
import "../styles/Sidebar.css";

// Define Sidebar component
function Sidebar(props) {
  // State variables
  const [personalDetails, setPersonalDetails] = useState(null); // State variable to store personal details
  const [error, setError] = useState(null); // State variable to store error message

  // Fetch personal details on component mount or when props.userID changes
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${props.userID}`
        ); // Fetch personal details from API
        setPersonalDetails(response.data); // Update personal details state variable
      } catch (error) {
        setError("There was an error fetching the personal details."); // Set error message if there is an error
        console.error("There was an error!", error);
      }
    };

    fetchPersonalDetails(); // Call fetchPersonalDetails function
  }, [props.userID]);

  // Generate list items based on props.listItems
  const listItems = props.listItems.map((item, index) => (
    <div
      key={index}
      className={`menu-item ${props.activeItem === item ? "active" : ""}`}
      onClick={() => props.handleItemClick(item)}
    >
      <span>{item}</span>
    </div>
  ));

  return (
    <div className="sidebar">
      {error && <div className="error">{error}</div>}
      {listItems}
      <div className="menu-item settings">
        <img src="" alt="" className="sideIcon" />
        {personalDetails && (
          <span onClick={() => props.handleSettingsClick(personalDetails)}>
            Personal Info
          </span>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
