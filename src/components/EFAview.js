import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import '../styles/EFAview.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";
import MatchCardAndDetailsContext from "./MatchCardAndDetailsContext";


function EFAview({ handleTicketsClick, handleSettingsClick, handleAddNewMatch, handleAddNewStadium, userID, handleEditMatch,triggerMainPageRender, handleClose }) {
  // Define the list items for the sidebar
  const listItems = ["Stadiums", "Matches"];
  const { setMatchDetailss } = useContext(MatchCardAndDetailsContext);
  const { setVieww } = useContext(MatchCardAndDetailsContext);

  // Define the state variables
  const [matchesDetails, setMatchesDetails] = useState([]);
  const [stadiumsDetails, setStadiumsDetails] = useState([{}]);
  const [activeItem, setActiveItem] = useState(listItems[1]);
  const [triggerMainPageRenderr, setTriggerMainPageRender] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle the click event on sidebar items
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // Fetch the matches and stadiums data from the server
  useEffect(() => {
    setLoading(true);
    const fetchMatchesAndStadiums = async () => {
      try {
        const matchesResponse = await axios.get('http://localhost:5000/matches');
        const stadiumsResponse = await axios.get('http://localhost:5000/stadiums');
  
        setMatchesDetails(matchesResponse.data);
        setStadiumsDetails(stadiumsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
  
    fetchMatchesAndStadiums();
  }, [triggerMainPageRender]);



  return (
    <div className="EFAview">
      {loading ? (
        <div>Loading...</div> // Replace this with your loading spinner or message
      ) : (
        <>
          <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={handleSettingsClick} userID={userID}/>
          <div className="main">
            <div className="cardsContainer">
              {activeItem === 'Matches' ? (
                matchesDetails.map((match, index) => (
                  <MatchCard key={index} matchDetails={match} handleTicketsClick={handleTicketsClick} handleClose={handleClose} view="editView"/>
                ))
              ) : (
                stadiumsDetails.map((stadium, index) => (
                  <StadiumCard key={index} stadiumDetails={stadium}/>
                ))
              )}
              {activeItem === 'Matches' ? (
                <button className="addSideButton" onClick={() => {
                  setVieww("addView");
                  handleAddNewMatch();
                }}>Add new Match</button>
              ) : (
                <button className="addSideButton" onClick={handleAddNewStadium}>Add new Stadium</button>
              )}
            </div>  
          </div>
        </>
      )}
    </div>
  );
}

export default EFAview;