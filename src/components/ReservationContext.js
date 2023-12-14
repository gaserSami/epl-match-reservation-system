/*
  This file is used to create a context for the reservation page.
  It is used to pass data between the PaymentCard and Seats components.
*/

// ReservationContext.js
import React from "react";

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
