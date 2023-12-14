/*
 * This component renders the main page of the website. (guest)
 * It contains the landing section and the match cards.
 * It also fetches the matches data from the server.
 * It also handles the click events on the sign up button.
 * It also handles the click events on the tickets button.
 */
// importing dependencies
import React, { useState, useEffect } from "react"; // React
import axios from "axios"; // Axios
// importing styles
import "../styles/MainPage.css"; // CSS
// importing components
import MatchCard from "./MatchCard"; // MatchCard component

// Define MainPage component
function MainPage({ onSignUp, handleTicketsClick }) {
  // Define state variables
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  // Fetch matches from the database
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:5000/matches");
        setMatches(response.data);
      } catch (error) {
        setError(error.toString());
      }
    };
    fetchMatches();
  }, []); // Run once when the component mounts

  // Render the component
  return (
    <div className="mainPage">
      <div className="landingSection">
        <div className="landingText">
          <h1>Welcome to</h1>
          <h1>
            the Egyptian Premier League (EPL) - The Heartbeat of Egyptian
            Football
          </h1>
          <p className="content">
            Experience the thrill of Egyptian football at its finest with the
            EPL. Every match is a story of passion, skill, and the undying
            spirit of the beautiful game. Join us as we embark on a journey
            through every goal, tackle, and cheer in Egypt's premier football
            competition. Stay updated with the latest match schedules, live
            scores, and rankings. Dive into in-depth analyses by football
            experts, and watch highlights from every game. Sign up now to
            personalize your experience, follow your favorite teams, and never
            miss a moment of the action.
          </p>
          <h1>
            The EPL - Where Legends Rise and Fans Roar. Be a part of the
            excitement!
          </h1>
        </div>
        <div className="landingImage"></div>
      </div>
      <h1>UPCOMING MATCHES</h1>
      <div className="matchesContainer">
        {/* If there's an error, display it. Otherwise, map over matchesDetails and render a MatchCard for each match. */}
        {error ? (
          <div>Error: {error}</div>
        ) : (
          matches.map((match, index) => (
            <MatchCard
              key={index}
              matchDetails={match}
              handleTicketsClick={handleTicketsClick}
              view="guestView"
            />
          ))
        )}
      </div>
      <button className="sideButton" onClick={onSignUp}>
        Sign un now to book your ticket!
      </button>
    </div>
  );
}

export default MainPage;
