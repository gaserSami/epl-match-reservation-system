import '../styles/App.css';
import './Header'
import Header from './Header';
import SignUp from './SignUp';
import SignIn from './SignIn';
import MatchDetailsCard from './MatchDetailsCard';
import React, { useState } from 'react';
import MainPage from './MainPage';
import OverlayContainer from './OverlayContainer';



function App() {
  const [page, setPage] = useState('MainPage');
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [MatchDetailsCardView, setMatchDetailsCardView] = useState('guestView');
  const [matchDetails, setMatchDetails] = useState({});
  const handleTicketsClick = (view, matchDetails) => {
    setMatchDetailsCardView(view);
      setShowMatchDetails(true);
      setMatchDetails(matchDetails);
      console.log(showMatchDetails);
  };

  const handleClose = () => {
    setShowMatchDetails(false);
  };
  const handleSignIn = () => {
    setPage('SignIn');
  };
  const handleSignUp = () => {
    setPage('SignUp');
  };
  return (
   <div className="App">
      <Header currentPage={page} onSignIn={handleSignIn}/>
      {page === 'MainPage' && <MainPage onSignUp={handleSignUp} handleTicketsClick={handleTicketsClick}/>}
      {page === 'SignIn' && <SignIn onSignUp={handleSignUp} />}
      {page === 'SignUp' && <SignUp />}
      {showMatchDetails && <OverlayContainer onClose={handleClose}>
      <MatchDetailsCard view={MatchDetailsCardView} matchDetails={matchDetails}/>
      </OverlayContainer>}
      
      {/* ... other pages */}
    </div>
  );
}

export default App;
