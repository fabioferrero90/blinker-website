import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function FAQSection() {
    const { t } = useTranslation();
    const items = t('faq.items', { returnObjects: true });

    if (!Array.isArray(items)) return null;

    return (
        <section id="faq" className="section faq pt-20 pb-20">
            <div className="container">
                <div className="animate-fade-in-up">
                    <h2 className="section-title">{t('faq.title')}</h2>
                    <p className="section-subtitle text-black">{t('faq.subtitle')}</p>
                </div>

                <div className="faq-list">
                    {items.map((item, idx) => (
                        <details key={idx} className="faq-item">
                            <summary className="faq-question">
                                <span>{item.q}</span>
                                <FontAwesomeIcon icon={faChevronDown} className="faq-icon" />
                            </summary>
                            <div className="faq-answer">
                                <p>{item.a}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
