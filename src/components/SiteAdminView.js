import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/SiteAdminView.css'
import Sidebar from "./Sidebar";

function SiteAdminView({ handleSettingsClick, userID }) {
  // State variables
  const [newUsers, setNewUsers] = useState([]);
  const [existingUsers, setExistingUsers] = useState([]);
  const [activeItem, setActiveItem] = useState("New Users");

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        const users = response.data;
        const newUsers = users.filter(user => user.State === 'pending');
        const existingUsers = users.filter(user => user.State === 'accepted');
        setNewUsers(newUsers);
        setExistingUsers(existingUsers);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user approval
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/users/${id}/state`, { State: 'accepted' });
      // Remove the approved user from the newUsers array
      const updatedNewUsers = newUsers.filter(user => user._id !== id);
      // Add the approved user to the existingUsers array
      const approvedUser = newUsers.find(user => user._id === id);
      const updatedExistingUsers = [...existingUsers, { ...approvedUser, State: 'accepted' }];
      // Update the state
      setNewUsers(updatedNewUsers);
      setExistingUsers(updatedExistingUsers);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // Handle user decline
  const handleDecline = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((response) => {
        console.log(response);
        // Remove the declined user from the newUsers array
        const updatedNewUsers = newUsers.filter(user => user._id !== id);
        // Update the state
        setNewUsers(updatedNewUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

// Handle existing user deletion
const handleDelete = (id) => {
  axios
    .delete(`http://localhost:5000/users/${id}`)
    .then((response) => {
      console.log(response);
      // Remove the deleted user from the existingUsers array
      const updatedExistingUsers = existingUsers.filter(user => user._id !== id);
      // Update the state
      setExistingUsers(updatedExistingUsers);
    })
    .catch((error) => {
      console.log(error);
    });
};

  // Handle sidebar item click
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // Render user rows based on active item
  const renderUserRows = () => {
    if (activeItem === "New Users") {
      return newUsers.map((user, index) => (
        <tr key={index}>
          <td>{user.FirstName}</td>
          <td>{user.Email}</td>
          <td className="button">
            <button className="btn approve" onClick={() => handleApprove(user._id)}>Approve</button>
          </td>
          <td className="button">
            <button className="btn decline" onClick={() => handleDecline(user._id)}>Decline</button>
          </td>
        </tr>
      ));
    } else if (activeItem === "Existing Users") {
      return existingUsers.map((user, index) => (
        <tr key={index}>
          <td>{user.FirstName}</td>
          <td>{user.Email}</td>
          <td className="button"></td>
          <td className="button">
            <button className="btn decline" onClick={() => handleDelete(user._id)}>Remove</button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="SiteAdminView">
      <Sidebar listItems={["New Users", "Existing Users"]} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={handleSettingsClick} userID={userID} />
      <div className="main">
        <div className="usersContainer">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {renderUserRows()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SiteAdminView;