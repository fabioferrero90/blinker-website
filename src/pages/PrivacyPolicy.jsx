import { useTranslation } from 'react-i18next';

function ListItems({ items }) {
    if (!Array.isArray(items)) return null;
    return (
        <ul className="list-disc pl-6 space-y-1.5">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    );
}

function ObjectListItems({ items }) {
    if (!Array.isArray(items)) return null;
    return (
        <ul className="list-disc pl-6 space-y-2">
            {items.map((item, i) => (
                <li key={i}>
                    <strong>{item.title}</strong>{' '}
                    <span>{item.description}</span>
                </li>
            ))}
        </ul>
    );
}

function PrivacyPolicy() {
    const { t } = useTranslation();
    const tArr = (k) => t(k, { returnObjects: true });

    return (
        <div className="space-y-6 text-gray-700 leading-relaxed">
            <header className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{t('privacyPolicy.title')}</h2>
                <p className="text-sm text-gray-600">{t('privacyPolicy.subtitle')}</p>
                <p className="text-xs text-gray-500">
                    <strong>{t('privacyPolicy.lastUpdatedUpper')}</strong> {t('privacyPolicy.lastUpdatedDate')}
                </p>
            </header>

            <section>
                <p>
                    <strong>{t('privacyPolicy.welcome')}</strong>
                    {t('privacyPolicy.welcomeDescription')}
                </p>
                <p className="mt-3">{t('privacyPolicy.privacyImportant')}</p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('privacyPolicy.section1.title')}</h3>

                <h4 className="font-semibold text-gray-900 mt-4 mb-2">{t('privacyPolicy.section1.registrationData.title')}</h4>
                <p className="mb-2">{t('privacyPolicy.section1.registrationData.description')}</p>
                <ListItems items={tArr('privacyPolicy.section1.registrationData.items')} />

                <h4 className="font-semibold text-gray-900 mt-4 mb-2">{t('privacyPolicy.section1.usageData.title')}</h4>
                <p className="mb-2">{t('privacyPolicy.section1.usageData.description')}</p>
                <ListItems items={tArr('privacyPolicy.section1.usageData.items')} />
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('privacyPolicy.section2.title')}</h3>
                <p className="mb-2">{t('privacyPolicy.section2.description')}</p>
                <ListItems items={tArr('privacyPolicy.section2.items')} />
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('privacyPolicy.section3.title')}</h3>
                <p className="mb-2">{t('privacyPolicy.section3.description')}</p>
                <ObjectListItems items={tArr('privacyPolicy.section3.items')} />
            </section>

            {[4, 5, 6, 7].map((n) => (
                <section key={n}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(`privacyPolicy.section${n}.title`)}</h3>
                    <p>{t(`privacyPolicy.section${n}.description`)}</p>
                </section>
            ))}

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('privacyPolicy.section8.title')}</h3>
                <p className="mb-2">{t('privacyPolicy.section8.description')}</p>
                <ListItems items={tArr('privacyPolicy.section8.rights')} />
                <p className="mt-3">{t('privacyPolicy.section8.contact')}</p>
            </section>

            {[9, 10].map((n) => (
                <section key={n}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(`privacyPolicy.section${n}.title`)}</h3>
                    <p>{t(`privacyPolicy.section${n}.description`)}</p>
                </section>
            ))}

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('privacyPolicy.section11.title')}</h3>
                <p className="mb-2">{t('privacyPolicy.section11.description')}</p>
                <div className="bg-gray-50 p-4 rounded-lg space-y-1 text-sm">
                    <p><strong>{t('privacyPolicy.section11.email')}:</strong> privacy@blinker-app.com</p>
                    <p><strong>{t('privacyPolicy.section11.website')}:</strong> https://get.blinker-app.com</p>
                </div>
            </section>

            <section className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-base font-semibold text-blue-900 mb-2">{t('privacyPolicy.summary.title')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-blue-900 text-sm">
                    {(tArr('privacyPolicy.summary.items') || []).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </section>

            <p className="text-xs text-gray-500 italic border-t pt-4">{t('privacyPolicy.lastUpdated')}</p>
        </div>
    );
}

export default PrivacyPolicy;
