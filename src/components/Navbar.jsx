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
                        <a onClick={() => handleNavClick('home')}>Home</a>
                        <a onClick={() => handleNavClick('features')}>{t('navbar.features')}</a>
                        <a onClick={() => handleNavClick('why')}>{t('navbar.why')}</a>
                        <a onClick={() => handleNavClick('organizers')}>{t('navbar.organizers')}</a>
                        <a onClick={() => handleNavClick('download')}>{t('navbar.download')}</a>
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
