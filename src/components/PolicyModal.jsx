import { useState, useEffect } from 'react';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CookiePolicy from './CookiePolicy';
import TermsOfService from './TermsOfService';

function PolicyModal({ type, isOpen, onClose }) {
    const [currentType, setCurrentType] = useState(type);

    // Blocca lo scroll del body quando la modal è aperta
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup quando il componente viene smontato
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    const renderModal = () => {
        switch (currentType) {
            case 'privacy':
                return <PrivacyPolicy />;
            case 'cookie':
                return <CookiePolicy isOpen={isOpen} onClose={handleClose} />;
            case 'terms':
                return <TermsOfService isOpen={isOpen} onClose={handleClose} />;
            default:
                return null;
        }
    };

    // Wrapper coerente per tutte le modal
    if (isOpen) {
        return (
            <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
                    {/* Pulsante di chiusura sticky */}
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 absolute top-4 right-4 z-10 text-white p-2 hover:bg-gray-800 rounded-full transition-colors bg-black shadow-lg cursor-pointer"
                        aria-label="Chiudi modal"
                    >
                        ✕
                    </button>

                    <div className="p-6 pt-16 overflow-y-auto max-h-[90vh]">
                        {renderModal()}
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default PolicyModal;
