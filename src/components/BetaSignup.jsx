import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faTimes, faUser, faRocket, faFlask } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { subscribeToPreregister } from '../services/senderService';

function BetaSignup() {
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
            setErrorMessage(t('beta.firstNameRequired'));
            setStatus('error');
            return;
        }

        if (!lastName.trim()) {
            setErrorMessage(t('beta.lastNameRequired'));
            setStatus('error');
            return;
        }

        if (!email.trim()) {
            setErrorMessage(t('beta.emailRequired'));
            setStatus('error');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage(t('beta.emailInvalid'));
            setStatus('error');
            return;
        }

        if (!consent) {
            setErrorMessage(t('beta.consentRequired'));
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            // Chiamata API a Sender.net per preregistrazione
            await subscribeToPreregister(firstName, lastName, email, i18n.language);

            setStatus('success');
            setFirstName('');
            setLastName('');
            setEmail('');
            setConsent(false);

            // Reset success message after 5 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 5000);

        } catch (error) {
            console.error('Beta signup error:', error);
            setStatus('error');
            setErrorMessage(error.message || t('beta.error'));
        }
    };

    const openPrivacyModal = (e) => {
        e.preventDefault();
        // Dispatch custom event to open privacy modal
        window.dispatchEvent(new CustomEvent('openPrivacyModal'));
    };

    return (
        <section
            id="beta"
            className="relative text-white py-16"
            style={{
                backgroundImage: `
                    linear-gradient(135deg, rgba(60, 24, 137, 0.9) 0%, rgba(107, 6, 195, 0.9) 100%),
                    url('/background-beta.avif')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <FontAwesomeIcon icon={faFlask} className="text-6xl text-yellow-300 animate-pulse" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {t('beta.title')}
                    </h2>
                    <p className="text-xl md:text-2xl mb-6 opacity-90">
                        {t('beta.subtitle')}
                    </p>
                    <div className="bg-black/20 rounded-2xl p-6 pb-10 mb-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
                            {t('beta.benefits.title')}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🎯</span>
                                <div>
                                    <h4 className="font-semibold">{t('beta.benefits.first.title')}</h4>
                                    <p className="text-sm opacity-80">{t('beta.benefits.first.description')}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🔥</span>
                                <div>
                                    <h4 className="font-semibold">{t('beta.benefits.second.title')}</h4>
                                    <p className="text-sm opacity-80">{t('beta.benefits.second.description')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nome e Cognome */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm"
                                />
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder={t('beta.firstNamePlaceholder')}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className="relative flex-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm"
                                />
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder={t('beta.lastNamePlaceholder')}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
                                    disabled={status === 'loading'}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-sm"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('beta.emailPlaceholder')}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
                                disabled={status === 'loading'}
                            />
                        </div>

                        {/* Pulsante Submit */}
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-3"
                        >
                            {status === 'loading' ? (
                                <>
                                    <FontAwesomeIcon icon={faRocket} className="animate-bounce" />
                                    {t('beta.loading')}
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faRocket} />
                                    {t('beta.button')}
                                </>
                            )}
                        </button>
                    </form>

                    {/* Checkbox Privacy */}
                    <div className="mt-6 flex items-start gap-3 justify-center">
                        <input
                            type="checkbox"
                            id="beta-consent"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-1"
                        />
                        <label htmlFor="beta-consent" className="text-sm opacity-90 leading-relaxed">
                            {t('beta.consentText')}{' '}
                            <button
                                type="button"
                                className="underline hover:no-underline font-semibold bg-transparent border-none p-0 text-inherit cursor-pointer"
                                onClick={openPrivacyModal}
                            >
                                {t('beta.privacyPolicy')}
                            </button>.
                        </label>
                    </div>

                    {/* Messaggi di stato */}
                    {status === 'success' && (
                        <div className="mt-6 flex items-center justify-center gap-3 text-green-300 bg-green-900/20 rounded-lg p-4">
                            <FontAwesomeIcon icon={faCheck} className="text-xl" />
                            <div className="text-center">
                                <p className="font-semibold">{t('beta.success.title')}</p>
                                <p className="text-sm opacity-80">{t('beta.success.description')}</p>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mt-6 flex items-center justify-center gap-3 text-red-300 bg-red-900/20 rounded-lg p-4">
                            <FontAwesomeIcon icon={faTimes} className="text-xl" />
                            <span className="text-sm">{errorMessage}</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default BetaSignup;
