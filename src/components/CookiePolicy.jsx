import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faTimes, faShield, faEye, faCog } from '@fortawesome/free-solid-svg-icons';

function CookiePolicy({ isOpen, onClose }) {
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
                        <FontAwesomeIcon icon={faCookieBite} className="text-2xl text-orange-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Cookie Policy</h2>
                    </div>

                    {/* Contenuto */}
                    <div className="space-y-6 text-gray-700">
                        {/* Cosa sono i Cookie */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faShield} className="text-blue-500" />
                                Cosa sono i Cookie?
                            </h3>
                            <p className="leading-relaxed">
                                I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web.
                                Questi file contengono informazioni che aiutano il sito a ricordare le tue preferenze e a migliorare la tua esperienza di navigazione.
                            </p>
                        </section>

                        {/* Tipi di Cookie */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faEye} className="text-green-500" />
                                Tipi di Cookie che Utilizziamo
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="font-semibold text-blue-900 mb-2">Cookie Essenziali</h4>
                                    <p className="text-blue-800 text-sm">
                                        Questi cookie sono necessari per il funzionamento del sito web. Includono cookie per:
                                    </p>
                                    <ul className="text-blue-800 text-sm mt-2 ml-4 list-disc">
                                        <li>Gestione della sessione utente</li>
                                        <li>Preferenze di lingua</li>
                                        <li>Sicurezza e autenticazione</li>
                                        <li>Carrello acquisti (se applicabile)</li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                    <h4 className="font-semibold text-green-900 mb-2">Cookie Analytics</h4>
                                    <p className="text-green-800 text-sm">
                                        Utilizziamo Google Analytics per raccogliere informazioni su come i visitatori utilizzano il nostro sito:
                                    </p>
                                    <ul className="text-green-800 text-sm mt-2 ml-4 list-disc">
                                        <li>Pagine più visitate</li>
                                        <li>Tempo di permanenza</li>
                                        <li>Fonte del traffico</li>
                                        <li>Comportamento degli utenti</li>
                                    </ul>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                                    <h4 className="font-semibold text-purple-900 mb-2">Cookie Marketing</h4>
                                    <p className="text-purple-800 text-sm">
                                        Questi cookie vengono utilizzati per:
                                    </p>
                                    <ul className="text-purple-800 text-sm mt-2 ml-4 list-disc">
                                        <li>Newsletter e comunicazioni promozionali</li>
                                        <li>Pubblicità personalizzate</li>
                                        <li>Analisi delle campagne marketing</li>
                                        <li>Retargeting pubblicitario</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Gestione Cookie */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FontAwesomeIcon icon={faCog} className="text-gray-500" />
                                Come Gestire i Cookie
                            </h3>
                            <p className="leading-relaxed mb-4">
                                Puoi controllare e gestire i cookie attraverso le impostazioni del tuo browser. Ecco come:
                            </p>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                                    <p className="text-sm text-gray-600">
                                        Impostazioni → Privacy e sicurezza → Cookie e altri dati del sito
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                                    <p className="text-sm text-gray-600">
                                        Opzioni → Privacy e sicurezza → Cookie e dati del sito
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                                    <p className="text-sm text-gray-600">
                                        Preferenze → Privacy → Gestisci dati del sito web
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                                    <p className="text-sm text-gray-600">
                                        Impostazioni → Cookie e autorizzazioni sito
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Cookie di Terze Parti */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookie di Terze Parti</h3>
                            <p className="leading-relaxed mb-4">
                                Il nostro sito utilizza servizi di terze parti che potrebbero impostare cookie:
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span><strong>Google Analytics:</strong> Per analisi del traffico e statistiche</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span><strong>Google Fonts:</strong> Per il caricamento dei font</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span><strong>Social Media:</strong> Per integrazione con piattaforme social</span>
                                </li>
                            </ul>
                        </section>

                        {/* Conservazione */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Periodo di Conservazione</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium">Cookie di Sessione</span>
                                    <span className="text-sm text-gray-600">Fino alla chiusura del browser</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium">Cookie Analytics</span>
                                    <span className="text-sm text-gray-600">26 mesi (Google Analytics)</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <span className="font-medium">Cookie Marketing</span>
                                    <span className="text-sm text-gray-600">Fino a 2 anni</span>
                                </div>
                            </div>
                        </section>

                        {/* Aggiornamenti */}
                        <section>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Aggiornamenti alla Policy</h3>
                            <p className="leading-relaxed">
                                Questa Cookie Policy può essere aggiornata periodicamente per riflettere cambiamenti nelle nostre pratiche
                                o per altri motivi operativi, legali o normativi. Ti informeremo di eventuali modifiche sostanziali
                                attraverso il nostro sito web o altri mezzi di comunicazione.
                            </p>
                        </section>

                        {/* Contatti */}
                        <section className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Hai Domande sui Cookie?</h3>
                            <p className="text-blue-800 text-sm mb-3">
                                Se hai domande su questa Cookie Policy o su come utilizziamo i cookie, non esitare a contattarci:
                            </p>
                            <div className="text-blue-800 text-sm">
                                <p><strong>Email:</strong> privacy@blinker-app.com</p>
                                <p><strong>Indirizzo:</strong> Via Roma 123, 00100 Roma, Italia</p>
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

export default CookiePolicy;
