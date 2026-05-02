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

function TermsOfService() {
    const { t } = useTranslation();
    const tArr = (k) => t(k, { returnObjects: true });

    return (
        <div className="space-y-6 text-gray-700 leading-relaxed">
            <header className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{t('termsOfService.title')}</h2>
                <p className="text-sm text-gray-600">{t('termsOfService.subtitle')}</p>
                <p className="text-xs text-gray-500">{t('termsOfService.lastUpdated')}</p>
            </header>

            <section>
                <p>{t('termsOfService.welcome')}</p>
                <p className="mt-3 italic">{t('termsOfService.readCarefully')}</p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('termsOfService.section1.title')}</h3>
                <p className="mb-2">{t('termsOfService.section1.description')}</p>
                <p>{t('termsOfService.section1.additionalInfo')}</p>
            </section>

            {['section1bis', 'section1ter', 'section2', 'section3', 'section4'].map((id) => (
                <section key={id}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(`termsOfService.${id}.title`)}</h3>
                    <p className="mb-2">{t(`termsOfService.${id}.description`)}</p>
                    <ListItems items={tArr(`termsOfService.${id}.items`)} />
                </section>
            ))}

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('termsOfService.section4bis.title')}</h3>
                <p className="mb-2">{t('termsOfService.section4bis.description')}</p>
                <p className="mb-2">{t('termsOfService.section4bis.securityInfo')}</p>
                <ListItems items={tArr('termsOfService.section4bis.items')} />
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('termsOfService.section5.title')}</h3>
                <p className="mb-2">{t('termsOfService.section5.description')}</p>
                <ListItems items={tArr('termsOfService.section5.items')} />
            </section>

            {['section6', 'section7'].map((id) => (
                <section key={id}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(`termsOfService.${id}.title`)}</h3>
                    <p>{t(`termsOfService.${id}.description`)}</p>
                </section>
            ))}

            {['section8', 'section9'].map((id) => (
                <section key={id}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(`termsOfService.${id}.title`)}</h3>
                    <p className="mb-2">{t(`termsOfService.${id}.description`)}</p>
                    <ListItems items={tArr(`termsOfService.${id}.items`)} />
                </section>
            ))}

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('termsOfService.section10.title')}</h3>
                <ListItems items={tArr('termsOfService.section10.items')} />
            </section>

            {['section11', 'section12', 'section13'].map((id) => (
                <section key={id}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(`termsOfService.${id}.title`)}</h3>
                    <p>{t(`termsOfService.${id}.description`)}</p>
                </section>
            ))}

            <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('termsOfService.section14.title')}</h3>
                <p className="mb-2">{t('termsOfService.section14.description')}</p>
                <div className="bg-gray-50 p-4 rounded-lg space-y-1 text-sm">
                    <p>{t('termsOfService.section14.email')}</p>
                    <p>{t('termsOfService.section14.website')}</p>
                </div>
            </section>

            <section className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-base font-semibold text-blue-900 mb-2">{t('termsOfService.summary.title')}</h3>
                <ul className="list-disc pl-6 space-y-1 text-blue-900 text-sm">
                    {(tArr('termsOfService.summary.items') || []).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default TermsOfService;
