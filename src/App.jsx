import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import CookieConsent from './components/CookieConsent';
import LanguageSelector from './components/LanguageSelector';

function App() {
  return (
    <AppProvider>
      <div className="app-wrapper">
        <Navbar />
        <Homepage />
        <CookieConsent />
        <LanguageSelector />
      </div>
    </AppProvider>
  );
}

export default App;
