import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollToSection } = useAppContext();

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
                        <a onClick={() => handleNavClick('features')}>Funzionalità</a>
                        <a onClick={() => handleNavClick('organizers')}>Organizzatori</a>
                        <a onClick={() => handleNavClick('about')}>Perchè Blinker?</a>
                        <a onClick={() => handleNavClick('download')}>Scarica</a>
                    </div>

                    <button
                        className="nav-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
