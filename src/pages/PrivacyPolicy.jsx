import { useTranslation } from 'react-i18next';

function PrivacyPolicy() {
    const { t, i18n } = useTranslation();

    // Debug logging
    console.log('PrivacyPolicy - Current language:', i18n.language);
    console.log('PrivacyPolicy - Available languages:', i18n.languages);
    console.log('PrivacyPolicy - GDPR compliance translation:', t('privacyPolicy.footer.gdprCompliance'));

    return (
        <div className="space-y-6 text-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('privacyPolicy.title')}</h2>
            </div>

            {/* Introduzione */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.introduction.title')}</h3>
                <p className="leading-relaxed mb-4">
                    {t('privacyPolicy.sections.introduction.content')}
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                        <strong>{t('privacyPolicy.lastUpdate')}:</strong> 8 Gennaio 2025
                    </p>
                </div>
            </section>

            {/* Titolare del Trattamento */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('privacyPolicy.sections.dataController.title')}
                </h3>
                <div className="space-y-4">
                    <p className="leading-relaxed">
                        {t('privacyPolicy.sections.dataController.content')}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold text-gray-900">{t('privacyPolicy.sections.dataController.company')}</p>
                        <p className="text-sm text-gray-700">{t('privacyPolicy.sections.dataController.email')}</p>
                    </div>
                </div>
            </section>

            {/* Dati Raccolti */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('privacyPolicy.sections.dataCollected.title')}
                </h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.dataCollected.content')}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 className="font-semibold text-blue-900 mb-2">
                                {t('privacyPolicy.sections.dataCollected.categories.identification.title')}
                            </h4>
                            <ul className="text-blue-800 text-sm space-y-1">
                                {t('privacyPolicy.sections.dataCollected.categories.identification.items', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>• {item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-semibold text-green-900 mb-2">
                                {t('privacyPolicy.sections.dataCollected.categories.usage.title')}
                            </h4>
                            <ul className="text-green-800 text-sm space-y-1">
                                {t('privacyPolicy.sections.dataCollected.categories.usage.items', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>• {item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <h4 className="font-semibold text-orange-900 mb-2">
                                {t('privacyPolicy.sections.dataCollected.categories.technical.title')}
                            </h4>
                            <ul className="text-orange-800 text-sm space-y-1">
                                {t('privacyPolicy.sections.dataCollected.categories.technical.items', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>• {item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                            <h4 className="font-semibold text-purple-900 mb-2">
                                {t('privacyPolicy.sections.dataCollected.categories.content.title')}
                            </h4>
                            <ul className="text-purple-800 text-sm space-y-1">
                                {t('privacyPolicy.sections.dataCollected.categories.content.items', { returnObjects: true }).map((item, index) => (
                                    <li key={index}>• {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Finalità del Trattamento */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.purposes.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.purposes.content')}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {t('privacyPolicy.sections.purposes.purposes', { returnObjects: true }).map((purpose, index) => {
                            const [title, description] = purpose.split(': ');
                            return (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                                    <p className="text-sm text-gray-700">{description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Base Giuridica */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.legalBasis.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.legalBasis.content')}
                    </p>
                    <div className="space-y-3">
                        {t('privacyPolicy.sections.legalBasis.bases', { returnObjects: true }).map((basis, index) => {
                            const [title, description] = basis.split(': ');
                            return (
                                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                    <div>
                                        <h4 className="font-semibold text-green-900">{title}</h4>
                                        <p className="text-green-800 text-sm">{description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Condivisione dei Dati */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.dataSharing.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.dataSharing.content')}
                    </p>
                    <div className="space-y-3">
                        {t('privacyPolicy.sections.dataSharing.parties', { returnObjects: true }).map((party, index) => {
                            const [title, description] = party.split(': ');
                            return (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                                    <p className="text-sm text-gray-700">{description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Conservazione dei Dati */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.retention.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.retention.content')}
                    </p>
                    <div className="space-y-3">
                        {t('privacyPolicy.sections.retention.purposes', { returnObjects: true }).map((purpose, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium">{purpose}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">{t('privacyPolicy.sections.retention.deletion')}</p>
                </div>
            </section>

            {/* I Tuoi Diritti */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.rights.title')}</h3>
                <p className="leading-relaxed mb-4">
                    {t('privacyPolicy.sections.rights.content')}
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {t('privacyPolicy.sections.rights.userRights', { returnObjects: true }).map((right, index) => {
                        const [title, description] = right.split(': ');
                        return (
                            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <div>
                                    <h4 className="font-semibold text-blue-900">{title}</h4>
                                    <p className="text-blue-800 text-sm">{description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Sicurezza */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.security.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.security.content')}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">{t('privacyPolicy.sections.security.technicalMeasures')}</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                                {t('privacyPolicy.sections.security.measures', { returnObjects: true }).map((measure, index) => (
                                    <li key={index}>• {measure}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cookie */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.cookies.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.cookies.content')}
                    </p>
                    <ul className="space-y-2 text-sm ml-4">
                        {t('privacyPolicy.sections.cookies.purposes', { returnObjects: true }).map((purpose, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{purpose}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-2">{t('privacyPolicy.sections.cookies.managementTitle')}</h4>
                        <p className="text-orange-800 text-sm">
                            {t('privacyPolicy.sections.cookies.management')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Trasferimenti Internazionali */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.internationalTransfers.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.internationalTransfers.content')}
                    </p>
                    <div className="space-y-3">
                        {t('privacyPolicy.sections.internationalTransfers.guarantees', { returnObjects: true }).map((guarantee, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-700">{guarantee}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Minori */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.minors.title')}</h3>
                <p className="leading-relaxed">
                    {t('privacyPolicy.sections.minors.content')}
                </p>
            </section>

            {/* Modifiche */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('privacyPolicy.sections.changes.title')}</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        {t('privacyPolicy.sections.changes.content')}
                    </p>
                    <ul className="space-y-2 text-sm ml-4">
                        {t('privacyPolicy.sections.changes.notifications', { returnObjects: true }).map((notification, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{notification}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-900 mb-2">{t('privacyPolicy.sections.changes.notificationTitle')}</h4>
                        <p className="text-yellow-800 text-sm">
                            {t('privacyPolicy.sections.changes.review')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contatti */}
            <section className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('privacyPolicy.sections.contact.title')}</h3>
                <p className="text-blue-800 text-sm mb-3">
                    {t('privacyPolicy.sections.contact.content')}
                </p>
                <div className="text-blue-800 text-sm">
                    {t('privacyPolicy.sections.contact.info', { returnObjects: true }).map((info, index) => {
                        const [title, value] = info.split(': ');
                        return (
                            <p key={index}><strong>{title}:</strong> {value}</p>
                        );
                    })}
                </div>
                <p className="text-blue-800 text-sm mt-3">
                    {t('privacyPolicy.sections.contact.complaint')}
                </p>
            </section>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>{t('privacyPolicy.footer.gdprCompliance')}</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
