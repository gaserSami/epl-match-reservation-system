import React from "react";
import { useEffect } from "react";
import '../styles/FanView.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import { useState } from "react";
import axios from 'axios';

function FanView(props) {

  const listItems = ["Reserved", "Matches"];
  const [matchesDetails, setMatchesDetails] = useState(props.matchesDetails || []);
  const [reservedMatchesDetails, setReservedMatchesDetails] = useState(props.matchesDetails || []);
  const [userID, setUserID] = useState(props.userID);
  const [activeItem, setActiveItem] = useState(listItems[0]);

  

  useEffect(() => {
    const fetchReservedMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tickets`);
        const allTickets = response.data;
    
        const userTickets = allTickets.filter(ticket => ticket.UserID._id === userID);
    
        console.log(userTickets);
    
        const userMatches = userTickets.map(ticket => ticket.MatchID);
        setReservedMatchesDetails(userMatches);
  
        // Set matchesDetails after reservedMatchesDetails has been updated
        const matchesDetails = props.matchesDetails || [];
        setMatchesDetails(matchesDetails.filter(match => !userMatches.some(userMatch => userMatch._id === match._id)));
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
    
    fetchReservedMatches();
  }, [props.matchesDetails, userID]); // Add userID to the dependency array

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

return (
  <div className="FanView">
    <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={() => props.handleSettingsClick()} userID={props.userID}/>
      <div className="main">
        <div className="cardsContainer">
          {activeItem === 'Matches' ? (
            matchesDetails.map((match, index) => (
              <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="fanView"/>
            ))
          ) : (
            reservedMatchesDetails.map((match, index) => (
              <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="reservedView"/>
            ))
          )}
        </div>  
      </div>
    </div>
);
}

export default FanView;