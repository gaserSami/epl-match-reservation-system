import React from "react";
import '../styles/StadiumCard.css'

function StadiumCard()
{
    return (
      <div className="StadiumCard">
  <div className="icon">
   <img src="" alt="" />
  </div>
  <div className="info">
    <h1 className="name">Stadium1</h1>
    <h2 className="shape">rectangular</h2>
    <span className="size">20x20</span>
  </div>
</div>
    );
}

export default StadiumCard;