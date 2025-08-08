import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function LanguageSelector() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Gestisce il click fuori dal dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'it', name: t('languageSelector.italian'), flagCode: 'it' },
        { code: 'en', name: t('languageSelector.english'), flagCode: 'gb' },
        { code: 'es', name: t('languageSelector.spanish'), flagCode: 'es' },
        { code: 'fr', name: t('languageSelector.french'), flagCode: 'fr' },
        { code: 'de', name: t('languageSelector.german'), flagCode: 'de' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const changeLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
        setIsOpen(false);

        // Salva la preferenza nel localStorage
        localStorage.setItem('blinker-language', languageCode);
    };

    return (
        <div className="fixed bottom-4 left-4 z-40" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-background-dark rounded-full shadow-lg flex items-center justify-center text-white hover:bg-white transition-colors border-2 border-white cursor-pointer"
                aria-label={t('languageSelector.title')}
            >
                <span className={`fi fi-${currentLanguage.flagCode} text-sm leading-none`}></span>
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 mb-2 bg-black border rounded-xl shadow-lg min-w-[160px] z-[20]">
                    <div className="py-2">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => changeLanguage(language.code)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white hover:text-black transition-colors cursor-pointer ${i18n.language === language.code
                                    ? 'bg-primary text-white'
                                    : 'text-gray-300'
                                    }`}
                            >
                                <span className={`fi fi-${language.flagCode} text-sm leading-none min-w-[16px] text-center`}></span>
                                <span className="font-medium">{language.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LanguageSelector;
