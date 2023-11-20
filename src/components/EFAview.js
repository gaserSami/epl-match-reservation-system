import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EFAview.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";

function EFAview({handleTicketsClick, handleSettingsClick, handleAddNewMatch, handleAddNewStadium, matchDetails,userID, handleEditMatch}) {
  const listItems = ["Stadiums", "Matches"];
  const [matchesDetails, setMatchesDetails] = useState([]);
  const [stadiumsDetails, setStadiumsDetails] = useState([{}]);
  const [activeItem, setActiveItem] = useState(listItems[1]);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const fetchMatchesAndStadiums = async () => {
      try {
        const matchesResponse = await axios.get('http://localhost:5000/matches');
        const stadiumsResponse = await axios.get('http://localhost:5000/stadiums');
  
        setMatchesDetails(matchesResponse.data);
        setStadiumsDetails(stadiumsResponse.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
  
    fetchMatchesAndStadiums();
  }, []);


return (
  <div className="EFAview">
    <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={handleSettingsClick} userID={userID}/>
  <div className="main">
    <div className="cardsContainer">
    {activeItem === 'Matches' ? (
            matchesDetails.map((match, index) => (
              <MatchCard key={index} matchDetails={match} handleTicketsClick={handleTicketsClick} view="editView"/>
            ))
          ) : (
            stadiumsDetails.map((stadium, index) => (
              <StadiumCard key={index} stadiumDetails={stadium} />
            ))
          )}
      {activeItem === 'Matches' ? (
    <button className="addSideButton" onClick={handleAddNewMatch}>Add new Match</button>
    ) : (
    <button className="addSideButton" onClick={handleAddNewStadium}>Add new Stadium</button>
    )}
    </div>  
  </div>
</div>
);
}

export default EFAview;