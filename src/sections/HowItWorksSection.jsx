import { useTranslation } from 'react-i18next';

function HowItWorksSection() {
    const { t } = useTranslation();
    const stepKeys = ['download', 'explore', 'join'];

    return (
        <section id="how-it-works" className="section how-it-works pt-20 pb-20">
            <div className="container">
                <div className="animate-fade-in-up">
                    <h2 className="section-title">{t('howItWorks.title')}</h2>
                    <p className="section-subtitle text-black">{t('howItWorks.subtitle')}</p>
                </div>

                <ol className="how-it-works-grid">
                    {stepKeys.map((key, idx) => (
                        <li key={key} className="how-step card" style={{ animationDelay: `${idx * 100}ms` }}>
                            <span className="how-step-number">{t(`howItWorks.steps.${key}.number`)}</span>
                            <h3 className="how-step-title">{t(`howItWorks.steps.${key}.title`)}</h3>
                            <p className="how-step-description text-black">{t(`howItWorks.steps.${key}.description`)}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default HowItWorksSection;
