import React from "react";
import '../styles/SiteAdminView.css'
import Sidebar from "./Sidebar";
import { useState } from "react";

function SiteAdminView({handleSettingsClick}) {
  const newUsers = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
  ];

  const existingUsers = [
    { name: "Gaser Sami", email: "gaser.sami@gasersami.com" },
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
  ];

  const listItems = ["New Users", "Existing Users"];
  const [activeItem, setActiveItem] = useState(listItems[0]);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const renderUserRows = () => {
    if (activeItem === "New Users") {
      return newUsers.map((user, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="button">
            <button className="btn approve">Approve</button>
          </td>
          <td className="button">
            <button className="btn decline">Decline</button>
          </td>
        </tr>
      ));
    } else if (activeItem === "Existing Users") {
      return existingUsers.map((user, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="button">
            <button className="btn approve">Approve</button>
          </td>
          <td className="button">
            <button className="btn decline">Decline</button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div className="SiteAdminView">
      <Sidebar
        listItems={listItems}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
        handleSettingsClick={handleSettingsClick}
      />
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