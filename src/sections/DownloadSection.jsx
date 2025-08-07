import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faBolt, faHeart } from '@fortawesome/free-solid-svg-icons';

function DownloadSection() {
    return (
        <section id="download" className="section download">
            <div className="container">
                <h2 className="section-title">Scarica Blinker</h2>
                <p className="section-subtitle">
                    Unisciti alla community dei car lovers e non perderti più nessun evento
                </p>

                <div className="download-buttons">
                    <a href="https://apps.apple.com/it/app/blinker-app/id6746400000" className="download-btn">
                        <img src="/DownloadBadges/AppStore-IT.svg" alt="Scarica su App Store" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.blinker.app" className="download-btn">
                        <img src="/DownloadBadges/GooglePlay-IT.png" alt="Scarica su Google Play" />
                    </a>
                </div>

                <div className="download-features">
                    <div className="download-feature">
                        <FontAwesomeIcon icon={faShield} className="text-green-400" />
                        <span className="text-black">100% Sicuro (promesso! ✌🏻)</span>
                    </div>
                    <div className="download-feature">
                        <FontAwesomeIcon icon={faBolt} className="text-orange-300" />
                        <span className="text-black">Aggiornamenti gratuiti (per sempre)</span>
                    </div>
                    <div className="download-feature">
                        <FontAwesomeIcon icon={faHeart} className="text-red-400" />
                        <span className="text-black">Supporto 24/7 (quando non dormiamo)</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DownloadSection;
