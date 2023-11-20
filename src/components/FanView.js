import React from "react";
import { useEffect } from "react";
import '../styles/FanView.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";
import { useState } from "react";
import axios from 'axios';

function FanView(props) {

  const listItems = ["Reserved", "Matches"];
  const [matchesDetails, setMatchesDetails] = useState([]);
  const [reservedMatchesDetails, setReservedMatchesDetails] = useState([]);
  const [userID, setUserID] = useState(props.userID);
  useEffect(() => {
    axios.get('http://localhost:5000/matches')
      .then(response => {
        const allMatches = response.data;
        const nonUserMatches = allMatches.filter(match => !reservedMatchesDetails.some(userMatch => userMatch._id === match._id));
        setMatchesDetails(nonUserMatches);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [reservedMatchesDetails]);
  const [activeItem, setActiveItem] = useState(listItems[1]);
  
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
 
  useEffect(() => {
    const fetchReservedMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tickets`);
        const allTickets = response.data;
    
        const userTickets = allTickets.filter(ticket => ticket.UserID._id === userID);
    
        console.log(userTickets);
    
        const userMatches = userTickets.map(ticket => ticket.MatchID);
        setReservedMatchesDetails(userMatches);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
  
    fetchReservedMatches();
  }, []);
  

return (
  <div className="FanView">
    <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={() => props.handleSettingsClick()} userID={props.userID}/>
      <div className="main">
        <div className="cardsContainer">
          {activeItem === 'Matches' ? (
            matchesDetails.map((match, index) => (
              <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="guestView"/>
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