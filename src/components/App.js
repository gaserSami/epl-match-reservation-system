import '../styles/App.css';
import './Header'
import Header from './Header';
import MainPage from './MainPage';
import SiteAdminView from './SiteAdminView';
import EFAView from './EFAview';

function App() {
  return (
    // testing
    <div className="App">
      <Header />
      <EFAView />
    </div>
  );
}

export default App;
