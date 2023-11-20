import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';
import Header from './Header';
import SignUp from './SignUp';
import SignIn from './SignIn';
import MatchDetailsCard from './MatchDetailsCard';
import MainPage from './MainPage';
import OverlayContainer from './OverlayContainer';
import FanView from './FanView';
import PersonalCard from './PersonalCard';
import EFAview from './EFAview';
import StadiumDetailsCard from './StadiumDetailsCard';
import SiteAdminView from './SiteAdminView';
import SuccessCard from './SuccessCard';
import FailedCard from './FailedCard';
import PaymentCard from './PaymentCard';

function App() {
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState(''); //for tetsting purposes
  const [userType, setUserType] = useState('guest');
  const [page, setPage] = useState('mainPage');
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [addNewMatch, setAddNewMatch] = useState(false);
  const [addNewStadium, setAddNewStadium] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [showFailedCard, setShowFailedCard] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [MatchDetailsCardView, setMatchDetailsCardView] = useState('guestView');
  const [matchDetails, setMatchDetails] = useState({});
  const [personalDetails, setPersonalDetails] = useState({});
  const [stadiumDetails, setStadiumDetails] = useState({});

  const handleTicketsClick = (view, matchDetails,stadiumDetails) => {
    setMatchDetails(matchDetails);
    setStadiumDetails(stadiumDetails);
    setMatchDetailsCardView(view);
    setShowMatchDetails(true);
  };

  const onLogin = (id, UserType) => {
    setUserID(id);
    // Fetch the user's personal details
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        const updatedPersonalDetails = response.data;
        setPersonalDetails(updatedPersonalDetails);
        setUserType(updatedPersonalDetails.UserType);
        setUsername(updatedPersonalDetails.Username);
  
        // Set page based on UserType
        switch(UserType) {
          case 'guest':
            setPage('mainPage');
            break;
          case 'fan':
            setPage('fanPage');
            break;
          case 'EFAmanger':
            setPage('EFAPage');
            break;
          case 'siteAdmin':
            setPage('siteAdminPage');
            break;
          default:
            setPage('mainPage');
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };



  const handleSettingsClick = (userid) => {
    const { userID } = userid; // Extract userID from personalDetails object
    setUserID(userID);
  };

  const handleSuccessCard = () => {
    setShowSuccessCard(true);
  };

  const handleFailedCard = () => {
    setShowFailedCard(true);
  };

  const handlePaymentCard = () => {
    setShowPaymentCard(true);
  };

  const handleBookTicket = (status) => {
    if (status) {
      handleSuccessCard();
    } else {
      handleFailedCard();
    }
  };

  const handleAddNewMatch = () => {
    setAddNewMatch(true);
  };

  const handleAddNewStadium = () => {
    setAddNewStadium(true);
  };

  const handleClose = () => {
    setShowMatchDetails(false);
    setShowPersonalDetails(false);
    setAddNewMatch(false);
    setAddNewStadium(false);
    setShowSuccessCard(false);
    setShowFailedCard(false);
    setShowPaymentCard(false);
  };

  const handleSignIn = () => {
    setPage('signIn');
  };

  const handleSignUp = () => {
    setPage('signUp');
  };


  return (
    <div className="App">
      <Header currentPage={page} onSignIn={handleSignIn} username={username} />
      {page === 'mainPage' && <MainPage onSignUp={handleSignUp} handleTicketsClick={handleTicketsClick} />}
      {page === 'signIn' && <SignIn onSignUp={handleSignUp} onLogin={onLogin} />}
      {page === 'siteAdminPage' && <SiteAdminView handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick} />}
      {page === 'signUp' && <SignUp />}
      {showMatchDetails && (
        <OverlayContainer onClose={handleClose}>
          <MatchDetailsCard view={MatchDetailsCardView} matchDetails={matchDetails} handlePaymentCard={handlePaymentCard} stadiumDetails={stadiumDetails}/>
        </OverlayContainer>
      )}
      {showPersonalDetails && (
        <OverlayContainer onClose={handleClose}>
          <PersonalCard personalDetails={personalDetails} />
        </OverlayContainer>
      )}
      {page === 'fanPage' && <FanView handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick} />}
      {page === 'EFAPage' && (
        <EFAview handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick} handleAddNewMatch={handleAddNewMatch} handleAddNewStadium={handleAddNewStadium} />
      )}
      {addNewMatch && (
        <OverlayContainer onClose={handleClose}>
          <MatchDetailsCard view="editView" stadiumDetails={stadiumDetails}/>
        </OverlayContainer>
      )}
      {addNewStadium && (
        <OverlayContainer onClose={handleClose}>
          <StadiumDetailsCard view="editView" />
        </OverlayContainer>
      )}
      {showPaymentCard && (
        <OverlayContainer onClose={handleClose}>
          <PaymentCard handleBookTicket={handleBookTicket} />
        </OverlayContainer>
      )}
      {showSuccessCard && (
        <OverlayContainer onClose={handleClose}>
          <SuccessCard message="you can view your tickets anytime in your reserved tab" />
        </OverlayContainer>
      )}
      {showFailedCard && (
        <OverlayContainer onClose={handleClose}>
          <FailedCard message="Something went wrong. Please try again." />
        </OverlayContainer>
      )}
    </div>
  );
}

export default App;
