import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/SiteAdminView.css'
import Sidebar from "./Sidebar";

function SiteAdminView({handleSettingsClick,userID}) {
const [newUsers, setNewUsers] = useState([]);
const [existingUsers, setExistingUsers] = useState([]);

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

const handleApprove = async (id) => {

const user = newUsers.find(user => user._id === id);

  const updatedUser = {
    FirstName: user.FirstName,
    LastName: user.LastName,
    City: user.City,
    Gender: user.Gender,
    Email: user.Email,
    DateOfBirth: new Date(user.DateOfBirth),
    Password: user.Password,
    Address: user.Address,
    Username: user.Username,
    UserType: user.UserType,
    State: "accepted"
  };

  try {
    const response = await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
    console.log(response.data);
  } catch (error) {
    console.error('There was an error!', error);
  }
};

    const handleDecline = (id) => {
      axios
        .delete(`http://localhost:5000/users/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };

  const listItems = ["New Users", "Existing Users"];
  const [activeItem, setActiveItem] = useState(listItems[0]);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

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
          <td className="button">
            
          </td>
          <td className="button">
            <button className="btn decline" onClick={() => handleDecline(user._id)}>Decline</button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="SiteAdminView">
      <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={handleSettingsClick} userID={userID}/>
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