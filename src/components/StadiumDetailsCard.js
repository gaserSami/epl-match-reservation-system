import React, { useState,useEffect } from "react";
import axios from "axios";
import "../styles/StadiumDetailsCard.css";
import stadiumIcon from '../assets/stadium.png';

function StadiumDetailsCard(props) {
  const [stadiumDetails, setStadiumDetails] = useState(props.stadiumDetails || {
    StadiumName: "",
    Rows: "",
    Columns: ""
  });
   //function
   const [refresher, setRefresher] = useState(false);
   const {forceMainPageRender} = props;
 
   useEffect(() => {
     forceMainPageRender();
   }, [refresher]);

  const handleNameChange = (e) => {
    setStadiumDetails({ ...stadiumDetails, StadiumName: e.target.value });
  };

  const handleRowsChange = (e) => {
    setStadiumDetails({ ...stadiumDetails, Rows: e.target.value });
  };

  const handleColumnsChange = (e) => {
    setStadiumDetails({ ...stadiumDetails, Columns: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the backend server to add the stadium details to the database
    axios.post("http://localhost:5000/stadiums", stadiumDetails)
      .then(response => {
        // Handle the response from the server
        console.log(response.data); // You can customize this based on your requirements
        setRefresher(prev => !prev);
        alert('Stadium details added successfully!');
      })
      .catch(error => {
        // Handle any errors that occur during the request
        setRefresher(prev => !prev);
        alert('There was an error! Please re-check the form.');
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
              value={stadiumDetails.StadiumName}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="shape">Shape</label>
            <input
              type="text"
              id="shape"
              value="rectangular"
              disabled
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="rows">Rows</label>
            <input
              type="number"
              id="rows"
              placeholder="Enter number of rows"
              value={stadiumDetails.Rows}
              onChange={handleRowsChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="columns">Columns</label>
            <input
              type="number"
              id="columns"
              placeholder="Enter number of columns"
              value={stadiumDetails.Columns}
              onChange={handleColumnsChange}
              required
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
