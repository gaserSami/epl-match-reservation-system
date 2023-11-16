import React from "react";
import '../styles/EFAview.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";

function FanView() {
  const listItems = [{name:"Reserved",status:"notActive"}, {name:"Matches",status:"active"}];
return (
  <div className="Fanview">
  <Sidebar listItems = {listItems} />
  <div className="main">
    <div className="cardsContainer">
      <MatchCard/>
    </div>  
  </div>
</div>
);
}

export default FanView;