import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importa le traduzioni
import translationIT from './locales/it/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';

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
    }
};

i18n
    // Rileva la lingua del browser
    .use(LanguageDetector)
    // Passa l'istanza i18n a react-i18next
    .use(initReactI18next)
    // Inizializza i18next
    .init({
        resources,
        fallbackLng: 'it', // Lingua di fallback
        debug: false, // Abilita debug in development

        // Callback quando la lingua viene rilevata
        initImmediate: false,

        interpolation: {
            escapeValue: false, // React già fa l'escape
        },

        detection: {
            // Ordine di rilevamento della lingua - prima localStorage, poi browser
            order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

            // Chiave per localStorage
            lookupLocalStorage: 'blinker-language',

            // Cache della lingua rilevata
            caches: ['localStorage'],

            // Lingue supportate
            supportedLngs: ['it', 'en', 'es', 'fr', 'de'],

            // Converti codici lingua del browser (es: en-US -> en)
            convertDetectedLanguage: (lng) => {
                // Estrae solo i primi 2 caratteri del codice lingua
                const detectedLng = lng.split('-')[0].toLowerCase();
                // Verifica se la lingua è supportata, altrimenti fallback
                const finalLng = ['it', 'en', 'es', 'fr', 'de'].includes(detectedLng) ? detectedLng : 'it';
                return finalLng;
            },

            // Non controllare se una lingua è nella whitelist (ora gestito da convertDetectedLanguage)
            checkWhitelist: false,
        },

        // Opzioni aggiuntive
        react: {
            useSuspense: false, // Disabilita Suspense per compatibilità
        },
    });

export default i18n;
