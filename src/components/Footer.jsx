import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram as faInstagramIcon, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
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

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-logo">
                                <img src="extended-light.webp" alt="Blinker Logo" width={150} />
                            </div>
                            <p className="footer-description text-center">
                                {t('footer.description')}
                            </p>
                        </div>
                        <div className="footer-section">
                            <h4>{t('footer.product')}</h4>
                            <a href="https://blinker-app.com" target="_blank" rel="noopener noreferrer">Blinker Web</a>
                            <a href="https://merch.blinker-app.com" target="_blank" rel="noopener noreferrer">{t('footer.merch')}</a>
                        </div>

                        <div className="footer-section">
                            <h4>{t('footer.support')}</h4>
                            {/* <a href="https://help.blinker-app.com" target="_blank" rel="noopener noreferrer">{t('footer.helpCenter')}</a> */}
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
                        <p><span className='text-white font-semibold text-sm'>&copy; 2026 Blinker App</span>- {t('footer.copyright')}</p>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/blinker.social/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagramIcon} size="sm" />
                            </a>
                            <a href="https://www.youtube.com/@BlinkerSocial" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faYoutube} size="sm" />
                            </a>
                            <a href="https://tiktok.com/@blinker.social" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTiktok} size="sm" />
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
