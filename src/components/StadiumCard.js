/*
  This component is used to display the stadium details in the form of a card.
*/

// importing dependencies
import React from "react";
import "../styles/StadiumCard.css";
// importing assets
import stadiumIcon from "../assets/stadium.png";

// Define StadiumCard component
function StadiumCard(props) {
  const stadium = props.stadiumDetails;
  const rows = stadium.Rows;
  const columns = stadium.Columns;
  const stadiumName = stadium.StadiumName;
  const shape = "rectangular";

  return (
    <div className="StadiumCard">
      <div className="icon">
        <img src={stadiumIcon} alt="" />
      </div>
      <div className="info">
        <h1 className="name">{stadiumName}</h1>
        <h2 className="shape">{shape}</h2>
        <span className="size">
          {rows}X{columns}
        </span>
      </div>
    </div>
  );
}

// Export StadiumCard component
export default StadiumCard;
