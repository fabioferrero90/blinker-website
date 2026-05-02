import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUsers, faCar, faMapMarkerAlt, faBolt, faShield } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function FeaturesSection() {
    const { t } = useTranslation();
    const features = [
        {
            icon: <FontAwesomeIcon icon={faCalendar} className="feature-icon" />,
            title: t('features.discover.title'),
            description: t('features.discover.description'),
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faUsers} className="feature-icon" />,
            title: t('features.social.title'),
            description: t('features.social.description'),
            color: "var(--secondary)"
        },
        {
            icon: <FontAwesomeIcon icon={faCar} className="feature-icon" />,
            title: t('features.organize.title'),
            description: t('features.organize.description'),
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faMapMarkerAlt} className="feature-icon" />,
            title: t('features.maps.title'),
            description: t('features.maps.description'),
            color: "var(--secondary)"
        },
        {
            icon: <FontAwesomeIcon icon={faBolt} className="feature-icon" />,
            title: t('features.notifications.title'),
            description: t('features.notifications.description'),
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faShield} className="feature-icon" />,
            title: t('features.calendar.title'),
            description: t('features.calendar.description'),
            color: "var(--secondary)"
        }
    ];

    return (
        <section id="features" className="section features pt-20 pb-20">
            <div className="container">
                <div className="animate-fade-in-up">
                    <h2 className="section-title">{t('features.title')}</h2>
                    <p className="section-subtitle text-black">
                        {t('features.subtitle')}
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={"feature-" + index}
                            className="feature-card card hover:-translate-y-2 transition-transform duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="feature-icon-wrapper" style={{ backgroundColor: feature.color + '20' }}>
                                <div style={{ color: feature.color }}>
                                    {feature.icon}
                                </div>
                            </div>
                            <h3>{feature.title}</h3>
                            <p className='text-black'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
