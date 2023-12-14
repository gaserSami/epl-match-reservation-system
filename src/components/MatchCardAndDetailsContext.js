/*
  This file is used to create a context for the MatchCard and MatchDetails components.
  It is used to pass data between the two components.
*/

// importing dependencies
import React from "react";

// Create context
const MatchCardAndDetailsContext = React.createContext({
  Vieww: null,
  setVieww: () => {},
  MatchDetailss: null,
  setMatchDetailss: () => {},
});

// Export context
export default MatchCardAndDetailsContext;
