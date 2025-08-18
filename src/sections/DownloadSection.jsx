import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faBolt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

function DownloadSection() {
    const { t, i18n } = useTranslation();
    const { trackEvent } = useGoogleAnalytics();

    // Mappatura delle lingue ai codici dei badge
    const getLanguageCode = () => {
        const languageMap = {
            'it': 'IT',
            'en': 'EN',
            'es': 'ES',
            'fr': 'FR',
            'de': 'DE'
        };
        return languageMap[i18n.language] || 'IT';
    };

    const langCode = getLanguageCode();

    const handleDownloadClick = (store) => {
        trackEvent('download_click', 'engagement', store, 1);
    };

    return (
        <section id="download" className="section download">
            <div className="container">
                <h2 className="section-title">{t('download.title')}</h2>
                <p className="section-subtitle">
                    {t('download.subtitle')}
                </p>

                <div className="download-buttons">
                    <a
                        href="https://apps.apple.com/it/app/blinker-app/id6746400000"
                        className="download-btn"
                        onClick={() => handleDownloadClick('app_store')}
                    >
                        <img src={`/DownloadBadges/AppStore-${langCode}.svg`} alt={t('download.appStore')} />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.blinker.app"
                        className="download-btn"
                        onClick={() => handleDownloadClick('google_play')}
                    >
                        <img src={`/DownloadBadges/GooglePlay-${langCode}.avif`} alt={t('download.googlePlay')} />
                    </a>
                </div>

                <div className="download-features">
                    <div className="download-feature">
                        <FontAwesomeIcon icon={faShield} className="text-green-400" />
                        <span className="text-black">{t('download.secure')}</span>
                    </div>
                    <div className="download-feature">
                        <FontAwesomeIcon icon={faBolt} className="text-orange-300" />
                        <span className="text-black">{t('download.updates')}</span>
                    </div>
                    <div className="download-feature">
                        <FontAwesomeIcon icon={faHeart} className="text-red-400" />
                        <span className="text-black">{t('download.support')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DownloadSection;
