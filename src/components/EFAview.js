import React from "react";
import '../styles/EFAview.css'
import Sidebar from "./Sidebar";
import MatchCard from "./MatchCard";
import StadiumCard from "./StadiumCard";
import { useState } from "react";

function EFAview({handleTicketsClick, handleSettingsClick, handleAddNewMatch, handleAddNewStadium}) {
  const listItems = ["Stadiums", "Matches"];
  const [activeItem, setActiveItem] = useState(listItems[1]);
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const matchesDetails = [
    {
      date: '2023-01-01',
      time: '18:00',
      homeTeam: 'Al AHLY',
      awayTeam: 'Al GOUNA',
      stadium: 'Cairo Stadium',
      price: 69.99
    },
    {
      date: '2023-04-11',
      time: '12:00',
      homeTeam: 'Al BHLY',
      awayTeam: 'GESOOO',
      stadium: 'Giza Stadium',
      price: 79.99
    },
    {
      date: '2023-11-21',
      time: '11:00',
      homeTeam: 'AYMOOON',
      awayTeam: 'AL ATTAWY',
      stadium: 'Cairo Stadium',
      price: 89.99
    },
    {
      date: '2023-02-03',
      time: '10:00',
      homeTeam: 'FAHDOKA',
      awayTeam: 'GHANNA',
      stadium: 'Cairo Stadium',
      price: 99.99
    }
  ];

  const stadiumsDetails = [
    {
      name: 'Cairo Stadium',
      shape: 'rectangular',
      rows: 100,
      columns: 100
    },
    {
      name: 'Giza Stadium',
      shape: 'Oval',
      rows: 40,
      columns: 40
    },
    {
      name: 'Alex Stadium',
      shape: 'Oval',
      rows: 50,
      columns: 60
    },
    {
      name: 'Suez Stadium',
      shape: 'rectangular',
      rows: 90,
      columns: 100
    }
  ]

return (
  <div className="EFAview">
    <Sidebar listItems={listItems} activeItem={activeItem} handleItemClick={handleItemClick} handleSettingsClick={handleSettingsClick}/>
  <div className="main">
    <div className="cardsContainer">
    {activeItem === 'Matches' ? (
            matchesDetails.map((match, index) => (
              <MatchCard key={index} matchDetails={match} handleTicketsClick={handleTicketsClick} view="editView" />
            ))
          ) : (
            stadiumsDetails.map((stadium, index) => (
              <StadiumCard key={index} stadiumDetails={stadium} />
            ))
          )}
      {activeItem === 'Matches' ? (
    <button className="addSideButton" onClick={handleAddNewMatch}>Add new Match</button>
    ) : (
    <button className="addSideButton" onClick={handleAddNewStadium}>Add new Stadium</button>
    )}
    </div>  
  </div>
</div>
);
}

export default EFAview;