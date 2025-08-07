import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBullhorn, faCheckCircle, faBullseye, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../contexts/AppContext';

function OrganizersSection() {
    const { scrollToSection } = useAppContext();
    const { t } = useTranslation();

    const organizerFeatures = [
        {
            icon: <FontAwesomeIcon icon={faChartLine} className="organizer-icon" />,
            title: t('organizers.management.title'),
            description: t('organizers.management.description'),
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faBullhorn} className="organizer-icon" />,
            title: t('organizers.communication.title'),
            description: t('organizers.communication.description'),
            color: "var(--secondary)"
        },
        {
            icon: <FontAwesomeIcon icon={faCheckCircle} className="organizer-icon" />,
            title: t('organizers.ticketing.title'),
            description: t('organizers.ticketing.description'),
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faBullseye} className="organizer-icon" />,
            title: t('organizers.analytics.title'),
            description: t('organizers.analytics.description'),
            color: "var(--secondary)"
        }
    ];

    return (
        <section id="organizers" className="section organizers pt-20 pb-20">
            <div className="container">
                <div className="animate-fade-in-up">
                    <h2 className="section-title">{t('organizers.title')}</h2>
                    <p className="section-subtitle text-black">
                        {t('organizers.subtitle')}
                    </p>
                </div>

                <div className="organizers-grid">
                    {organizerFeatures.map((feature, index) => (
                        <div
                            key={'feature-' + index}
                            className="organizer-card card hover:-translate-y-2 transition-transform duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="organizer-icon-wrapper" style={{ backgroundColor: feature.color + '20' }}>
                                <div style={{ color: feature.color }}>
                                    {feature.icon}
                                </div>
                            </div>
                            <h3>{feature.title}</h3>
                            <p className='text-black'>{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="organizers-cta animate-fade-in-up">
                    <h3 className="text-2xl font-bold mb-4 text-center">{t('organizers.cta.title')}</h3>
                    <p className="text-center mb-6 text-gray-600">
                        {t('organizers.cta.description')}
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => scrollToSection('download')}
                            className="btn btn-primary hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faDownload} size="lg" />
                            {t('organizers.cta.button')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OrganizersSection;
