import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa le traduzioni
import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationPL from './locales/pl/translation.json';

const resources = {
    it: { translation: translationIT },
    en: { translation: translationEN },
    es: { translation: translationES },
    fr: { translation: translationFR },
    de: { translation: translationDE },
    pl: { translation: translationPL },
};

export const SUPPORTED_LANGS = ['it', 'en', 'es', 'fr', 'de', 'pl'];
export const DEFAULT_LANG = 'it';
export const SITE_ORIGIN = 'https://get.blinker-app.com';

// URL per lingua (SEO multilingua: ogni lingua ha un URL distinto e indicizzabile).
// 'it' è la root e funge da x-default.
export const LANG_PATHS = { it: '/', en: '/en', es: '/es', fr: '/fr', de: '/de', pl: '/pl' };
export const OG_LOCALES = { it: 'it_IT', en: 'en_US', es: 'es_ES', fr: 'fr_FR', de: 'de_DE', pl: 'pl_PL' };

// Normalizza un codice lingua (es: en-US -> en) e applica fallback a 'it'.
export function normalizeLang(lng) {
    const base = (lng || '').split('-')[0].toLowerCase();
    return SUPPORTED_LANGS.includes(base) ? base : 'it';
}

const baseOptions = {
    resources,
    fallbackLng: 'it',
    supportedLngs: SUPPORTED_LANGS,
    debug: false,
    initImmediate: false, // init sincrono: necessario per il prerender (SSG)
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
};

// Una istanza i18next per lingua, con lng FISSA. Ogni rotta linguistica monta la
// propria istanza (via <I18nextProvider>): il rendering è deterministico per
// lingua sia in prerender (SSG) sia in hydration. Le risorse sono inline, quindi
// init è sincrono.
const instances = {};
export function getI18n(lng) {
    const l = normalizeLang(lng);
    if (instances[l]) return instances[l];
    const inst = i18next.createInstance();
    inst.use(initReactI18next).init({ ...baseOptions, lng: l });
    instances[l] = inst;
    return inst;
}

// Istanza di default (it): retrocompatibilità + global di react-i18next.
const i18n = getI18n('it');

// Rileva la lingua preferita SOLO sul client (mai durante il prerender):
// ?lng= in URL -> localStorage -> lingua del browser. Usata per il redirect
// dalla root verso /<lang>.
export function detectClientLanguage() {
    if (typeof window === 'undefined') return 'it';
    try {
        const qs = new URLSearchParams(window.location.search).get('lng');
        if (qs) return normalizeLang(qs);
        const saved = window.localStorage.getItem('blinker-language');
        if (saved) return normalizeLang(saved);
    } catch {
        // localStorage non disponibile: ignora.
    }
    return normalizeLang(navigator.language || (navigator.languages && navigator.languages[0]));
}

export default i18n;
