import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import CookieConsent from './components/CookieConsent';
import LanguageSelector from './components/LanguageSelector';
import { SeoHead } from './components/SeoHead';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import { getI18n, detectClientLanguage, LANG_PATHS, SUPPORTED_LANGS } from './i18n';

// Solo sulla root: se la lingua preferita (?lng/salvata/browser) non è italiano,
// reindirizza alla versione linguistica (es. /en). Solo client: i crawler senza
// JS restano sulla root italiana (x-default). Nessun loop: gira solo se il path
// è esattamente '/'.
function RootLangRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname !== '/') return;
    const pref = detectClientLanguage();
    if (pref !== 'it') navigate(LANG_PATHS[pref], { replace: true });
  }, [navigate]);
  return null;
}

// Pagina completa in una lingua. La lingua è fissata dalla rotta (URL distinto).
function SiteLayout({ lang, autoRedirect = false }) {
  useGoogleAnalytics();
  return (
    <AppProvider>
      {autoRedirect && <RootLangRedirect />}
      <SeoHead lang={lang} />
      <div className="app-wrapper">
        <Navbar />
        <Homepage />
        <CookieConsent />
        <LanguageSelector />
      </div>
    </AppProvider>
  );
}

function langRoute(lang, autoRedirect = false) {
  return {
    path: LANG_PATHS[lang],
    element: (
      <I18nextProvider i18n={getI18n(lang)}>
        <SiteLayout lang={lang} autoRedirect={autoRedirect} />
      </I18nextProvider>
    ),
  };
}

// Una rotta per lingua (/ = it/x-default, /en, /es, /fr, /de, /pl). Path ignoti
// -> redirect alla root.
export const routes = [
  langRoute('it', true),
  ...SUPPORTED_LANGS.filter((l) => l !== 'it').map((l) => langRoute(l)),
  { path: '*', element: <Navigate to="/" replace /> },
];
