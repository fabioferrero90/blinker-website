import { Download, ArrowDown, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function HeroSection() {
    const { scrollToSection } = useAppContext();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const textArray = [
        'Car Meet',
        'Raduno Monomarca',
        'Ritrovo Serale',
        'Track Day',
        'Driving Tour',
        'Midnight Touge',
        'Car Show'
    ];

    useEffect(() => {
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
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/hero-video-poster.png"
                >
                    <source src="/hero-background.mp4" type="video/mp4" />
                </video>
                <div className="hero-gradient"></div>
                <div className="hero-pattern"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text animate-fade-in-up">
                        <h1 className="font-bold text-4xl lg:w-[80%] lg:text-6xl mb-4 text-white">
                            Non perderti nessun{' '}
                            <p className="gradient-text typewriter-text">
                                {displayText}
                                <span className="cursor">|</span>
                            </p>
                        </h1>
                        <div className="hero-subtitle text-base lg:text-xl text-white">
                            <p>Scopri eventi, organizzane di nuovi, unisciti o gestisci la tua crew e mostra al mondo la tua collezione di auto, perché la vita è troppo corta per non sapere dove sono i car meet...</p>
                        </div>

                        <div className="hero-buttons">
                            <button
                                onClick={() => scrollToSection('download')}
                                className="btn btn-primary hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                <Download size={20} />
                                Scarica l'App
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="btn btn-outline hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                Scopri di Più
                                <ArrowDown size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="hero-image animate-fade-in-right">
                        <div className="phone-mockup">
                            <img
                                src="/home-mockup.png"
                                alt="Blinker App Mockup"
                                className="mockup-image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="scroll-indicator"
                onClick={() => scrollToSection('features')}
                aria-label="Scorri alla sezione successiva"
            >
                <ChevronDown size={24} />
            </button>
        </section>
    );
}

export default HeroSection;
