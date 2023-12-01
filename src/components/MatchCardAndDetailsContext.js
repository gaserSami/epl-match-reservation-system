// ReservationContext.js
import React from 'react';

const MatchCardAndDetailsContext = React.createContext({
  Vieww: null,
  setVieww: () => {},
  MatchDetailss: null,
  setMatchDetailss: () => {},
});

export default MatchCardAndDetailsContext;
