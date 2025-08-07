import {
    Car,
    Users,
    Calendar,
    MapPin,
    Download,
    Star,
    ChevronDown,
    Smartphone,
    Zap,
    Shield,
    Instagram,
    X,
    Heart,
    ArrowDown,
    Megaphone,
    CheckCircle,
    Target,
    TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

function Homepage() {
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
        } else {
            // Deleting effect
            if (displayText.length > 0) {
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
        }
    }, [displayText, currentTextIndex, isDeleting, textArray]);
    return (
        <div className="app">
            {/* Hero Section */}
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
                                <a
                                    onClick={() => scrollToSection('download')}
                                    className="btn btn-primary hover:scale-105 transition-transform duration-200 cursor-pointer"
                                >
                                    <Download size={20} />
                                    Scarica l'App
                                </a>
                                <a
                                    onClick={() => scrollToSection('features')}
                                    className="btn btn-outline hover:scale-105 transition-transform duration-200 cursor-pointer"
                                >
                                    Scopri di Più
                                    <ArrowDown size={20} />
                                </a>
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

                <div className="scroll-indicator">
                    <ChevronDown size={24} />
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="section features pt-40 pb-40">
                <div className="container">
                    <div className="animate-fade-in-up">
                        <h2 className="section-title">Funzionalità Principali</h2>
                        <p className="section-subtitle text-black">
                            Tutte le funzionalità che ti faranno dire <span className='font-semibold'>"dove sei stato tutta la mia vita?"</span> 🤯
                        </p>
                    </div>

                    <div className="features-grid">
                        {[
                            {
                                icon: <Calendar className="feature-icon" />,
                                title: "Eventi Auto",
                                description: "Dal raduno del venerdì al Tokyo Auto Salon di turno, non ti perderai più nulla! Scopri eventi nella tua zona e partecipa senza dover stalkerare i gruppi Facebook che non vengono mai aggiornati.",
                                color: "var(--primary)"
                            },
                            {
                                icon: <Users className="feature-icon" />,
                                title: "Crew & Community",
                                description: "Unisciti a crew esistenti o creane una tua! Perfetto per chi vuole fare amicizia con altri appassionati (e magari trovare chi ti presta la GT-R per il weekend - sognare non costa nulla 😅).",
                                color: "var(--secondary)"
                            },
                            {
                                icon: <Car className="feature-icon" />,
                                title: "Garage Personale",
                                description: "Mostra al mondo la tua collezione! Gestisci le tue auto, aggiungi foto, specifiche e personalizzazioni. E la parte migliore? Candidati agli eventi in pochi tap! (Perfetto per flexare) 💪",
                                color: "var(--primary)"
                            },
                            {
                                icon: <MapPin className="feature-icon" />,
                                title: "Mappa Eventi",
                                description: "La mappa che ti salva dal girare a caso per la città! Trova eventi vicini, scopri nuovi posti, e non perderti mai più un car meet perché 'non sapevi dove fosse'",
                                color: "var(--secondary)"
                            },
                            {
                                icon: <Zap className="feature-icon" />,
                                title: "Notifiche Istantanee",
                                description: "Ricevi notifiche su nuovi eventi prima dei tuoi amici! Niente più 'ah ma c'era un evento ieri?' - sarai sempre il primo a sapere tutto!",
                                color: "var(--primary)"
                            },
                            {
                                icon: <Shield className="feature-icon" />,
                                title: "Scopri la Community",
                                description: "Esplora auto incredibili e stili di personalizzazione che ti faranno dire 'wow'! Perfetto per prendere ispirazione (e per fare un po' di envy sano - è normale, lo facciamo tutti) 👀",
                                color: "var(--secondary)"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card card hover:-translate-y-2 transition-transform duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="feature-icon-wrapper" style={{ backgroundColor: feature.color + '20' }}>
                                    <div style={{ color: feature.color }}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3>{feature.title}</h3>
                                <p className='text-black'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Organizers Section */}
            <section id="organizers" className="section organizers">
                <div className="container">
                    <div className="animate-fade-in-up">
                        <h2 className="section-title">Per gli Organizzatori 🎯</h2>
                        <p className="section-subtitle text-black">
                            Sei un organizzatore di eventi? Allora questa sezione è fatta apposta per te!
                            <span className='font-semibold'> Blinker non è solo per i partecipanti</span>, ma anche per chi crea la magia degli eventi! ✨
                        </p>
                    </div>

                    <div className="organizers-grid">
                        {[
                            {
                                icon: <TrendingUp className="organizer-icon" />,
                                title: "Maggiore Visibilità",
                                description: "I tuoi eventi raggiungeranno migliaia di appassionati! Niente più post sui social che si perdono nel feed, qui tutti vedranno il tuo evento (e finalmente smetteranno di dire 'non sapevo che ci fosse') 📈",
                                color: "var(--primary)"
                            },
                            {
                                icon: <Megaphone className="organizer-icon" />,
                                title: "Comunicazione Efficace",
                                description: "Pubblica news, aggiornamenti e modifiche in tempo reale! Tutti i partecipanti riceveranno notifiche istantanee (niente più gruppi WhatsApp che esplodono con 500 messaggi) 📢",
                                color: "var(--secondary)"
                            },
                            {
                                icon: <CheckCircle className="organizer-icon" />,
                                title: "Gestione Selezioni",
                                description: "Eventi a numero chiuso? Gestisci le richieste di partecipazione direttamente dall'app! Approva, rifiuta o tieni in lista d'attesa con pochi tap (e finalmente potrai dire 'no' senza sentirti in colpa) ✅",
                                color: "var(--primary)"
                            },
                            {
                                icon: <Target className="organizer-icon" />,
                                title: "Analytics Avanzati",
                                description: "Scopri quanti hanno visto il tuo evento, chi si è interessato e chi ha effettivamente partecipato! Dati che ti aiuteranno a migliorare sempre di più (e a flexare con i numeri) 📊",
                                color: "var(--secondary)"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="organizer-card card hover:-translate-y-2 transition-transform duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="organizer-icon-wrapper" style={{ backgroundColor: feature.color + '20' }}>
                                    <div style={{ color: feature.color }}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3>{feature.title}</h3>
                                <p className='text-black'>{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="organizers-cta animate-fade-in-up">
                        <h3 className="text-2xl font-bold mb-4 text-center">Pronto a rivoluzionare i tuoi eventi? 🚀</h3>
                        <p className="text-center mb-6 text-gray-600">
                            Unisciti agli organizzatori che hanno già scelto Blinker per i loro eventi!
                        </p>
                        <div className="flex justify-center">
                            <a
                                onClick={() => scrollToSection('download')}
                                className="btn btn-primary hover:scale-105 transition-transform duration-200 cursor-pointer"
                            >
                                <Download size={20} />
                                Inizia Ora
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section about">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text animate-fade-in-left">
                            <h2 className="section-title text-white">Perchè Blinker? 🤔</h2>
                            <p className="about-description text-white ps-3">
                                Blinker nasce dalla frustrazione di perdere sempre i car meet migliori! 😅
                                <p className="pt-3">Siamo un team di appassionati che ha detto "basta così" e ha creato l'app che tutti stavamo aspettando.
                                    Perché siamo stanchi di sentire <span className='font-semibold'>"ah ma c'era un evento ieri?"</span></p>
                            </p>

                            <div className="about-features">
                                <div className="about-feature">
                                    <Heart className="about-feature-icon" />
                                    <div>
                                        <h4>Filtra gli eventi dalla mappa</h4>
                                        <p>Cerca solo il tipo di evento che ti interessa, e non perderti niente! (Niente più eventi di auto che non ti piacciono) 🎯</p>
                                    </div>
                                </div>
                                <div className="about-feature">
                                    <Smartphone className="about-feature-icon" />
                                    <div>
                                        <h4>Design Moderno e Semplice</h4>
                                        <p>Interfaccia così intuitiva che anche tua nonna riuscirebbe a usarla (e se non ci riesce, il problema è suo) 😄</p>
                                    </div>
                                </div>
                                <div className="about-feature">
                                    <Star className="about-feature-icon" />
                                    <div>
                                        <h4>Segui gli eventi che ti interessano</h4>
                                        <p>Riceverai tutti gli aggiornamenti in tempo reale (niente più scuse per non essere informato) 📱</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="about-image animate-fade-in-right">
                            <div className="about-mockup">
                                <div className="app-screenshot">
                                    <img
                                        src="/map-screen.png"
                                        alt="Blinker App Screenshot"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Section */}
            <section id="download" className="section download">
                <div className="container">
                    <div className="download-content animate-fade-in-up">
                        <h2 className="section-title">Scarica Blinker</h2>
                        <p className="section-subtitle text-black">
                            Entra nella community più bella d'Europa! 🌍
                            <p>
                                Disponibile su iOS e Android
                            </p>
                        </p>

                        <div className="download-buttons">
                            <a
                                href="https://apps.apple.com/it/app/blinker-app/id67544444444444444444444444444444"
                                className="download-btn hover:scale-105 transition-transform duration-200"
                            >
                                <img src="/DownloadBadges/AppStore-IT.svg" alt="Download from App Store" />
                            </a>

                            <a
                                href="https://play.google.com/store/apps/details?id=com.blinker.app"
                                className="download-btn hover:scale-105 transition-transform duration-200"
                            >
                                <img src="/DownloadBadges/GooglePlay-IT.png" alt="Download from Google Play" />
                            </a>
                        </div>

                        <div className="download-features">
                            <div className="download-feature text-black">
                                <Shield size={20} />
                                <span>Sicuro e affidabile (promesso! 🤞)</span>
                            </div>
                            <div className="download-feature text-black">
                                <Zap size={20} />
                                <span>Aggiornamenti gratuiti (per sempre)</span>
                            </div>
                            <div className="download-feature text-black">
                                <Heart size={20} />
                                <span>Supporto 24/7 (quando non dormiamo)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <img src="extended-light.png" alt="Blinker Logo" width={150} />
                            </div>
                            <p className="footer-description text-center">
                                L'unica app che ti salva dalla FOMO automotive
                            </p>
                        </div>

                        <div className="footer-section">
                            <h4>Prodotto</h4>
                            <a href="#features">Funzionalità</a>
                            <a href="#download">Download</a>
                            <a href="#about">Chi Siamo</a>
                        </div>

                        <div className="footer-section">
                            <h4>Supporto</h4>
                            <a href="#">Centro Aiuto</a>
                            <a href="#">Contattaci</a>
                            <a href="#">Privacy Policy</a>
                        </div>

                        <div className="footer-section">
                            <h4>Community</h4>
                            <a href="#">Eventi</a>
                            <a href="#">Crew</a>
                            <a href="#">Forum</a>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p><span className='text-white font-semibold'>&copy; 2025 Blinker App </span>- Fatto per i car lovers, da gente che non può permettersi una GT-R (ancora).</p>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/blinker.social/" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://x.com/blinker.social" aria-label="X">
                                <X size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    );
}

export default Homepage;
