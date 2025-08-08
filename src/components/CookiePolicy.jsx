import { useTranslation } from 'react-i18next';

function CookiePolicy() {
    const { t } = useTranslation();

    return (
        <div className="space-y-6 text-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('cookiePolicy.title')}</h2>
            </div>

            {/* Cosa sono i Cookie */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.whatAreCookies.title')}</h3>
                <p className="leading-relaxed">
                    {t('cookiePolicy.sections.whatAreCookies.content')}
                </p>
            </section>

            {/* Tipi di Cookie */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('cookiePolicy.sections.types.title')}</h3>

                <div className="space-y-6">
                    {/* Cookie Essenziali */}
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-900 mb-2">{t('cookiePolicy.sections.types.essential.title')}</h4>
                        <p className="text-green-800 text-sm mb-3">{t('cookiePolicy.sections.types.essential.description')}</p>
                        <ul className="text-green-800 text-sm space-y-1">
                            {t('cookiePolicy.sections.types.essential.items', { returnObjects: true }).map((item, index) => (
                                <li key={index}>• {item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Cookie Analytics */}
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-blue-900 mb-2">{t('cookiePolicy.sections.types.analytics.title')}</h4>
                        <p className="text-blue-800 text-sm mb-3">{t('cookiePolicy.sections.types.analytics.description')}</p>
                        <ul className="text-blue-800 text-sm space-y-1">
                            {t('cookiePolicy.sections.types.analytics.items', { returnObjects: true }).map((item, index) => (
                                <li key={index}>• {item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Cookie Marketing */}
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-semibold text-orange-900 mb-2">{t('cookiePolicy.sections.types.marketing.title')}</h4>
                        <p className="text-orange-800 text-sm mb-3">{t('cookiePolicy.sections.types.marketing.description')}</p>
                        <ul className="text-orange-800 text-sm space-y-1">
                            {t('cookiePolicy.sections.types.marketing.items', { returnObjects: true }).map((item, index) => (
                                <li key={index}>• {item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Gestione Cookie */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('cookiePolicy.sections.management.title')}</h3>
                <p className="leading-relaxed mb-4">{t('cookiePolicy.sections.management.content')}</p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Chrome */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.management.browsers.chrome.title')}</h4>
                        <ol className="text-sm text-gray-700 space-y-2">
                            {t('cookiePolicy.sections.management.browsers.chrome.steps', { returnObjects: true }).map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{index + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Firefox */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.management.browsers.firefox.title')}</h4>
                        <ol className="text-sm text-gray-700 space-y-2">
                            {t('cookiePolicy.sections.management.browsers.firefox.steps', { returnObjects: true }).map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{index + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Safari */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.management.browsers.safari.title')}</h4>
                        <ol className="text-sm text-gray-700 space-y-2">
                            {t('cookiePolicy.sections.management.browsers.safari.steps', { returnObjects: true }).map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{index + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Edge */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.management.browsers.edge.title')}</h4>
                        <ol className="text-sm text-gray-700 space-y-2">
                            {t('cookiePolicy.sections.management.browsers.edge.steps', { returnObjects: true }).map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="bg-blue-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{index + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Durata dei Cookie */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.duration.title')}</h3>
                <p className="leading-relaxed mb-4">{t('cookiePolicy.sections.duration.content')}</p>
                <div className="space-y-3">
                    {t('cookiePolicy.sections.duration.types', { returnObjects: true }).map((type, index) => {
                        const [title, description] = type.split(': ');
                        return (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                                <p className="text-sm text-gray-700">{description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Cookie di Terze Parti */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.thirdParty.title')}</h3>
                <p className="leading-relaxed mb-4">{t('cookiePolicy.sections.thirdParty.content')}</p>
                <div className="space-y-3">
                    {t('cookiePolicy.sections.thirdParty.services', { returnObjects: true }).map((service, index) => {
                        const [title, description] = service.split(': ');
                        return (
                            <div key={index} className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                <h4 className="font-semibold text-yellow-900 mb-1">{title}</h4>
                                <p className="text-sm text-yellow-800">{description}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-4 bg-orange-50 p-4 rounded-lg">
                    <p className="text-orange-800 text-sm">{t('cookiePolicy.sections.thirdParty.note')}</p>
                </div>
            </section>

            {/* Aggiornamenti */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('cookiePolicy.sections.updates.title')}</h3>
                <p className="leading-relaxed">
                    {t('cookiePolicy.sections.updates.content')}
                </p>
            </section>

            {/* Contatti */}
            <section className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('cookiePolicy.sections.contact.title')}</h3>
                <p className="text-blue-800 text-sm mb-3">{t('cookiePolicy.sections.contact.content')}</p>
                <div className="text-blue-800 text-sm">
                    {t('cookiePolicy.sections.contact.info', { returnObjects: true }).map((info, index) => {
                        const [title, value] = info.split(': ');
                        return (
                            <p key={index}><strong>{title}:</strong> {value}</p>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>{t('cookiePolicy.footer.ePrivacyCompliance')}</p>
            </div>
        </div>
    );
}

export default CookiePolicy;
