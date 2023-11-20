import React from "react";
import axios from 'axios';
import { useEffect } from "react";
import '../styles/FanView.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";
import { useState } from "react";

function FanView(props) {

  const listItems = ["Reserved", "Matches"];
  const [matchesDetails, setMatchesDetails] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/matches') // Adjust the URL as necessary
      .then(response => {
        setMatchesDetails(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);
  const [activeItem, setActiveItem] = useState(listItems[1]);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const reservedMatchesDetails = [
    {
      date: '2023-01-01',
      time: '18:00',
      homeTeam: 'Al AHLY',
      awayTeam: 'Al GOUNA',
      stadium: 'Cairo Stadium',
      price: 69.99,
      ticketNumber: 7782
    },
    {
      date: '2023-04-11',
      time: '12:00',
      homeTeam: 'Al BHLY',
      awayTeam: 'GESOOO',
      stadium: 'Giza Stadium',
      price: 79.99,
      ticketNumber: 1234
    },
    {
      date: '2023-11-21',
      time: '11:00',
      homeTeam: 'AYMOOON',
      awayTeam: 'AL ATTAWY',
      stadium: 'Cairo Stadium',
      price: 89.99,
      ticketNumber: 5678
    },
    {
      date: '2023-02-03',
      time: '10:00',
      homeTeam: 'FAHDOKA',
      awayTeam: 'GHANNA',
      stadium: 'Cairo Stadium',
      price: 99.99,
      ticketNumber: 91011
    }
  ];

  

return (
  <div className="FanView">
    <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={() => props.handleSettingsClick()}/>
      <div className="main">
        <div className="cardsContainer">
          {activeItem === 'Matches' ? (
            matchesDetails.map((match, index) => (
              <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="fanView"/>
            ))
          ) : (
            matchesDetails.map((match, index) => (
              <MatchCard key={index} matchDetails={match} handleTicketsClick={() => props.handleTicketsClick()} view="reservedView"/>
            ))
          )}
        </div>  
      </div>
    </div>
);
}

export default FanView;