/*
  This component is the main view for the fan. It contains the sidebar and the match cards.
  It also fetches the matches data from the server.
  It also handles the click events on the sidebar items.
  It also handles the click events on the settings button.
  It also handles the click events on the tickets button.
  It also handles the click events on the edit match button.
*/

// importing dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
// importing styles
import "../styles/FanView.css";
// importing components
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";

function FanView(props) {
  // State variables
  const listItems = ["Reserved", "Matches"];
  const [matchesDetails, setMatchesDetails] = useState([]);
  const [reservedMatchesDetails, setReservedMatchesDetails] = useState([]);
  const [userID, setUserID] = useState(props.userID);
  const [activeItem, setActiveItem] = useState(listItems[0]);
  const [userMatches, setUserMatches] = useState([]);
  const [notUserMatches, setNotUserMatches] = useState([]);
  //function
  const [refresher, setRefresher] = useState(false);

  // force fan page render
  const forceFanPageRender = () => {
    setRefresher(!refresher);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefresher(refresher => !refresher);
    }, 1000);
  
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // force fan page render
  useEffect(() => {
    setRefresher(!refresher);
  }, [props.triggerFanPageRender]);

  useEffect(() => {
    setUserID(props.userID);
    console.log("userID: ", userID);
    const fetchMatchesAndTickets = async () => {
      try {
        // Fetch all matches
        const matchesResponse = await axios.get(
          `http://localhost:5000/matches`
        );
        const allMatches = matchesResponse.data;

        // Fetch all tickets
        const ticketsResponse = await axios.get(
          `http://localhost:5000/tickets`
        );
        const allTickets = ticketsResponse.data;
        console.log("all tickets: ", allTickets);

        // Filter tickets reserved by the user
        const userTickets = allTickets.filter(
          (ticket) => ticket.UserID._id === userID
        );
        console.log("user tickets: ", userTickets);

        // Get full match details for matches reserved by the user
        const userMatches = userTickets
          .map((ticket) => {
            // Find the full match object by its ID
            const match = allMatches.find(
              (match) => match._id === ticket.MatchID._id
            );
            // Return an object containing both the match details and the ticket ID
            return {
              ...match,
              ticketNumber: ticket._id, // Include the ticket ID
            };
          })
          .filter((match) => match != null); // Ensure no undefined matches if not found

        setReservedMatchesDetails(userMatches);
        // Get matches not reserved by the user
        const notReservedMatches = allMatches.filter(
          (match) =>
            !userMatches.some((userMatch) => userMatch._id === match._id)
        );
        setMatchesDetails(notReservedMatches);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchMatchesAndTickets();
  }, [props.userID, refresher]); // Add userID to the dependency array

  // Generate MatchCard for each match
  useEffect(() => {
    // Generate MatchCard for each match
    const uuserMatches = reservedMatchesDetails.map((match, index) => (
      <MatchCard
        key={index}
        matchDetails={match}
        handleTicketsClick={() => props.handleTicketsClick()}
        view="reservedView"
        forceFanPageRender={forceFanPageRender}
      />
    ));

    const nnotUserMatches = matchesDetails.map((match, index) => (
      <MatchCard
        key={index}
        matchDetails={match}
        handleTicketsClick={() => props.handleTicketsClick()}
        view="fanView"
        forceFanPageRender={forceFanPageRender}
      />
    ));

    setUserMatches(uuserMatches);
    setNotUserMatches(nnotUserMatches);
  }, [reservedMatchesDetails, matchesDetails]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // return the component
  return (
    <div className="FanView">
      <Sidebar
        listItems={listItems}
        activeItem={activeItem}
        handleItemClick={handleItemClick}
        handleSettingsClick={() => props.handleSettingsClick()}
        userID={props.userID}
      />
      <div className="main">
        <div className="cardsContainer">
          {activeItem === "Matches" ? notUserMatches : userMatches}
        </div>
      </div>
    </div>
  );
}

// Export the component as the default object
export default FanView;
