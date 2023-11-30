// ReservationContext.js
import React from 'react';

const ReservationContext = React.createContext({
  MatchIDD: null,
  setMatchIDD: () => {},
  UserIDD: null,
  setUserIDD: () => {},
  mySeatsNumber: [],
  setMySeatsNumber: () => {},
  Pricee: null,
  setPricee: () => {},
});

export default ReservationContext;
