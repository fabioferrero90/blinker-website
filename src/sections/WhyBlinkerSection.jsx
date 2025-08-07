import { Heart, Smartphone, Star } from 'lucide-react';

function WhyBlinkerSection() {
    return (
        <section id="why" className="section why pt-40 pb-40">
            <div className="container">
                <div className="why-content">
                    <div className="why-text animate-fade-in-left">
                        <h2 className="section-title text-white">Perchè Blinker? 🤔</h2>
                        <p className="why-description text-white ps-3">
                            Blinker nasce dalla frustrazione di perdere sempre i car meet migliori! 😅
                            <p className="pt-3">Siamo un team di appassionati che ha detto "basta così" e ha creato l'app che tutti stavamo aspettando.
                                Perché siamo stanchi di sentire <span className='font-semibold'>"ah ma c'era un evento ieri?"</span></p>
                        </p>

                        <div className="why-features">
                            <div className="why-feature">
                                <Heart className="why-feature-icon" />
                                <div>
                                    <h4>Filtra gli eventi dalla mappa</h4>
                                    <p>Cerca solo il tipo di evento che ti interessa, e non perderti niente! (Niente più eventi di auto che non ti piacciono) 🎯</p>
                                </div>
                            </div>
                            <div className="why-feature">
                                <Smartphone className="why-feature-icon" />
                                <div>
                                    <h4>Design Moderno e Semplice</h4>
                                    <p>Interfaccia così intuitiva che anche tua nonna riuscirebbe a usarla (e se non ci riesce, il problema è suo) 😄</p>
                                </div>
                            </div>
                            <div className="why-feature">
                                <Star className="why-feature-icon" />
                                <div>
                                    <h4>Segui gli eventi che ti interessano</h4>
                                    <p>Riceverai tutti gli aggiornamenti in tempo reale (niente più scuse per non essere informato) 📱</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="why-image animate-fade-in-right">
                        <div className="why-mockup">
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
    );
}

export default WhyBlinkerSection;
