import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/App.css";
import Header from "./Header";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import LoadingCard from "./Loading";
import MatchDetailsCard from "./MatchDetailsCard";
import MainPage from "./MainPage";
import OverlayContainer from "./OverlayContainer";
import FanView from "./FanView";
import PersonalCard from "./PersonalCard";
import EFAview from "./EFAview";
import StadiumDetailsCard from "./StadiumDetailsCard";
import SiteAdminView from "./SiteAdminView";
import SuccessCard from "./SuccessCard";
import FailedCard from "./FailedCard";
import PaymentCard from "./PaymentCard";
import ReservationContext from "./ReservationContext";
import MatchCardAndDetailsContext from "./MatchCardAndDetailsContext";
import LoadingContext from "./LoadingContext";

function App() {
  const [userID, setUserID] = useState(null);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("guest");
  const [page, setPage] = useState("mainPage");
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [addNewMatch, setAddNewMatch] = useState(false);
  const [editMatch, setEditMatch] = useState(false);
  const [addNewStadium, setAddNewStadium] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failedMessage, setFailedMessage] = useState("");
  const [showFailedCard, setShowFailedCard] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [MatchDetailsCardView, setMatchDetailsCardView] = useState("guestView");
  const [matchesDetails, setMatchesDetails] = useState([]); // [matchDetails]
  const [matchDetails, setMatchDetails] = useState({});
  const [personalDetails, setPersonalDetails] = useState({});
  const [teams, setTeams] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [linesmen, setLinesmen] = useState([]);
  const [referees, setReferees] = useState([]);
  const [triggerMainPageRender, setTriggerMainPageRender] = useState(false);
  const [triggerFanPageRender, setTriggerFanPageRender] = useState(false);
  const [mySeatsNumber, setMySeatsNumber] = useState([]); // New state for seat numbers like [1, 2, 3]
  const [UserIDD, setUserIDD] = useState(null);
  const [Pricee, setPricee] = useState(null);
  const [MatchIDD, setMatchIDD] = useState(null); // New state for seat numbers like [1, 2, 3
  const [MatchDetailss, setMatchDetailss] = useState([]); // [matchDetails
  const [Vieww, setVieww] = useState("guestView"); // [matchDetails
  const [overlayLoading, setOverlayLoading] = useState(false);


  const forceMainPageRender = () => {
    // Toggle the state to force re-render
    setTriggerMainPageRender(!triggerMainPageRender);
    console.log("forceMainPageRender");
    console.log(triggerMainPageRender);
  };

  const forceFanPageRender = () => {
    // Toggle the state to force re-render
    setTriggerFanPageRender(!triggerFanPageRender);
    console.log("forceFanPageRender");
    console.log(triggerFanPageRender);
  };

  useEffect(() => {

    const userID = localStorage.getItem("userID");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentPage = localStorage.getItem("currentPage");

    if (isLoggedIn) {
      setUserID(userID);
      setPage(currentPage);
      axios
        .get(`http://localhost:5000/users/${userID}`)
        .then((response) => {
          const updatedPersonalDetails = response.data;
          setPersonalDetails(updatedPersonalDetails);
          setUserType(updatedPersonalDetails.UserType);
          setUsername(updatedPersonalDetails.Username);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }


    const fetchTeamsAndStadiums = async () => {
      try {
        const teamsResponse = await axios.get("http://localhost:5000/teams");
        setTeams(teamsResponse.data);
        const stadiumsResponse = await axios.get(
          "http://localhost:5000/stadiums"
        );
        setStadiums(stadiumsResponse.data);
        const refereesResponse = await axios.get(
          "http://localhost:5000/referees"
        );
        setReferees(refereesResponse.data);
        const linesmenResponse = await axios.get(
          "http://localhost:5000/linesmen"
        );
        setLinesmen(linesmenResponse.data);
        const matchesResponse = await axios.get(
          "http://localhost:5000/matches"
        );
        setMatchesDetails(matchesResponse.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchTeamsAndStadiums();
  }, []);

  const handleTicketsClick = (view, matchdetails) => {
    console.log("here in handleTicketsClick");
    console.log(matchdetails);
    console.log(view);
    console.log("====================================");
    if (!matchdetails) {
      matchdetails = matchesDetails[0];
      view = "bookView";
    }
    //setMatchDetails(matchdetails);
    //setMatchDetailsCardView(view);
    setShowMatchDetails(true);
  };

  const onLogin = (id, UserType) => {
    setUserID(id);
    localStorage.setItem("userID", id);
    localStorage.setItem("isLoggedIn", true);
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        const updatedPersonalDetails = response.data;
        setPersonalDetails(updatedPersonalDetails);
        setUserType(updatedPersonalDetails.UserType);
        setUsername(updatedPersonalDetails.Username);

        switch (UserType) {
          case "guest":
            setPage("mainPage");
            localStorage.setItem("currentPage", "mainPage");
            break;
          case "fan":
            setPage("fanPage");
            localStorage.setItem("currentPage", "fanPage");
            break;
          case "EFAmanager":
            setPage("EFAPage");
            localStorage.setItem("currentPage", "EFAPage");
            break;
          case "siteAdmin":
            setPage("siteAdminPage");
            localStorage.setItem("currentPage", "siteAdminPage");
            break;
          default:
            setPage("mainPage");
            localStorage.setItem("currentPage", "mainPage");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const onLogOut = () => {
    setUserID(null);
    setUsername("");
    setUserType("guest");
    setPage("mainPage");
    localStorage.removeItem("userID");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentPage");
  }

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
    if (mySeatsNumber.length !== 0) {
      console.log(mySeatsNumber);
      setShowPaymentCard(true);
    } else {
      alert("Please select at least one seat");
    }
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
    setPage("signIn");
  };

  const handleSignUp = () => {
    setPage("signUp");
  };

  return (
    <div className="App">
      <Header className="sticky-header" currentPage={page} onSignIn={handleSignIn} onLogOut={onLogOut} username={username} />
      <Header className="fixed-header" currentPage={page} onSignIn={handleSignIn} onLogOut={onLogOut} username={username} />
      
      <LoadingContext.Provider value={{ overlayLoading, setOverlayLoading }}>
      <MatchCardAndDetailsContext.Provider
        value={{ MatchDetailss, setMatchDetailss, Vieww, setVieww }}
      >
        {page === "mainPage" && (
          <MainPage
            onSignUp={handleSignUp}
            handleTicketsClick={handleTicketsClick}
          />
        )}
        {page === "signIn" && (
          <SignIn onSignUp={handleSignUp} onLogin={onLogin} />
        )}
        {page === "siteAdminPage" && (
          <SiteAdminView
            handleSettingsClick={handleSettingsClick}
            userID={userID}
          />
        )}
        {page === "signUp" && <SignUp />}
        {page === "fanPage" && (
          <FanView
            handleTicketsClick={handleTicketsClick}
            handleSettingsClick={handleSettingsClick}
            userID={userID}
            triggerFanPageRender={triggerFanPageRender}
          />
        )}
        {page === "EFAPage" && (
          <EFAview
            handleClose={handleClose}
            handleTicketsClick={handleTicketsClick}
            handleSettingsClick={handleSettingsClick}
            handleAddNewMatch={handleAddNewMatch}
            handleAddNewStadium={handleAddNewStadium}
            userID={userID}
          />
        )}
        {showPersonalDetails && (
          <OverlayContainer onClose={handleClose}>
            <PersonalCard personalDetails={personalDetails} />
          </OverlayContainer>
        )}
        {addNewMatch && (
          <OverlayContainer onClose={handleClose}>
            <MatchDetailsCard
              view="addView"
              teams={teams}
              stadiums={stadiums}
              referees={referees}
              linesmen={linesmen}
              forceMainPageRender={forceMainPageRender}
              handleClose={handleClose}
            />
          </OverlayContainer>
        )}
        {editMatch && (
          <OverlayContainer onClose={handleClose}>
            <MatchDetailsCard
              view="editView"
              matchDetails={matchDetails}
              teams={teams}
              stadiums={stadiums}
              referees={referees}
              linesmen={linesmen}
              forceMainPageRender={forceMainPageRender}
              handleClose={handleClose}
            />
          </OverlayContainer>
        )}
        {addNewStadium && (
          <OverlayContainer onClose={handleClose}>
            <StadiumDetailsCard
              view="editView"
              forceMainPageRender={forceMainPageRender}
            />
          </OverlayContainer>
        )}

        <ReservationContext.Provider
          value={{
            mySeatsNumber,
            setMySeatsNumber,
            UserIDD,
            setUserIDD,
            Pricee,
            setPricee,
            MatchIDD,
            setMatchIDD,
          }}
        >
          {showMatchDetails && (
            <OverlayContainer onClose={handleClose}>
              <MatchDetailsCard
                view={MatchDetailsCardView}
                matchDetails={matchDetails}
                handlePaymentCard={handlePaymentCard}
                teams={teams}
                stadiums={stadiums}
                referees={referees}
                linesmen={linesmen}
                forceMainPageRender={forceMainPageRender}
                userID={userID}
                handleClose = {handleClose}
              />
            </OverlayContainer>
          )}
          {showPaymentCard && (
            <OverlayContainer onClose={handleClose}>
              <PaymentCard
                handleBookTicket={handleBookTicket}
                forceFanPageRender={forceFanPageRender}
              />
            </OverlayContainer>
          )}
        </ReservationContext.Provider>

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
         {overlayLoading && (
          <OverlayContainer>
           <LoadingCard/>
          </OverlayContainer>
        )}
      </MatchCardAndDetailsContext.Provider>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
