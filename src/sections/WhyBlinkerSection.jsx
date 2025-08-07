import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMobile, faStar } from '@fortawesome/free-solid-svg-icons';

function WhyBlinkerSection() {
    return (
        <section id="why" className="section why pt-40 pb-40">
            <div className="container">
                <div className="why-content">
                    <div className="why-text animate-fade-in-left">
                        <h2 className="section-title text-white">Perchè Blinker? 🤔</h2>
                        <div className="why-description text-white ps-3">
                            <p>Blinker nasce dalla frustrazione di perdere sempre i car meet migliori! 😅</p>
                            <p className="pt-3">Siamo un team di appassionati che ha detto "basta così" e ha creato l'app che tutti stavamo aspettando.
                                Perché siamo stanchi di sentire <span className='font-semibold'>"ah ma c'era un evento ieri?"</span></p>
                        </div>

                        <div className="why-features">
                            <div className="why-feature">
                                <FontAwesomeIcon icon={faHeart} className="why-feature-icon" />
                                <div>
                                    <h4>Filtra gli eventi dalla mappa</h4>
                                    <p>Cerca solo il tipo di evento che ti interessa, e non perderti niente! 🎯</p>
                                </div>
                            </div>
                            <div className="why-feature">
                                <FontAwesomeIcon icon={faMobile} className="why-feature-icon" />
                                <div>
                                    <h4>App Moderna e Semplice</h4>
                                    <p>Interfaccia così intuitiva che anche tua nonna riuscirebbe a usarla!</p>
                                </div>
                            </div>
                            <div className="why-feature">
                                <FontAwesomeIcon icon={faStar} className="why-feature-icon" />
                                <div>
                                    <h4>Segui gli eventi che ti interessano</h4>
                                    <p>Riceverai tutti gli aggiornamenti dagli organizzatori in tempo reale 📱</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="why-mockup animate-fade-in-right">
                        <div className="app-screenshot">
                            <img src="/map-screen.png" alt="Blinker App Screenshot" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyBlinkerSection;
