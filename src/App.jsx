import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import CookieConsent from './components/CookieConsent';
import LanguageSelector from './components/LanguageSelector';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';

function App() {
  // Inizializza Google Analytics
  useGoogleAnalytics();

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
