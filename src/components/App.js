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
import EFAview from './EFAview';
import StadiumDetailsCard from './StadiumDetailsCard';
import SiteAdminView from './SiteAdminView';

 

function App() {
  const pages = ['mainPage', 'fanPage', 'EFAPage', 'siteAdminPage']; //just for testing
  const [page, setPage] = useState(pages[2]);
  const [username, setUsername] = useState('guest');
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [addNewMatch, setAddNewMatch] = useState(false);
  const [addNewStadium, setAddNewStadium] = useState(false);
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
const handleAddNewMatch = () => {
  setAddNewMatch(true);
}
const handleAddNewStadium = () => {
  setAddNewStadium(true);
}
  const handleClose = () => {
    setShowMatchDetails(false);
    setShowPersonalDetails(false);
    setAddNewMatch(false);
    setAddNewStadium(false);
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
      {page === 'siteAdminPage' && <SiteAdminView handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick}/>}
      {page === 'signUp' && <SignUp />}
      {showMatchDetails && <OverlayContainer onClose={handleClose}>
      <MatchDetailsCard view={MatchDetailsCardView} matchDetails={matchDetails}/>
      </OverlayContainer>}
      {showPersonalDetails && <OverlayContainer onClose={handleClose}>
      <PersonalCard personalDetails={personalDetails}/>
      </OverlayContainer>}
      {page === 'fanPage' && <FanView handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick}/>}
      {page === 'EFAPage' && <EFAview handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick} handleAddNewMatch={handleAddNewMatch} handleAddNewStadium={handleAddNewStadium}/>}
      {addNewMatch && <OverlayContainer onClose={handleClose}>
      <MatchDetailsCard view="editView"/>
      </OverlayContainer>}
      {addNewStadium && <OverlayContainer onClose={handleClose}>
      <StadiumDetailsCard view="editView"/>
      </OverlayContainer>}
    </div>
  );
}

export default App;
