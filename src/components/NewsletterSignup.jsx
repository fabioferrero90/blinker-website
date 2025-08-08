import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { subscribeToNewsletter } from '../services/senderService';

function NewsletterSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const { t, i18n } = useTranslation();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName.trim()) {
            setErrorMessage(t('newsletter.firstNameRequired'));
            setStatus('error');
            return;
        }

        if (!lastName.trim()) {
            setErrorMessage(t('newsletter.lastNameRequired'));
            setStatus('error');
            return;
        }

        if (!email.trim()) {
            setErrorMessage(t('newsletter.emailRequired'));
            setStatus('error');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage(t('newsletter.emailInvalid'));
            setStatus('error');
            return;
        }

        if (!consent) {
            setErrorMessage(t('newsletter.consentRequired'));
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            // Chiamata API a Sender.net
            await subscribeToNewsletter(firstName, lastName, email, i18n.language);

            // Log per GDPR compliance
            console.log('Newsletter signup:', {
                firstName,
                lastName,
                email,
                language: i18n.language,
                consent: true,
                timestamp: new Date().toISOString(),
                source: 'footer-newsletter'
            });

            setStatus('success');
            setFirstName('');
            setLastName('');
            setEmail('');
            setConsent(false);

            // Reset success message after 3 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 3000);

        } catch (error) {
            console.error('Newsletter signup error:', error);
            setStatus('error');
            setErrorMessage(error.message || t('newsletter.error'));
        }
    };

    const openPrivacyModal = (e) => {
        e.preventDefault();
        // Dispatch custom event to open privacy modal
        window.dispatchEvent(new CustomEvent('openPrivacyModal'));
    };

    return (
        <div className="bg-gradient-to-r from-[#ff4011] to-[#ff0067] text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 lg:gap-50">
                    {/* Testo */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-semibold mb-1">{t('newsletter.title')}</h3>
                        <p className="text-sm opacity-90">{t('newsletter.subtitle')}</p>
                    </div>

                    {/* Form */}
                    <div className="w-full md:w-auto">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {/* Nome e Cognome */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1 bg-white rounded-lg">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder={t('newsletter.firstNamePlaceholder')}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div className="relative flex-1 bg-white rounded-lg">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder={t('newsletter.lastNamePlaceholder')}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="relative bg-white rounded-lg">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('newsletter.placeholder')}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                                    disabled={status === 'loading'}
                                />
                            </div>

                            {/* Pulsante Submit */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-12 py-2 bg-gradient-to-r from-[#3c1889] to-[#6b06c3] text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                            >
                                {status === 'loading' ? t('newsletter.loading') : t('newsletter.button')}
                            </button>
                        </form>

                        {/* Checkbox Privacy - ora sotto al form */}
                        <div className="mt-3 flex items-start gap-2 justify-center md:justify-start w-140">
                            <input
                                type="checkbox"
                                id="newsletter-consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-1"
                            />
                            <label htmlFor="newsletter-consent" className="text-xs opacity-90 leading-relaxed">
                                {t('newsletter.consentText')}{' '}
                                <button
                                    type="button"
                                    className="underline hover:no-underline font-semibold bg-transparent border-none p-0 text-inherit cursor-pointer"
                                    onClick={openPrivacyModal}
                                >
                                    {t('newsletter.privacyPolicy')}
                                </button>.
                            </label>
                        </div>

                        {/* Messaggi di stato */}
                        {status === 'success' && (
                            <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-green-200">
                                <FontAwesomeIcon icon={faCheck} />
                                <span className="text-sm">{t('newsletter.success')}</span>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-red-200">
                                <FontAwesomeIcon icon={faTimes} />
                                <span className="text-sm">{errorMessage}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsletterSignup;
