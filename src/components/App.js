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
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('guest');
  const [page, setPage] = useState('mainPage');
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [addNewMatch, setAddNewMatch] = useState(false);
  const [editMatch, setEditMatch] = useState(false);
  const [addNewStadium, setAddNewStadium] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [failedMessage, setFailedMessage] = useState('');
  const [showFailedCard, setShowFailedCard] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [MatchDetailsCardView, setMatchDetailsCardView] = useState('guestView');
  const [matchesDetails, setMatchesDetails] = useState([]); // [matchDetails]
  const [matchDetails, setMatchDetails] = useState({});
  const [personalDetails, setPersonalDetails] = useState({});
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [linesmen, setLinesmen] = useState([]);
  const [referees, setReferees] = useState([]);

  useEffect(() => {
    const fetchTeamsAndStadiums = async () => {
      try {
        const teamsResponse = await axios.get('http://localhost:5000/teams');
        setTeams(teamsResponse.data);
        const stadiumsResponse = await axios.get('http://localhost:5000/stadiums');
        setStadiums(stadiumsResponse.data);
        const refereesResponse = await axios.get('http://localhost:5000/referees');
        setReferees(refereesResponse.data);
        const linesmenResponse = await axios.get('http://localhost:5000/linesmen');
        setLinesmen(linesmenResponse.data);
        const matchesResponse = await axios.get('http://localhost:5000/matches');
        setMatchesDetails(matchesResponse.data);
      } catch (error) {
        console.error('There was an error!', error);
      }
    };
    fetchTeamsAndStadiums();
  }, []);

  const handleTicketsClick = (view, matchdetails) => {
    setMatchDetails(matchdetails);
    setMatchDetailsCardView(view);
    setShowMatchDetails(true);
  };

  const onLogin = (id, UserType) => {
    setUserID(id);
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        const updatedPersonalDetails = response.data;
        setPersonalDetails(updatedPersonalDetails);
        setUserType(updatedPersonalDetails.UserType);
        setUsername(updatedPersonalDetails.Username);

        switch (UserType) {
          case 'guest':
            setPage('mainPage');
            break;
          case 'fan':
            setPage('fanPage');
            break;
          case 'EFAmanager':
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

  const handleSettingsClick = (personaldetails) => {
    setPersonalDetails(personalDetails);
    setShowPersonalDetails(true);
  };

  const handleSuccessCard = (message) => {
    setSuccessMessage(message);
    setShowSuccessCard(true);
  };

  const handleFailedCard = (message) => {
    setFailedMessage(message);
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

  const handleEditMatch = () => {
    setEditMatch(true);
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
    setEditMatch(false);
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
      {page === 'mainPage' && <MainPage onSignUp={handleSignUp} handleTicketsClick={handleTicketsClick} matchesDetails={matchesDetails} />}
      {page === 'signIn' && <SignIn onSignUp={handleSignUp} onLogin={onLogin} />}
      {page === 'siteAdminPage' && <SiteAdminView handleSettingsClick={handleSettingsClick} userID={userID} />}
      {page === 'signUp' && <SignUp />}
      {showMatchDetails && (
        <OverlayContainer onClose={handleClose}>
          <MatchDetailsCard view={MatchDetailsCardView} matchDetails={matchDetails} handlePaymentCard={handlePaymentCard} teams={teams} stadiums={stadiums} referees={referees} linesmen={linesmen}  />
        </OverlayContainer>
      )}
      {showPersonalDetails && (
        <OverlayContainer onClose={handleClose}>
          <PersonalCard personalDetails={personalDetails} />
        </OverlayContainer>
      )}
      {page === 'fanPage' && <FanView handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick} userID={userID}  matchesDetails={matchesDetails}/>}
      {page === 'EFAPage' && (
        <EFAview handleTicketsClick={handleTicketsClick} handleSettingsClick={handleSettingsClick} handleAddNewMatch={handleAddNewMatch} handleEditMatch={handleEditMatch} handleAddNewStadium={handleAddNewStadium} matchDetails={matchDetails} userID={userID} />
      )}
      {addNewMatch && (
        <OverlayContainer onClose={handleClose}>
          <MatchDetailsCard view="addView" teams={teams} stadiums={stadiums} referees={referees} linesmen={linesmen} />
        </OverlayContainer>
      )}
      {editMatch && (
        <OverlayContainer onClose={handleClose}>
          <MatchDetailsCard view="editView" matchDetails={matchDetails} teams={teams} stadiums={stadiums} referees={referees} linesmen={linesmen} />
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
          <SuccessCard message={successMessage} />
        </OverlayContainer>
      )}
      {showFailedCard && (
        <OverlayContainer onClose={handleClose}>
          <FailedCard message={failedMessage} />
        </OverlayContainer>
      )}
    </div>
  );
}

export default App;
