import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import CookieConsent from './components/CookieConsent';
import LanguageSelector from './components/LanguageSelector';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';

const LOCALE_TAG = { it: 'it_IT', en: 'en_US', es: 'es_ES', fr: 'fr_FR', de: 'de_DE' };

function App() {
  useGoogleAnalytics();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = (i18n.language || 'it').split('-')[0];
    document.documentElement.lang = lng;
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', LOCALE_TAG[lng] || 'it_IT');
  }, [i18n.language]);

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
