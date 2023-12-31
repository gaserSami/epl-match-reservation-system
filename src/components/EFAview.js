/*
  EFAs view component
  This component is responsible for rendering the matches and stadiums cards
  and the sidebar for the EFA manager.
  It also fetches the matches and stadiums data from the server.
  It also handles the click events on the sidebar items.
  It also handles the click events on the matches cards.
  It also handles the click events on the stadiums cards.
  It also handles the click events on the add new match button.
  It also handles the click events on the add new stadium button.
  It also handles the click events on the settings button.
  It also handles the click events on the tickets button.
  It also handles the click events on the edit match button.
*/

// Import dependencies
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// Import components
import "../styles/EFAview.css";
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";
import OverlayContainer from "./OverlayContainer";
import LoadingCard from "./Loading";
// importing context
import MatchCardAndDetailsContext from "./MatchCardAndDetailsContext";
import LoadingContext from "./LoadingContext";
import { set } from "mongoose";

function EFAview({
  handleTicketsClick,
  handleSettingsClick,
  handleAddNewMatch,
  handleAddNewStadium,
  userID,
  handleClose,
}) {
  // Define the list items for the sidebar
  const listItems = ["Stadiums", "Matches"];
  // importing context functions
  const { setVieww } = useContext(MatchCardAndDetailsContext);

  // Define the state variables
  const [matchesDetails, setMatchesDetails] = useState([]);
  const [stadiumsDetails, setStadiumsDetails] = useState([{}]);
  const [activeItem, setActiveItem] = useState(listItems[1]);
  const [loading, setLoading] = useState(true);
  const { setOverlayLoading } = useContext(LoadingContext);

  // Handle the click event on sidebar items
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // Fetch the matches and stadiums data from the server
  useEffect(() => {
    setLoading(true);
    const fetchMatchesAndStadiums = async () => {
      try {
        const matchesResponse = await axios.get(
          "http://localhost:5000/matches"
        );
        const stadiumsResponse = await axios.get(
          "http://localhost:5000/stadiums"
        );
        setMatchesDetails(matchesResponse.data);
        setStadiumsDetails(stadiumsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error!", error);
        setLoading(false);
      }
    };

    fetchMatchesAndStadiums();

    // Then call it every 1.5 seconds
  const intervalId = setInterval(fetchMatchesAndStadiums, 1000);

  // Clear the interval when the component is unmounted
  return () => clearInterval(intervalId);
  }, []); // Only run once on mount

  // return the component
  return (
    <div className="EFAview">
      {loading ? (
        (
          <OverlayContainer>
           <LoadingCard/>
          </OverlayContainer>
        )// Replace this with your loading spinner or message
      ) : (
        <>
          <Sidebar
            listItems={listItems}
            activeItem={activeItem}
            handleItemClick={handleItemClick}
            handleSettingsClick={handleSettingsClick}
            userID={userID}
          />
          <div className="main">
            <div className="cardsContainer">
              {activeItem === "Matches"
                ? matchesDetails.map((match, index) => (
                    <MatchCard
                      key={index}
                      matchDetails={match}
                      handleTicketsClick={handleTicketsClick}
                      handleClose={handleClose}
                      view="editView"
                    />
                  ))
                : stadiumsDetails.map((stadium, index) => (
                    <StadiumCard key={index} stadiumDetails={stadium} />
                  ))}
              {activeItem === "Matches" ? (
                <button
                  className="addSideButton"
                  onClick={() => {
                    setVieww("addView");
                    handleAddNewMatch();
                  }}
                >
                  Add new Match
                </button>
              ) : (
                <button className="addSideButton" onClick={handleAddNewStadium}>
                  Add new Stadium
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Export the component as the default object
export default EFAview;
