import React, { useState } from "react";
import axios from "axios";
import "../styles/StadiumDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';

function StadiumDetailsCard(props) {
  const [stadiumDetails, setStadiumDetails] = useState(props.stadiumDetails || {
    name: "",
    shape: "",
    rows: "",
    columns: ""
  });

  const handleNameChange = (e) => {
    setStadiumDetails({ ...stadiumDetails, name: e.target.value });
  };

  const handleShapeChange = (e) => {
    setStadiumDetails({ ...stadiumDetails, shape: e.target.value });
  };

  const handleRowsChange = (e) => {
    setStadiumDetails({ ...stadiumDetails, rows: e.target.value });
  };

  const handleColumnsChange = (e) => {
    setStadiumDetails({ ...stadiumDetails, columns: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the backend server to add the stadium details to the database
    axios.post("/stadiums", stadiumDetails)
      .then(response => {
        // Handle the response from the server
        console.log(response.data); // You can customize this based on your requirements
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  };

  const editView = (
    <div className="stadium-form-card">
      <h2>Stadium Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter stadium name"
              value={stadiumDetails.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="shape">Shape</label>
            <input
              type="text"
              id="shape"
              value="rectangular"
              disabled
            />
          </div>
          <div className="input-group">
            <label htmlFor="rows">Rows</label>
            <input
              type="number"
              id="rows"
              placeholder="Enter number of rows"
              value={stadiumDetails.rows}
              onChange={handleRowsChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="columns">Columns</label>
            <input
              type="number"
              id="columns"
              placeholder="Enter number of columns"
              value={stadiumDetails.columns}
              onChange={handleColumnsChange}
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );

  switch (props.view) {
    case "editView":
      return editView;
    default:
      return null;
  }
}

export default StadiumDetailsCard;
