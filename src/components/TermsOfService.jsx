import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faTimes, faShield, faUser, faCar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function TermsOfService({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
                {/* Pulsante di chiusura sticky */}
                <button
                    onClick={onClose}
                    className="w-10 h-10 absolute top-4 right-4 z-10 text-white p-2 hover:bg-gray-800 rounded-full transition-colors bg-black shadow-lg cursor-pointer"
                    aria-label="Chiudi modal"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className="p-6 pt-16 overflow-y-auto max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <FontAwesomeIcon icon={faFileContract} className="text-2xl text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Termini di Servizio</h2>
                    </div>

                    {/* Contenuto */}
                    <div className="space-y-6 text-gray-700">
                        {/* Accettazione dei Termini */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faShield} className="text-green-500" />
                                1. Accettazione dei Termini
                            </h3>
                            <p className="leading-relaxed">
                                Utilizzando l'app Blinker, accetti di essere vincolato da questi Termini di Servizio.
                                Se non accetti questi termini, non utilizzare l'app. Questi termini si applicano a tutti gli utenti
                                dell'app, inclusi organizzatori di eventi e partecipanti.
                            </p>
                        </section>

                        {/* Descrizione del Servizio */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCar} className="text-orange-500" />
                                2. Descrizione del Servizio
                            </h3>
                            <p className="leading-relaxed mb-4">
                                Blinker è un'applicazione mobile che facilita l'organizzazione e la partecipazione a eventi automotive.
                                I nostri servizi includono:
                            </p>
                            <ul className="space-y-2 text-sm ml-4">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>Creazione e gestione di eventi automotive</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>Registrazione e partecipazione agli eventi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>Comunicazione tra organizzatori e partecipanti</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>Condivisione di foto e contenuti relativi agli eventi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>Newsletter e comunicazioni promozionali</span>
                                </li>
                            </ul>
                        </section>

                        {/* Registrazione Account */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faUser} className="text-purple-500" />
                                3. Registrazione e Account
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Creazione Account</h4>
                                    <p className="text-blue-800 text-sm">
                                        Per utilizzare alcune funzionalità dell'app, potresti dover creare un account.
                                        Sei responsabile di mantenere la riservatezza delle tue credenziali di accesso.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-2">Informazioni Accurate</h4>
                                    <p className="text-green-800 text-sm">
                                        Ti impegni a fornire informazioni accurate, complete e aggiornate durante la registrazione
                                        e l'utilizzo dell'app.
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Responsabilità Account</h4>
                                    <p className="text-yellow-800 text-sm">
                                        Sei responsabile di tutte le attività che si verificano sotto il tuo account.
                                        Notifica immediatamente qualsiasi uso non autorizzato.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Uso Accettabile */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faShield} className="text-red-500" />
                                4. Uso Accettabile
                            </h3>
                            <p className="leading-relaxed mb-4">
                                Ti impegni a utilizzare l'app solo per scopi legittimi e in conformità con questi termini.
                                È vietato:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                    <h4 className="font-semibold text-red-900 mb-2">Attività Proibite</h4>
                                    <ul className="text-red-800 text-sm space-y-1">
                                        <li>• Violare leggi applicabili</li>
                                        <li>• Infrangere diritti di proprietà intellettuale</li>
                                        <li>• Diffamare o molestare altri utenti</li>
                                        <li>• Distribuire malware o contenuti dannosi</li>
                                    </ul>
                                </div>
                                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                    <h4 className="font-semibold text-orange-900 mb-2">Contenuti Inappropriati</h4>
                                    <ul className="text-orange-800 text-sm space-y-1">
                                        <li>• Contenuti offensivi o inappropriati</li>
                                        <li>• Spam o contenuti commerciali non autorizzati</li>
                                        <li>• Informazioni false o fuorvianti</li>
                                        <li>• Violazione della privacy altrui</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Contenuto Utente */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Contenuto Utente</h3>
                            <div className="space-y-4">
                                <p className="leading-relaxed">
                                    Mantieni la proprietà dei contenuti che carichi sull'app, ma ci concedi una licenza
                                    non esclusiva per utilizzarli in relazione ai nostri servizi.
                                </p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Licenza</h4>
                                    <p className="text-sm text-gray-700">
                                        Caricando contenuti, ci concedi il diritto di utilizzarli, riprodurli, modificare,
                                        distribuire e visualizzare pubblicamente in relazione all'app e ai nostri servizi.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Privacy e Sicurezza */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Privacy e Sicurezza</h3>
                            <p className="leading-relaxed mb-4">
                                La tua privacy è importante per noi. La raccolta e l'utilizzo delle tue informazioni personali
                                sono regolati dalla nostra Privacy Policy.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Misure di Sicurezza</h4>
                                <p className="text-blue-800 text-sm">
                                    Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali,
                                    ma non possiamo garantire la sicurezza assoluta dei dati trasmessi online.
                                </p>
                            </div>
                        </section>

                        {/* Limitazioni di Responsabilità */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-500" />
                                7. Limitazioni di Responsabilità
                            </h3>
                            <div className="space-y-4">
                                <p className="leading-relaxed">
                                    L'app è fornita "così com'è" senza garanzie di alcun tipo. Non siamo responsabili per:
                                </p>
                                <ul className="space-y-2 text-sm ml-4">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Danni diretti, indiretti, incidentali o consequenziali</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Perdita di dati o interruzioni del servizio</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Azioni di terze parti o altri utenti</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span>Eventi organizzati tramite l'app</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Proprietà Intellettuale */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Proprietà Intellettuale</h3>
                            <p className="leading-relaxed mb-4">
                                L'app e tutti i suoi contenuti, inclusi ma non limitati a testo, grafica, loghi, icone,
                                immagini, clip audio, download digitali e software, sono di proprietà di Blinker o dei suoi
                                fornitori di contenuti e sono protetti dalle leggi italiane e internazionali sui diritti d'autore.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Licenza Limitata</h4>
                                <p className="text-sm text-gray-700">
                                    Ti concediamo una licenza limitata, non esclusiva e revocabile per utilizzare l'app
                                    per scopi personali e non commerciali, in conformità con questi termini.
                                </p>
                            </div>
                        </section>

                        {/* Risoluzione */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Risoluzione</h3>
                            <p className="leading-relaxed mb-4">
                                Possiamo sospendere o terminare il tuo accesso all'app in qualsiasi momento, con o senza preavviso,
                                per qualsiasi motivo, incluso ma non limitato alla violazione di questi termini.
                            </p>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-yellow-900 mb-2">Effetti della Risoluzione</h4>
                                <p className="text-yellow-800 text-sm">
                                    Alla risoluzione, il tuo diritto di utilizzare l'app cesserà immediatamente.
                                    Le disposizioni di questi termini che per loro natura dovrebbero sopravvivere
                                    alla risoluzione rimarranno in vigore.
                                </p>
                            </div>
                        </section>

                        {/* Modifiche ai Termini */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Modifiche ai Termini</h3>
                            <p className="leading-relaxed mb-4">
                                Ci riserviamo il diritto di modificare questi termini in qualsiasi momento.
                                Le modifiche saranno effettive immediatamente dopo la pubblicazione dei termini aggiornati nell'app.
                            </p>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Notifica delle Modifiche</h4>
                                <p className="text-blue-800 text-sm">
                                    Per modifiche sostanziali, ti notificheremo tramite l'app o via email.
                                    L'uso continuato dell'app dopo le modifiche costituisce accettazione dei nuovi termini.
                                </p>
                            </div>
                        </section>

                        {/* Legge Applicabile */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">11. Legge Applicabile</h3>
                            <p className="leading-relaxed">
                                Questi termini sono regolati e interpretati in conformità con le leggi italiane.
                                Qualsiasi controversia sarà soggetta alla giurisdizione esclusiva dei tribunali italiani.
                            </p>
                        </section>

                        {/* Contatti */}
                        <section className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Contatti</h3>
                            <p className="text-blue-800 text-sm mb-3">
                                Per domande su questi Termini di Servizio, contattaci:
                            </p>
                            <div className="text-blue-800 text-sm">
                                <p><strong>Email:</strong> legal@blinker-app.com</p>
                                <p><strong>Indirizzo:</strong> Via Roma 123, 00100 Roma, Italia</p>
                                <p><strong>Telefono:</strong> +39 06 12345678</p>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                        <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsOfService;
