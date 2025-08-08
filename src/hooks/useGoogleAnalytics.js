import { useEffect } from 'react';
import { useCookieConsent } from './useCookieConsent';

// Inizializza Google Analytics
const initGA = (trackingId) => {
  // Carica Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Inizializza gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', trackingId, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  // Rendi gtag disponibile globalmente
  window.gtag = gtag;
};

// Hook per Google Analytics
export const useGoogleAnalytics = () => {
  const { hasConsent } = useCookieConsent();
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;

  useEffect(() => {
    // Inizializza GA solo se c'è consenso analytics
    if (hasConsent('analytics') && trackingId && trackingId !== 'G-XXXXXXXXXX') {
      initGA(trackingId);
    }
  }, [hasConsent, trackingId]);

  // Funzione per tracciare eventi
  const trackEvent = (action, category, label, value) => {
    if (hasConsent('analytics') && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  // Funzione per tracciare pageview
  const trackPageView = (page_path) => {
    if (hasConsent('analytics') && window.gtag) {
      window.gtag('config', trackingId, {
        page_path: page_path
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    isEnabled: hasConsent('analytics') && trackingId && trackingId !== 'G-XXXXXXXXXX'
  };
};
