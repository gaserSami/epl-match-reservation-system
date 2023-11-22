import React from "react";
import { useEffect } from "react";
import '../styles/FanView.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import { useState } from "react";
import axios from 'axios';

function FanView(props) {

  const listItems = ["Reserved", "Matches"];
  const [matchesDetails, setMatchesDetails] = useState([]);
  const [reservedMatchesDetails, setReservedMatchesDetails] = useState([]);
  const [userID, setUserID] = useState(props.userID);
  const [activeItem, setActiveItem] = useState(listItems[0]);


  useEffect(() => {
    setUserID(props.userID);
  }, [props.userID]);

  useEffect(() => {
    const userID = props.userID;
    const fetchMatchesAndTickets = async () => {
      try {
        // Fetch all matches
        const matchesResponse = await axios.get(`http://localhost:5000/matches`);
        const allMatches = matchesResponse.data;

        // Fetch all tickets
        const ticketsResponse = await axios.get(`http://localhost:5000/tickets`);
        const allTickets = ticketsResponse.data;

        // Filter tickets reserved by the user
        const userTickets = allTickets.filter(ticket => ticket.UserID._id === userID);

        // Get matches reserved by the user
        const userMatches = userTickets.map(ticket => ticket.MatchID);
        setReservedMatchesDetails(userMatches);
        console.log("user matches: ", userMatches);

        // Get matches not reserved by the user
        const notReservedMatches = allMatches.filter(match => !userMatches.some(userMatch => userMatch._id === match._id));
        setMatchesDetails(notReservedMatches);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchMatchesAndTickets();
  }, [userID]); // Add userID to the dependency array



  const userMatches = matchesDetails.map((match, index) => (
    <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="fanView"/>
  ));
  
  const notUserMatches = reservedMatchesDetails.map((match, index) => (
    <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="reservedView"/>
  ));

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

return (
  <div className="FanView">
    <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={() => props.handleSettingsClick()} userID={props.userID}/>
      <div className="main">
        <div className="cardsContainer">
        {activeItem === 'Matches' ? userMatches : notUserMatches}
        </div>  
      </div>
    </div>
);
}

export default FanView;