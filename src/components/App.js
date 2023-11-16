import '../styles/App.css';
import './Header'
import Header from './Header';
import MainPage from './MainPage';
import SiteAdminView from './SiteAdminView';
import EFAView from './EFAview';
import FanView from './FanView';
import LoginPage from './LoginPage';
import MatchDetailsCard from './MatchDetailsCard';
import PersonalCard from './PersonalCard';

function App() {
  return (
    // testing
    <div className="App">
      <Header />
      <PersonalCard />
    </div>
  );
}

export default App;
