import React from "react";
import '../styles/StadiumCard.css'
import stadiumIcon from '../assets/stadium.png'

function StadiumCard(props)
{
 const stadium = props.stadiumDetails;

    return (
      <div className="StadiumCard">
  <div className="icon">
   <img src={stadiumIcon} alt="" />
  </div>
  <div className="info">
    <h1 className="name">{stadium.name}</h1>
    <h2 className="shape">{stadium.shape}</h2>
    <span className="size">{stadium.rows}X{stadium.columns}</span>
  </div>
</div>
    );
}

export default StadiumCard;