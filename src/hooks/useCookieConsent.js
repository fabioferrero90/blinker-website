import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
    const [consent, setConsent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Carica le preferenze dei cookie dal localStorage
        const savedConsent = localStorage.getItem('cookieConsent');
        if (savedConsent) {
            try {
                const parsedConsent = JSON.parse(savedConsent);
                setConsent(parsedConsent);
            } catch (error) {
                console.error('Errore nel parsing delle preferenze cookie:', error);
                setConsent(null);
            }
        }
        setIsLoading(false);
    }, []);

    const updateConsent = (newConsent) => {
        const consentData = {
            ...newConsent,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };

        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        setConsent(consentData);

        // Log per compliance GDPR

    };

    const hasConsent = (type) => {
        if (!consent) return false;
        return consent[type] === true;
    };

    const revokeConsent = () => {
        localStorage.removeItem('cookieConsent');
        setConsent(null);

    };

    const getConsentAge = () => {
        if (!consent?.timestamp) return null;
        const consentDate = new Date(consent.timestamp);
        const now = new Date();
        return Math.floor((now - consentDate) / (1000 * 60 * 60 * 24)); // giorni
    };

    return {
        consent,
        isLoading,
        updateConsent,
        hasConsent,
        revokeConsent,
        getConsentAge
    };
};
