import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram as faInstagramIcon, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import PolicyModal from './PolicyModal';

function Footer() {
    const [modalType, setModalType] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                                <img src="extended-light.png" alt="Blinker Logo" width={150} />
                            </div>
                            <p className="footer-description text-center">
                                L'unica app che ti salva dalla FOMO automotive
                            </p>
                        </div>
                        <div className="footer-section">
                            <h4>Link utili</h4>
                            <a href="https://dashboard.blinker-app.com">Dashboard</a>
                        </div>

                        <div className="footer-section">
                            <h4>Supporto</h4>
                            <a href="https://help.blinker-app.com">Centro Aiuto</a>
                            <a href="mailto:support@blinker-app.com">Contattaci</a>
                        </div>
                        <div className="footer-section">
                            <h4>Legal</h4>
                            <button onClick={() => openModal('privacy')} className="footer-link">
                                Privacy Policy
                            </button>
                            <button onClick={() => openModal('cookie')} className="footer-link">
                                Cookie Policy
                            </button>
                            <button onClick={() => openModal('terms')} className="footer-link">
                                Termini di Servizio
                            </button>
                        </div>
                    </div>

                    <div className="footer-bottom text-sm">
                        <p><span className='text-white font-semibold text-sm'>&copy; 2025 Blinker App </span>- Fatto per i car lovers, da gente che non può permettersi una GT-R (ancora).</p>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/blinker.social/" aria-label="Instagram">
                                <FontAwesomeIcon icon={faInstagramIcon} size="sm" />
                            </a>
                            <a href="https://x.com/blinker.social" aria-label="X">
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
