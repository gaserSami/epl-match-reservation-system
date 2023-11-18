import '../styles/App.css';
import './Header'
import Header from './Header';
import SignUp from './SignUp';
import SignIn from './SignIn';
import MatchDetailsCard from './MatchDetailsCard';
import React, { useState } from 'react';
import MainPage from './MainPage';
import OverlayContainer from './OverlayContainer';
import FanView from './FanView';
import PersonalCard from './PersonalCard';
import { useEffect } from 'react';

 

function App() {
  const [page, setPage] = useState('fanPage');
  const [username, setUsername] = useState('guest');
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [MatchDetailsCardView, setMatchDetailsCardView] = useState('guestView');
  const [matchDetails, setMatchDetails] = useState({});
  const [personalDetails, setPersonalDetails] = useState({});
  const handleTicketsClick = (view, matchDetails) => {
    setMatchDetailsCardView(view);
      setShowMatchDetails(true);
      setMatchDetails(matchDetails);
  };
const handleSettingsClick = (personalDetails) => {
  setShowPersonalDetails(true);
  setPersonalDetails(personalDetails)
}
  const handleClose = () => {
    setShowMatchDetails(false);
    setShowPersonalDetails(false);
  };
  const handleSignIn = () => {
    setPage('signIn');
  };


  const handleSignUp = () => {
    setPage('signUp');
  };

  useEffect(() => {
  }, [page]);

  return (
   <div className="App">
      <Header currentPage={page} onSignIn={handleSignIn} username={username}/>
      {page === 'mainPage' && <MainPage onSignUp={handleSignUp} handleTicketsClick={handleTicketsClick}/>}
      {page === 'signIn' && <SignIn onSignUp={handleSignUp} />}
      {page === 'signUp' && <SignUp />}
      {showMatchDetails && <OverlayContainer onClose={handleClose}>
      <MatchDetailsCard view={MatchDetailsCardView} matchDetails={matchDetails}/>
      </OverlayContainer>}
      {showPersonalDetails && <OverlayContainer onClose={handleClose}>
      <PersonalCard personalDetails={personalDetails}/>
      </OverlayContainer>}
      {page === 'fanPage' && <FanView handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick}/>}
    </div>
  );
}

export default App;
