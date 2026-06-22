import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa le traduzioni
import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationPL from './locales/pl/translation.json';

const resources = {
    it: {
        translation: translationIT
    },
    en: {
        translation: translationEN
    },
    es: {
        translation: translationES
    },
    fr: {
        translation: translationFR
    },
    de: {
        translation: translationDE
    },
    pl: {
        translation: translationPL
    }
};

export const SUPPORTED_LANGS = ['it', 'en', 'es', 'fr', 'de', 'pl'];

// Normalizza un codice lingua (es: en-US -> en) e applica fallback a 'it'.
export function normalizeLang(lng) {
    const base = (lng || '').split('-')[0].toLowerCase();
    return SUPPORTED_LANGS.includes(base) ? base : 'it';
}

i18n
    // Passa l'istanza i18n a react-i18next
    .use(initReactI18next)
    // Inizializza i18next. Lingua iniziale FISSA su 'it' (deterministica): così
    // il render del prerender (SSG) e la prima render del client combaciano ed
    // evitiamo mismatch di hydration. La lingua reale viene rilevata e applicata
    // sul client dopo il mount via detectClientLanguage().
    .init({
        resources,
        lng: 'it',
        fallbackLng: 'it',
        supportedLngs: SUPPORTED_LANGS,
        debug: false,
        initImmediate: false,

        interpolation: {
            escapeValue: false, // React già fa l'escape
        },

        react: {
            useSuspense: false, // Disabilita Suspense per compatibilità
        },
    });

// Rileva la lingua preferita SOLO sul client (mai durante il prerender):
// ordine ?lng= in URL -> localStorage -> lingua del browser.
export function detectClientLanguage() {
    if (typeof window === 'undefined') return 'it';
    try {
        const qs = new URLSearchParams(window.location.search).get('lng');
        if (qs) return normalizeLang(qs);
        const saved = window.localStorage.getItem('blinker-language');
        if (saved) return normalizeLang(saved);
    } catch {
        // localStorage non disponibile (es. modalità privacy): ignora.
    }
    return normalizeLang(navigator.language || (navigator.languages && navigator.languages[0]));
}

export default i18n;
