// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import "../styles/MainPage.css";
import MatchCard from "./MatchCard";

// Define MainPage component
function MainPage({ onSignUp, handleTicketsClick, matchesDetails}) {
  // Define state variables
  const [matches, setMatches] = useState(matchesDetails || []);
  const [error, setError] = useState(null);

  console.log(matches);

  // Use useEffect to fetch match details when the component mounts
  useEffect(() => {
    setMatches(matches);
  }, [matchesDetails]);

  // Render the component
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
      {/* If there's an error, display it. Otherwise, map over matchesDetails and render a MatchCard for each match. */}
      {error ? (
        <div>Error: {error}</div>
      ) : (
        matchesDetails.map((match, index) => (
          <MatchCard key={index} matchDetails={match} handleTicketsClick={handleTicketsClick} view="guestView"/>
        ))
      )}
      </div>
      <button className="sideButton" onClick={onSignUp}>Sign in now to book your ticket!</button>
    </div>
  );
}

export default MainPage;