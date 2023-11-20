import React from "react";
import '../styles/StadiumCard.css'
import stadiumIcon from '../assets/stadium.png'

function StadiumCard(props)
{
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
    <span className="size">{rows}X{columns}</span>
  </div>
</div>
    );
}

export default StadiumCard;