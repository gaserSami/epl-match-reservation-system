import React from "react";
import '../styles/EFAview.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";

function EFAview() {
  const listItems = [{name:"Stadiums",status:"notActive"}, {name:"Matches",status:"active"}];
return (
  <div className="EFAview">
  <Sidebar listItems = {listItems} />
  <div className="main">
    <div className="cardsContainer">
      <StadiumCard/>
      <button className="addSideButton">Add new Match</button>
    </div>  
  </div>
</div>
);
}

export default EFAview;