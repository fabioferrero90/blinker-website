import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import OptimizedVideo from '../components/OptimizedVideo';

function HeroSection() {
    const { scrollToSection } = useAppContext();
    const { t } = useTranslation();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Get typing texts from translations
    const textArray = t('hero.typingTexts', { returnObjects: true });

    useEffect(() => {
        // Safety check to ensure textArray is loaded
        if (!textArray || !Array.isArray(textArray) || textArray.length === 0) return;

        const currentText = textArray[currentTextIndex];

        if (!isDeleting) {
            // Typing effect
            if (displayText.length < currentText.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                }, 100);
                return () => clearTimeout(timeout);
            } else {
                // Wait before starting to delete
                const timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 1500);
                return () => clearTimeout(timeout);
            }
        } else if (displayText.length > 0) {
            // Deleting effect
            const timeout = setTimeout(() => {
                setDisplayText(displayText.slice(0, -1));
            }, 50);
            return () => clearTimeout(timeout);
        } else {
            // Move to next text
            setIsDeleting(false);
            setCurrentTextIndex((prevIndex) =>
                prevIndex === textArray.length - 1 ? 0 : prevIndex + 1
            );
        }
    }, [displayText, currentTextIndex, isDeleting, textArray]);

    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <OptimizedVideo
                    src="/hero-background.mp4"
                    poster="/hero-video-poster.avif"
                    className="hero-video"
                    priority={true}
                />
                <div className="hero-gradient"></div>
                <div className="hero-pattern"></div>
            </div>

            <div className="container">
                <div className="hero-content pt-4">
                    <div className="hero-text animate-fade-in-up">
                        <h1 className="font-bold text-4xl lg:w-[80%] lg:text-6xl mb-3 text-white">
                            {t('hero.title')}
                            <br />
                            <span className="gradient-text">{displayText}</span>
                            <span className="typing-cursor-visible">|</span>
                        </h1>
                        <div className="hero-subtitle text-xs lg:text-xl text-white">
                            <p>{t('hero.subtitle')}</p>
                        </div>

                        <div className="hero-buttons">
                            <button
                                onClick={() => {
                                    scrollToSection('download');
                                }}
                                className="btn btn-primary hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                {t('hero.downloadButton')}
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="btn btn-outline hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                {t('hero.scrollIndicator')}
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>
                    </div>

                    <div className="phone-mockup animate-fade-in-right">
                        <img
                            src="/home-mockup.webp"
                            alt="Blinker App Mockup"
                            className="mockup-image"
                        />
                    </div>
                </div>
            </div>

            <button
                className="scroll-indicator"
                onClick={() => scrollToSection('features')}
                aria-label="Scorri alla sezione successiva"
            >
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
        </section>
    );
}

export default HeroSection;
