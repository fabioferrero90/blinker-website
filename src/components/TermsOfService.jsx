import { useTranslation } from 'react-i18next';

function TermsOfService() {
    const { t, i18n } = useTranslation();

    // Debug logging
    console.log('TermsOfService - Current language:', i18n.language);
    console.log('TermsOfService - Available languages:', i18n.languages);
    console.log('TermsOfService - Legal compliance translation:', t('termsOfService.footer.legalCompliance'));

    return (
        <div className="space-y-6 text-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('termsOfService.title')}</h2>
            </div>

            {/* Accettazione dei Termini */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.acceptance.title')}</h3>
                <p className="leading-relaxed">
                    {t('termsOfService.sections.acceptance.content')}
                </p>
            </section>

            {/* Descrizione del Servizio */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.serviceDescription.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.serviceDescription.content')}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {t('termsOfService.sections.serviceDescription.services', { returnObjects: true }).map((service, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <p className="text-blue-800 text-sm">{service}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registrazione e Account */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('termsOfService.sections.registration.title')}</h3>

                <div className="space-y-4">
                    {/* Creazione Account */}
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-900 mb-2">
                            {t('termsOfService.sections.registration.accountCreation.title')}
                        </h4>
                        <p className="text-green-800 text-sm">
                            {t('termsOfService.sections.registration.accountCreation.content')}
                        </p>
                    </div>

                    {/* Informazioni Accurate */}
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-blue-900 mb-2">
                            {t('termsOfService.sections.registration.accurateInfo.title')}
                        </h4>
                        <p className="text-blue-800 text-sm">
                            {t('termsOfService.sections.registration.accurateInfo.content')}
                        </p>
                    </div>

                    {/* Responsabilità Account */}
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-orange-900 mb-2">
                            {t('termsOfService.sections.registration.accountResponsibility.title')}
                        </h4>
                        <p className="text-orange-800 text-sm">
                            {t('termsOfService.sections.registration.accountResponsibility.content')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Utilizzo Accettabile */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.acceptableUse.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.acceptableUse.content')}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {t('termsOfService.sections.acceptableUse.prohibited', { returnObjects: true }).map((item, index) => (
                            <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                <p className="text-red-800 text-sm">• {item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contenuti Utente */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.userContent.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.userContent.content')}
                    </p>
                    <div className="space-y-3">
                        {t('termsOfService.sections.userContent.rights', { returnObjects: true }).map((right, index) => {
                            const [title, description] = right.split(': ');
                            return (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                                    <p className="text-sm text-gray-700">{description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Privacy */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.privacy.title')}</h3>
                <p className="leading-relaxed">
                    {t('termsOfService.sections.privacy.content')}
                </p>
            </section>

            {/* Proprietà Intellettuale */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.intellectualProperty.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.intellectualProperty.content')}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {t('termsOfService.sections.intellectualProperty.prohibited', { returnObjects: true }).map((item, index) => (
                            <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                <p className="text-red-800 text-sm">• {item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Limitazione di Responsabilità */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.liability.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.liability.content')}
                    </p>
                    <div className="space-y-3">
                        {t('termsOfService.sections.liability.exclusions', { returnObjects: true }).map((exclusion, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700">• {exclusion}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                            {t('termsOfService.sections.liability.limit')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Indennizzo */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.indemnification.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.indemnification.content')}
                    </p>
                    <div className="space-y-3">
                        {t('termsOfService.sections.indemnification.claims', { returnObjects: true }).map((claim, index) => (
                            <div key={index} className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                <p className="text-orange-800 text-sm">• {claim}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sospensione e Terminazione */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.termination.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.termination.content')}
                    </p>
                    <div className="space-y-3">
                        {t('termsOfService.sections.termination.reasons', { returnObjects: true }).map((reason, index) => (
                            <div key={index} className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                <p className="text-red-800 text-sm">• {reason}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                            {t('termsOfService.sections.termination.effect')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Modifiche ai Termini */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.modifications.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('termsOfService.sections.modifications.content')}
                    </p>
                    <ul className="space-y-2 text-sm ml-4">
                        {t('termsOfService.sections.modifications.notifications', { returnObjects: true }).map((notification, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{notification}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 text-sm">
                            {t('termsOfService.sections.modifications.acceptance')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Legge Applicabile */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.governingLaw.title')}</h3>
                <p className="leading-relaxed">
                    {t('termsOfService.sections.governingLaw.content')}
                </p>
            </section>

            {/* Disposizioni Generali */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('termsOfService.sections.general.title')}</h3>
                <div className="space-y-3">
                    {t('termsOfService.sections.general.provisions', { returnObjects: true }).map((provision, index) => {
                        const [title, description] = provision.split(': ');
                        return (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                                <p className="text-sm text-gray-700">{description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Contatti */}
            <section className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('termsOfService.sections.contact.title')}</h3>
                <p className="text-blue-800 text-sm mb-3">
                    {t('termsOfService.sections.contact.content')}
                </p>
                <div className="text-blue-800 text-sm">
                    {t('termsOfService.sections.contact.info', { returnObjects: true }).map((info, index) => {
                        const [title, value] = info.split(': ');
                        return (
                            <p key={index}><strong>{title}:</strong> {value}</p>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>{t('termsOfService.footer.legalCompliance')}</p>
            </div>
        </div>
    );
}

export default TermsOfService;
