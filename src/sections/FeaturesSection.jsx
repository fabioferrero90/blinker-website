import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUsers, faCar, faMapMarkerAlt, faBolt, faShield } from '@fortawesome/free-solid-svg-icons';

function FeaturesSection() {
    const features = [
        {
            icon: <FontAwesomeIcon icon={faCalendar} className="feature-icon" />,
            title: "Eventi Auto",
            description: "Dal raduno del venerdì al Tokyo Auto Salon di turno, non ti perderai più nulla! Scopri eventi nella tua zona e partecipa senza dover stalkerare i gruppi Facebook che non vengono mai aggiornati.",
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faUsers} className="feature-icon" />,
            title: "Crew & Community",
            description: "Unisciti a crew esistenti o creane una tua! Perfetto per chi vuole fare amicizia con altri appassionati (e magari trovare chi ti presta la GT-R per il weekend - sognare non costa nulla 😅).",
            color: "var(--secondary)"
        },
        {
            icon: <FontAwesomeIcon icon={faCar} className="feature-icon" />,
            title: "Garage Personale",
            description: "Mostra al mondo la tua collezione! Gestisci le tue auto, aggiungi foto, specifiche e personalizzazioni. E la parte migliore? Candidati agli eventi in pochi tap! (Perfetto per flexare) 💪",
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faMapMarkerAlt} className="feature-icon" />,
            title: "Mappa Eventi",
            description: "La mappa che ti salva dal girare a caso per la città! Trova eventi vicini, scopri nuovi posti, e non perderti mai più un car meet perché 'non sapevi dove fosse'",
            color: "var(--secondary)"
        },
        {
            icon: <FontAwesomeIcon icon={faBolt} className="feature-icon" />,
            title: "Notifiche Istantanee",
            description: "Ricevi notifiche su nuovi eventi prima dei tuoi amici! Niente più 'ah ma c'era un evento ieri?' - sarai sempre il primo a sapere tutto!",
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faShield} className="feature-icon" />,
            title: "Scopri la Community",
            description: "Esplora auto incredibili e stili di personalizzazione che ti faranno dire 'wow'! Perfetto per prendere ispirazione (e per fare un po' di envy sano - è normale, lo facciamo tutti) 👀",
            color: "var(--secondary)"
        }
    ];

    return (
        <section id="features" className="section features pt-40 pb-40">
            <div className="container">
                <div className="animate-fade-in-up">
                    <h2 className="section-title">Funzionalità Principali</h2>
                    <p className="section-subtitle text-black">
                        Tutte le funzionalità che ti faranno dire <span className='font-semibold'>"dove sei stato tutta la mia vita?"</span> 🤯
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
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
