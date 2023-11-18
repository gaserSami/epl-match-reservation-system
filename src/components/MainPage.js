import React from "react";
import "../styles/MainPage.css";
import MatchCard from "./MatchCard";


function MainPage({ onSignUp, handleTicketsClick}) {
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
  return (
    <div className="mainPage">
      <div className="landingSection">
        <div className="landingText">
          <h1>WELCOME TO</h1>
          <h1>EGYPTIAN PREMIERE LEAUGE</h1>
          <p>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum quod facere explicabo veritatis. Similique reiciendis ipsum maiores soluta veritatis eos sapiente doloribus, quia animi, commodi nulla maxime molestiae! Non autem, quisquam quaerat libero explicabo perferendis debitis accusamus saepe laboriosam! Laudantium molestias deserunt architecto vero? Fuga laborum maxime autem assumenda totam, harum odit voluptates, modi nobis accusantium hic nisi possimus nemo. Labore quasi nam deleniti consequuntur atque hic deserunt excepturi dolores, sit libero itaque eos beatae, ducimus nulla repellendus? Itaque expedita suscipit fugit deleniti dicta et error reprehenderit numquam est eos, debitis quos consequatur! Animi, expedita sunt velit praesentium, eligendi necessitatibus consectetur similique at minus eius perspiciatis eum, maiores ut ipsam non laborum tempore modi culpa nulla debitis iusto inventore sed deleniti. Nobis quos doloribus eaque nesciunt quam consequatur asperiores aliquid, iure fuga amet eveniet optio cupiditate tempora voluptas delectus blanditiis odio illo sequi exercitationem repellat ipsum corporis tempore vero ex. Eius, laboriosam consequuntur. Cupiditate dicta esse expedita quae. Hic rerum placeat optio unde magnam aliquid laborum quos autem molestiae totam fugit iusto minus nostrum deleniti neque, natus commodi incidunt perferendis sapiente? Impedit totam sapiente at alias quis, quas aspernatur ex temporibus, quisquam, excepturi deleniti aut dicta nesciunt quibusdam. At, magni.
          </p>
        </div>
        <div className="landingImage"></div>
      </div>
      <h1>UPCOMING MATCHES</h1>
      <div className="matchesContainer">
      <MatchCard matchDetails={matchesDetails[0]} handleTicketsClick={handleTicketsClick} view="guestView"/>
      <MatchCard matchDetails={matchesDetails[1]} handleTicketsClick={handleTicketsClick} view="guestView"/>
      <MatchCard matchDetails={matchesDetails[2]} handleTicketsClick={handleTicketsClick} view="guestView"/>
      <MatchCard matchDetails={matchesDetails[3]} handleTicketsClick={handleTicketsClick} view="guestView"/>
      </div>
      <button className="sideButton" onClick={onSignUp}>Sign in now to book your ticket!</button>
    </div>
  );
}

export default MainPage;