/*
  MatchCard component
  Props:
    - matchDetails: Object containing match details
    - handleTicketsClick: Function to handle tickets button click
    - view: String indicating the view type
  State:
    - matchDetails: Object containing match details
  Context:
    - matchDetails: Object containing match details
    - setMatchDetails: Function to set matchDetails
    - view: String indicating the view type
    - setView: Function to set view
 */

// importing dependencies
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
// importing styles
import "../styles/MatchCard.css";
// importing assets
import editIcon from "../assets/editing.png";
// importing context
import MatchCardAndDetailsContext from "./MatchCardAndDetailsContext";
import LoadingContext from "./LoadingContext";
import { set } from "mongoose";

// Define MatchCard component
const MatchCard = (props) => {
  // State to store match details
  const [matchDetails, setMatchDetails] = useState(props.matchDetails || {});
  const [matchID, setMatchID] = useState(props.matchDetails._id);
  const { setMatchDetailss } = useContext(MatchCardAndDetailsContext);
  const { setVieww } = useContext(MatchCardAndDetailsContext);
  const { setOverlayLoading } = useContext(LoadingContext);

  const [ticketPrice, setTicketPrice] = useState(0);

  // Update matchDetails when props.matchDetails changes
  useEffect(() => {
    setMatchDetails(props.matchDetails);
    setMatchDetailss(props.matchDetails);
    let vieww;
    switch (props.view) {
      case "fanView":
        vieww = "bookView";
        break;
      case "editView":
        vieww = "editView";
        break;
      case "reservedView":
        vieww = "reservedView";
        break;
      default:
        vieww = "guestView";
    }
  }, [props.matchDetails]);

  // Destructure matchDetails object
  const {
    HomeTeamID: { TeamName: homeTeamName } = {},
    AwayTeamID: { TeamName: awayTeamName } = {},
    MatchDate: matchDate,
    MatchTime: time,
    StadiumID: { StadiumName: stadium } = {},
    Price: price,
  } = matchDetails || {};

  const { forceFanPageRender } = props;

  // Format date
  const date = isNaN(Date.parse(matchDate)) ? null : new Date(matchDate);
  const month = date.toLocaleString("default", { month: "long" });

  // Generate random ticket number
  const ticketNumber =
    matchDetails && matchDetails.ticketNumber ? matchDetails.ticketNumber : 0;

  if (ticketNumber !== 0) {
    axios
      .get(`http://localhost:5000/tickets/${ticketNumber}`)
      .then((response) => {
        const ticket = response.data;
        setTicketPrice(ticket.Price);
      })
      .catch((error) => console.error("Error fetching ticket:", error));
  }
  // Generate match title
  const title = `${homeTeamName} vs ${awayTeamName}`;

  // Re-render MainPage when forceMainPageRender changes
  useEffect(() => {
    // Your code here...
    console.log("forceMainPageRender");
    console.log("useEffect");
  }, [props.triggerMainPageRender]);

  const cancel = async () => {
    if (ticketNumber !== 0) {
      try {
        setOverlayLoading(true);
        // Fetch the ticket data
        const ticketResponse = await axios.get(
          `http://localhost:5000/tickets/${ticketNumber}`
        );
        const ticket = ticketResponse.data;

        console.log("ticket:");
        console.log(ticket);

        // Fetch the match data
        const matchResponse = await axios.get(
          `http://localhost:5000/matches/${ticket.MatchID._id}`
        );
        const match = matchResponse.data;

        console.log("match:");
        console.log(matchResponse.data);

        // Get today's date and the match date
        const today = new Date();
        const matchDate = new Date(match.MatchDate);

        // Calculate the difference in days
        const diffInDays = Math.floor(
          (matchDate - today) / (1000 * 60 * 60 * 24)
        );

        // Only allow cancellation if the match is 3 days away or more
        if (diffInDays < 3) {
          alert("Cannot cancel a ticket less than 3 days before the match");
          setOverlayLoading(false);
          return;
        }

        // Send a DELETE request to the server
        const response = await axios.delete(
          `http://localhost:5000/tickets/${ticketNumber}`
        );

        // Check if the request was successful
        if (response.status === 200) {
          console.log("Ticket cancelled successfully");
          alert("Ticket cancelled successfully");
          setOverlayLoading(false);
          if (forceFanPageRender) {
            forceFanPageRender();
          }
        } else {
          console.log("Failed to cancel the ticket");
          setOverlayLoading(false);
        }
      } catch (error) {
        console.error("There was an error!", error);
        setOverlayLoading(false);
      }
    }
  };

  return (
    <div className="matchCard">
      <div className="date">
        <span className="month">{date.getDate()}</span>
        <span className="day">{month}</span>
        <span className="year">{date.getFullYear()}</span>
      </div>
      <div className="info">
        <h2>
          {props.view === "reservedView"
            ? `#${ticketNumber}`
            : "EGYPTIAN PREMIER LEAGUE"}
        </h2>
        <h1 className="teams">{title}</h1>
        <span className="time">{time}</span>
        <p className="stadium">{stadium}, Egypt</p>
      </div>
      <div className="price">
        {ticketNumber !== 0 ? (ticketPrice !==0 ? ticketPrice : "loading...") : (price !==0 ? price : "loading...")} L.E
      </div>
      <div className="buttons">
        {props.view !== "reservedView" && (
          <button
            onClick={() => {
              setMatchDetailss(matchDetails);
              setVieww(props.view === "fanView" ? "bookView" : "guestView");
              props.handleTicketsClick(
                props.view === "fanView" ? "bookView" : "guestView",
                matchDetails
              );
            }}
          >
            Tickets
          </button>
        )}
        {props.view === "editView" && (
          <button
            onClick={() => {
              setMatchDetailss(matchDetails);
              setVieww("editView");
              props.handleTicketsClick("editView", matchDetails);
            }}
          >
            <img src={editIcon} alt="" />
          </button>
        )}
        {props.view === "reservedView" && (
          <>
            <button className="cancel" onClick={cancel}>
              Cancel
            </button>
            <button
              onClick={() => {
                setMatchDetailss(matchDetails);
                setVieww("reservedView");
                props.handleTicketsClick("reservedView", matchDetails);
              }}
            >
              view
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
