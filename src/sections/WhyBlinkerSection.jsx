import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMobile, faStar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function WhyBlinkerSection() {
    const { t } = useTranslation();
    return (
        <section id="why" className="section why pt-20 pb-20">
            <div className="container">
                <div className="why-content">
                    <div className="why-text animate-fade-in-left">
                        <h2 className="section-title text-white">{t('whyBlinker.title')}</h2>
                        <div className="why-description text-white ps-3">
                            <p>{t('whyBlinker.subtitle')}</p>
                            <p className="pt-3">{t('whyBlinker.description')}</p>
                        </div>

                        <div className="why-features">
                            <div className="why-feature">
                                <FontAwesomeIcon icon={faHeart} className="why-feature-icon" />
                                <div>
                                    <h4>{t('whyBlinker.mapFilter.title')}</h4>
                                    <p>{t('whyBlinker.mapFilter.description')}</p>
                                </div>
                            </div>
                            <div className="why-feature">
                                <FontAwesomeIcon icon={faMobile} className="why-feature-icon" />
                                <div>
                                    <h4>{t('whyBlinker.modernApp.title')}</h4>
                                    <p>{t('whyBlinker.modernApp.description')}</p>
                                </div>
                            </div>
                            <div className="why-feature">
                                <FontAwesomeIcon icon={faStar} className="why-feature-icon" />
                                <div>
                                    <h4>{t('whyBlinker.followEvents.title')}</h4>
                                    <p>{t('whyBlinker.followEvents.description')}</p>
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
