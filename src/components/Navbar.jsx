import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import { useAppContext } from '../contexts/AppContext';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollToSection } = useAppContext();
    const { t } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                document.querySelector('.navbar').classList.add('scrolled');
            } else {
                document.querySelector('.navbar').classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId);
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar animate-fade-in-up">
            <div className="container">
                <div className="nav-content">
                    <div className="nav-logo">
                        <img src="extended-light.png" alt="Blinker Logo" width={120} />
                    </div>

                    <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <button type="button" className="bg-transparent border-0 text-inherit" onClick={() => handleNavClick('home')}>Home</button>
                        <button type="button" className="bg-transparent border-0 text-inherit" onClick={() => handleNavClick('features')}>{t('navbar.features')}</button>
                        <button type="button" className="bg-transparent border-0 text-inherit" onClick={() => handleNavClick('why')}>{t('navbar.why')}</button>
                        <button type="button" className="bg-transparent border-0 text-inherit" onClick={() => handleNavClick('organizers')}>{t('navbar.organizers')}</button>
                        <button
                            type="button"
                            className="bg-transparent border-0 text-inherit"
                            onClick={() => {
                                const isReleased = (import.meta.env.VITE_RELEASED ?? import.meta.env.RELEASED) === 'true';
                                handleNavClick(isReleased ? 'download' : 'beta');
                            }}
                        >
                            {t('navbar.download')}
                        </button>
                    </div>

                    <button
                        className="nav-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
