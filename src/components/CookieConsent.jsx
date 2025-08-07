import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faTimes, faCog, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        essential: true, // Sempre attivo
        analytics: false,
        marketing: false
    });
    const { t } = useTranslation();

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const acceptAll = () => {
        const consent = {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        setShowBanner(false);
        console.log('Cookie consent - Accept all:', consent);
    };

    const acceptSelected = () => {
        const consent = {
            ...cookiePreferences,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        setShowBanner(false);
        setShowSettings(false);
        console.log('Cookie consent - Accept selected:', consent);
    };

    const rejectAll = () => {
        const consent = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        setShowBanner(false);
        console.log('Cookie consent - Reject all:', consent);
    };

    const updatePreference = (type, value) => {
        setCookiePreferences(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Mostra sempre il tasto minimizzato se il banner è chiuso
    if (!showBanner && !isMinimized) {
        return (
            <div className="fixed bottom-20 left-4 z-5">
                <button
                    onClick={() => setShowBanner(true)}
                    className="w-12 h-12 bg-orange-900 rounded-full shadow-gray-800 shadow-2xl flex items-center justify-center text-orange-200 transition-colors border-2 border-orange-900 cursor-pointer"
                    aria-label={t('cookieConsent.reopenLabel')}
                >
                    <FontAwesomeIcon icon={faCookieBite} className="text-lg" />
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Popup principale */}
            {!showSettings && (
                <div className={`fixed bottom-20 left-4 z-50 transition-all duration-300 ease-in-out ${isMinimized ? 'w-12 h-12' : 'w-80'
                    }`}>
                    {isMinimized ? (
                        // Stato minimizzato - solo icona
                        <button
                            onClick={toggleMinimize}
                            className="w-12 h-12 bg-background-dark rounded-full shadow-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors border-2 border-primary cursor-pointer"
                            aria-label={t('cookieConsent.reopenLabel')}
                        >
                            <FontAwesomeIcon icon={faCookieBite} className="text-lg" />
                        </button>
                    ) : (
                        // Stato espanso - popup completo
                        <div className="bg-background-dark rounded-2xl shadow-2xl border border-gray-900 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-black to-gray-900">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCookieBite} className="text-white text-sm" />
                                    </div>
                                    <h3 className="text-white font-semibold text-sm">{t('cookieConsent.title')}</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowBanner(false)}
                                        className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                                        aria-label={t('cookieConsent.close')}
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="text-xs" />
                                    </button>
                                </div>
                            </div>

                            {/* Contenuto */}
                            <div className="p-4 bg-gray-950">
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    {t('cookieConsent.description')}
                                </p>

                                {/* Pulsanti principali */}
                                <div className="space-y-3">
                                    <button
                                        onClick={acceptAll}
                                        className="w-full bg-gradient-to-r from-[#ff4123] to-[#ff0067] text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
                                    >
                                        {t('cookieConsent.acceptAll')}
                                    </button>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowSettings(true)}
                                            className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <FontAwesomeIcon icon={faCog} className="text-xs" />
                                            {t('cookieConsent.customize')}
                                        </button>
                                        <button
                                            onClick={rejectAll}
                                            className="flex-1 bg-gray-700 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-600 transition-colors cursor-pointer"
                                        >
                                            {t('cookieConsent.reject')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modal impostazioni dettagliate */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
                    <div className="bg-black rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCog} className="text-white text-sm" />
                                    </div>
                                    <h3 className="text-white font-semibold">{t('cookieConsent.title')}</h3>
                                </div>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="text-gray-400 hover:text-white transition-colors p-2  cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            {/* Opzioni cookie */}
                            <div className="space-y-4 mb-6">
                                {/* Cookie essenziali */}
                                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                    <div>
                                        <h4 className="text-white font-medium text-sm">{t('cookieConsent.essential.title')}</h4>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {t('cookieConsent.essential.description')}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faCheck} className="text-primary text-sm" />
                                    </div>
                                </div>

                                {/* Cookie analytics */}
                                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                    <div>
                                        <h4 className="text-white font-medium text-sm">{t('cookieConsent.analytics.title')}</h4>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {t('cookieConsent.analytics.description')}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={cookiePreferences.analytics}
                                            onChange={(e) => updatePreference('analytics', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                {/* Cookie marketing */}
                                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                    <div>
                                        <h4 className="text-white font-medium text-sm">{t('cookieConsent.marketing.title')}</h4>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {t('cookieConsent.marketing.description')}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={cookiePreferences.marketing}
                                            onChange={(e) => updatePreference('marketing', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Pulsanti */}
                            <div className="flex gap-3">
                                <button
                                    onClick={acceptSelected}
                                    className="flex-1 bg-gradient-to-r from-[#ff4123] to-[#ff0067] text-white py-2 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                                >
                                    {t('cookieConsent.savePreferences')}
                                </button>
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 transition-colors cursor-pointer"
                                >
                                    {t('cookieConsent.cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CookieConsent;
