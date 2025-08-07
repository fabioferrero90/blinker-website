import { Shield, Zap, Heart } from 'lucide-react';

function DownloadSection() {
    return (
        <section id="download" className="section download pt-40 pb-40">
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
    );
}

export default DownloadSection;
