import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faBullhorn, faCheckCircle, faBullseye, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../contexts/AppContext';

function OrganizersSection() {
    const { scrollToSection } = useAppContext();

    const organizerFeatures = [
        {
            icon: <FontAwesomeIcon icon={faChartLine} className="organizer-icon" />,
            title: "Maggiore Visibilità",
            description: "I tuoi eventi raggiungeranno migliaia di appassionati! Niente più post sui social che si perdono nel feed, qui tutti vedranno il tuo evento e finalmente smetteranno di dire 'non sapevo che ci fosse' 📈",
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faBullhorn} className="organizer-icon" />,
            title: "Comunicazione Efficace",
            description: "Pubblica news, aggiornamenti e modifiche in tempo reale! Tutti i partecipanti riceveranno notifiche istantanee, niente più gruppi WhatsApp che esplodono con 500 messaggi 📢",
            color: "var(--secondary)"
        },
        {
            icon: <FontAwesomeIcon icon={faCheckCircle} className="organizer-icon" />,
            title: "Gestione Selezioni",
            description: "Eventi a numero chiuso? Gestisci le richieste di partecipazione direttamente dall'app! Approva, rifiuta o tieni in lista d'attesa con pochi tap e finalmente potrai dire 'no' senza sentirti in colpa ✅",
            color: "var(--primary)"
        },
        {
            icon: <FontAwesomeIcon icon={faBullseye} className="organizer-icon" />,
            title: "Analytics Avanzati",
            description: "Scopri quanti hanno visto il tuo evento, chi si è interessato e chi ha effettivamente partecipato! Dati che ti aiuteranno a migliorare sempre di più e a vantarti con i numeri! 📊",
            color: "var(--secondary)"
        }
    ];

    return (
        <section id="organizers" className="section organizers pt-40 pb-40">
            <div className="container">
                <div className="animate-fade-in-up">
                    <h2 className="section-title">Per gli Organizzatori 🎯</h2>
                    <p className="section-subtitle text-black">
                        Sei un organizzatore di eventi? Allora questa sezione è fatta apposta per te!{' '}
                        <span className='font-semibold'>Blinker non è solo per i partecipanti</span>, ma anche per chi crea la magia degli eventi! ✨
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
                    <h3 className="text-2xl font-bold mb-4 text-center">Pronto a rivoluzionare i tuoi eventi? 🚀</h3>
                    <p className="text-center mb-6 text-gray-600">
                        Unisciti agli organizzatori che hanno già scelto Blinker per i loro eventi!, non vorrai mica restarne fuori?
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => scrollToSection('download')}
                            className="btn btn-primary hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faDownload} size="lg" />
                            Scarica l'App
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default OrganizersSection;
