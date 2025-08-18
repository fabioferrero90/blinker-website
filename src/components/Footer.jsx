import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram as faInstagramIcon, faXTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';
import PolicyModal from './PolicyModal';
import { useTranslation } from 'react-i18next';

function Footer() {
    const [modalType, setModalType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation();

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    // Listen for privacy modal events from newsletter
    useEffect(() => {
        const handlePrivacyModal = () => {
            openModal('privacy');
        };

        window.addEventListener('openPrivacyModal', handlePrivacyModal);

        return () => {
            window.removeEventListener('openPrivacyModal', handlePrivacyModal);
        };
    }, []);

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <img src="mockup-image.webp" alt="Blinker Logo" width={150} />
                            </div>
                            <p className="footer-description text-center">
                                {t('footer.description')}
                            </p>
                        </div>
                        <div className="footer-section">
                            <h4>{t('footer.product')}</h4>
                            <a href="https://dashboard.blinker-app.com" target="_blank" rel="noopener noreferrer">Dashboard</a>
                        </div>

                        <div className="footer-section">
                            <h4>{t('footer.support')}</h4>
                            <a href="https://help.blinker-app.com" target="_blank" rel="noopener noreferrer">{t('footer.helpCenter')}</a>
                            <a href="mailto:support@blinker-app.com">{t('footer.contact')}</a>
                        </div>
                        <div className="footer-section">
                            <h4>{t('footer.legal')}</h4>
                            <button onClick={() => openModal('privacy')} className="footer-link">
                                {t('footer.privacyPolicy')}
                            </button>
                            <button onClick={() => openModal('cookie')} className="footer-link">
                                {t('footer.cookiePolicy')}
                            </button>
                            <button onClick={() => openModal('terms')} className="footer-link">
                                {t('footer.termsOfService')}
                            </button>
                        </div>
                    </div>

                    <div className="footer-bottom text-sm">
                        <p><span className='text-white font-semibold text-sm'>&copy; 2025 Blinker App </span>- {t('footer.copyright')}</p>
                        <div className="footer-social">
                            <a href="https://discord.gg/6uD7KrEWEk" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faDiscord} size="sm" />
                            </a>
                            <a href="https://www.instagram.com/blinker.social/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagramIcon} size="sm" />
                            </a>
                            <a href="https://x.com/blinker_social" aria-label="X" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faXTwitter} size="sm" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Modal per le Policy */}
            {isModalOpen && (
                <PolicyModal
                    type={modalType}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </>
    );
}

export default Footer;
