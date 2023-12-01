import React from "react";
import { useEffect } from "react";
import '../styles/FanView.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import { useState } from "react";
import axios from 'axios';
import { set } from "mongoose";

function FanView(props) {

  const listItems = ["Reserved", "Matches"];
  const [matchesDetails, setMatchesDetails] = useState([]);
  const [reservedMatchesDetails, setReservedMatchesDetails] = useState([]);
  const [userID, setUserID] = useState(props.userID);
  const [activeItem, setActiveItem] = useState(listItems[0]);
  const [userMatches, setUserMatches] = useState([]);
  const [notUserMatches, setNotUserMatches] = useState([]);
  const [triggerFanPageRender, setTriggerFanPageRender] = useState(false);
  //function
  const [refresher, setRefresher] = useState(false);

const forceFanPageRender = () => {
  setRefresher(!refresher);
  console.log("forceRender");
  console.log(refresher);
}

useEffect(() => {
 setRefresher(!refresher);
}, [props.triggerFanPageRender]);


  useEffect(() => {
    setUserID(props.userID);
    console.log("userID: ", userID);
    const fetchMatchesAndTickets = async () => {
      try {
        // Fetch all matches
        const matchesResponse = await axios.get(`http://localhost:5000/matches`);
        const allMatches = matchesResponse.data;

        // Fetch all tickets
        const ticketsResponse = await axios.get(`http://localhost:5000/tickets`);
        const allTickets = ticketsResponse.data;
        console.log("all tickets: ", allTickets);

        // Filter tickets reserved by the user
        const userTickets = allTickets.filter(ticket => ticket.UserID._id === userID);
        console.log("user tickets: ", userTickets);
        

        // Get full match details for matches reserved by the user
        const userMatches = userTickets.map(ticket => {
          // Find the full match object by its ID
          const match = allMatches.find(match => match._id === ticket.MatchID._id);
          // Return an object containing both the match details and the ticket ID
          return {
            ...match,
            ticketNumber: ticket._id // Include the ticket ID
          };
        }).filter(match => match != null); // Ensure no undefined matches if not found
        

        setReservedMatchesDetails(userMatches);
        console.log("user matches: ", userMatches);

        // Get matches not reserved by the user
        const notReservedMatches = allMatches.filter(match => !userMatches.some(userMatch => userMatch._id === match._id));
        setMatchesDetails(notReservedMatches);
        console.log("not user matches: ", notReservedMatches);


      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    fetchMatchesAndTickets();
  }, [props.userID,refresher]); // Add userID to the dependency array

  useEffect(() => {
      // Generate MatchCard for each match
      const uuserMatches = reservedMatchesDetails.map((match, index) => (
        <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="reservedView" forceFanPageRender={forceFanPageRender}/>
      ));
      
     const nnotUserMatches = matchesDetails.map((match, index) => (
        <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="fanView" forceFanPageRender={forceFanPageRender}/>
      ));

      setUserMatches(uuserMatches);
      setNotUserMatches(nnotUserMatches);

  }, [reservedMatchesDetails, matchesDetails]);


  const handleItemClick = (item) => {
    setActiveItem(item);
  };

return (
  <div className="FanView">
    <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={() => props.handleSettingsClick()} userID={props.userID}/>
      <div className="main">
        <div className="cardsContainer">
        {activeItem === 'Matches' ? notUserMatches : userMatches}
        </div>  
      </div>
    </div>
);
}

export default FanView;