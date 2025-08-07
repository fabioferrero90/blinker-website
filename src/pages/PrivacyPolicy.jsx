import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield, faGlobe, faUser, faDatabase, faEye, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

function PrivacyPolicy() {
    return (
        <div className="space-y-6 text-gray-700">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <FontAwesomeIcon icon={faShield} className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            </div>

            {/* Introduzione */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Introduzione</h3>
                <p className="leading-relaxed mb-4">
                    Blinker ("noi", "nostro", "ci") è impegnato a proteggere la tua privacy. Questa Privacy Policy spiega come raccogliamo,
                    utilizziamo e proteggiamo le tue informazioni personali quando utilizzi la nostra app mobile e i servizi correlati.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-sm">
                        <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT')}
                    </p>
                </div>
            </section>

            {/* Titolare del Trattamento */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} className="text-green-500" />
                    2. Titolare del Trattamento
                </h3>
                <div className="space-y-4">
                    <p className="leading-relaxed">
                        Il titolare del trattamento dei tuoi dati personali è:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold text-gray-900">Blinker App</p>
                        <p className="text-sm text-gray-700">Via Roma 123, 00100 Roma, Italia</p>
                        <p className="text-sm text-gray-700">Email: privacy@blinker-app.com</p>
                        <p className="text-sm text-gray-700">P.IVA: 12345678901</p>
                    </div>
                </div>
            </section>

            {/* Dati Raccolti */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faDatabase} className="text-purple-500" />
                    3. Dati Personali Raccolti
                </h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        Raccogliamo diversi tipi di informazioni personali:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <h4 className="font-semibold text-blue-900 mb-2">Dati di Identificazione</h4>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Nome e cognome</li>
                                <li>• Indirizzo email</li>
                                <li>• Numero di telefono</li>
                                <li>• Username e password</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-semibold text-green-900 mb-2">Dati di Utilizzo</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                                <li>• Preferenze di eventi</li>
                                <li>• Storico partecipazioni</li>
                                <li>• Interazioni con l'app</li>
                                <li>• Dati di geolocalizzazione</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                            <h4 className="font-semibold text-orange-900 mb-2">Dati Tecnici</h4>
                            <ul className="text-orange-800 text-sm space-y-1">
                                <li>• Indirizzo IP</li>
                                <li>• Tipo di dispositivo</li>
                                <li>• Sistema operativo</li>
                                <li>• Cookie e tecnologie simili</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                            <h4 className="font-semibold text-purple-900 mb-2">Contenuti Utente</h4>
                            <ul className="text-purple-800 text-sm space-y-1">
                                <li>• Foto caricate</li>
                                <li>• Commenti e recensioni</li>
                                <li>• Eventi creati</li>
                                <li>• Messaggi inviati</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Base Giuridica */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Base Giuridica del Trattamento</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        Trattiamo i tuoi dati personali sulla base delle seguenti basi giuridiche:
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <FontAwesomeIcon icon={faShield} className="text-green-600 mt-1" />
                            <div>
                                <h4 className="font-semibold text-green-900">Consenso</h4>
                                <p className="text-green-800 text-sm">
                                    Per marketing, newsletter e cookie non essenziali. Puoi revocare il consenso in qualsiasi momento.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                            <FontAwesomeIcon icon={faUser} className="text-blue-600 mt-1" />
                            <div>
                                <h4 className="font-semibold text-blue-900">Interesse Legittimo</h4>
                                <p className="text-blue-800 text-sm">
                                    Per analisi, miglioramento dei servizi e sicurezza. Puoi opporti a questo trattamento.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                            <FontAwesomeIcon icon={faGlobe} className="text-orange-600 mt-1" />
                            <div>
                                <h4 className="font-semibold text-orange-900">Esecuzione del Contratto</h4>
                                <p className="text-orange-800 text-sm">
                                    Per fornire i servizi richiesti e gestire il tuo account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Finalità del Trattamento */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Finalità del Trattamento</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        Utilizziamo i tuoi dati personali per le seguenti finalità:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Fornitura Servizi</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Gestione account utente</li>
                                <li>• Organizzazione eventi</li>
                                <li>• Comunicazioni relative ai servizi</li>
                                <li>• Supporto tecnico</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Marketing e Comunicazioni</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Newsletter promozionali</li>
                                <li>• Offerte personalizzate</li>
                                <li>• Eventi e novità</li>
                                <li>• Sondaggi di soddisfazione</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Analisi e Miglioramento</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Statistiche di utilizzo</li>
                                <li>• Analisi delle preferenze</li>
                                <li>• Ottimizzazione dell'app</li>
                                <li>• Ricerca e sviluppo</li>
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Sicurezza e Compliance</h4>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Prevenzione frodi</li>
                                <li>• Sicurezza dell'app</li>
                                <li>• Rispetto delle normative</li>
                                <li>• Risoluzione controversie</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conservazione Dati */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Periodo di Conservazione</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        Conserviamo i tuoi dati personali solo per il tempo necessario a raggiungere le finalità per cui sono stati raccolti:
                    </p>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Dati Account</span>
                            <span className="text-sm text-gray-600">Fino alla cancellazione account</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Dati Marketing</span>
                            <span className="text-sm text-gray-600">Fino alla revoca del consenso</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Dati Analytics</span>
                            <span className="text-sm text-gray-600">26 mesi (Google Analytics)</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Log di Sicurezza</span>
                            <span className="text-sm text-gray-600">12 mesi</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diritti dell'Interessato */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7. I Tuoi Diritti</h3>
                <p className="leading-relaxed mb-4">
                    Hai il diritto di esercitare i seguenti diritti sui tuoi dati personali:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <FontAwesomeIcon icon={faEye} className="text-blue-600 mt-1" />
                        <div>
                            <h4 className="font-semibold text-blue-900">Diritto di Accesso</h4>
                            <p className="text-blue-800 text-sm">
                                Ottenere informazioni sui dati che trattiamo e come li utilizziamo.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <FontAwesomeIcon icon={faUser} className="text-green-600 mt-1" />
                        <div>
                            <h4 className="font-semibold text-green-900">Diritto di Rettifica</h4>
                            <p className="text-green-800 text-sm">
                                Correggere dati inesatti o incompleti.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                        <FontAwesomeIcon icon={faTrash} className="text-red-600 mt-1" />
                        <div>
                            <h4 className="font-semibold text-red-900">Diritto alla Cancellazione</h4>
                            <p className="text-red-800 text-sm">
                                Richiedere la cancellazione dei tuoi dati personali.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <FontAwesomeIcon icon={faDownload} className="text-purple-600 mt-1" />
                        <div>
                            <h4 className="font-semibold text-purple-900">Diritto alla Portabilità</h4>
                            <p className="text-purple-800 text-sm">
                                Ricevere i tuoi dati in formato strutturato e trasferibili.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Come Esercitare i Tuoi Diritti</h4>
                    <p className="text-yellow-800 text-sm">
                        Puoi esercitare questi diritti contattandoci all'indirizzo privacy@blinker-app.com.
                        Risponderemo entro 30 giorni dalla ricezione della richiesta.
                    </p>
                </div>
            </section>

            {/* Trasferimenti di Dati */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Trasferimenti di Dati</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        I tuoi dati personali potrebbero essere trasferiti a:
                    </p>

                    <div className="space-y-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Fornitori di Servizi</h4>
                            <p className="text-sm text-gray-700">
                                Utilizziamo servizi di terze parti per hosting, analytics, email marketing e supporto.
                                Tutti i fornitori sono selezionati per garantire adeguati livelli di protezione.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Autorità Pubbliche</h4>
                            <p className="text-sm text-gray-700">
                                Potremmo essere obbligati a condividere dati con autorità pubbliche quando richiesto dalla legge.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sicurezza */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Sicurezza dei Dati</h3>
                <div className="space-y-4">
                    <p className="leading-relaxed mb-4">
                        Implementiamo misure di sicurezza appropriate per proteggere i tuoi dati personali:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-900 mb-2">Misure Tecniche</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                                <li>• Crittografia dei dati</li>
                                <li>• Firewall e antivirus</li>
                                <li>• Backup regolari</li>
                                <li>• Controllo accessi</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">Misure Organizzative</h4>
                            <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Formazione del personale</li>
                                <li>• Procedure di sicurezza</li>
                                <li>• Audit periodici</li>
                                <li>• Gestione incidenti</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cookie */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Cookie e Tecnologie Simili</h3>
                <p className="leading-relaxed mb-4">
                    Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza.
                    Per maggiori dettagli, consulta la nostra Cookie Policy.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Gestione Cookie</h4>
                    <p className="text-orange-800 text-sm">
                        Puoi gestire le tue preferenze sui cookie tramite le impostazioni del browser o il nostro banner cookie.
                    </p>
                </div>
            </section>

            {/* Modifiche alla Policy */}
            <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">11. Modifiche alla Privacy Policy</h3>
                <p className="leading-relaxed mb-4">
                    Ci riserviamo il diritto di aggiornare questa Privacy Policy. Le modifiche saranno pubblicate su questa pagina
                    con una nuova data di "Ultimo aggiornamento".
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Notifica delle Modifiche</h4>
                    <p className="text-yellow-800 text-sm">
                        Per modifiche sostanziali, ti notificheremo tramite l'app, email o banner sul sito.
                    </p>
                </div>
            </section>

            {/* Contatti */}
            <section className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Contatti</h3>
                <p className="text-blue-800 text-sm mb-3">
                    Per domande su questa Privacy Policy o per esercitare i tuoi diritti:
                </p>
                <div className="text-blue-800 text-sm">
                    <p><strong>Email:</strong> privacy@blinker-app.com</p>
                    <p><strong>Indirizzo:</strong> Via Roma 123, 00100 Roma, Italia</p>
                    <p><strong>Telefono:</strong> +39 06 12345678</p>
                </div>
            </section>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>Questa Privacy Policy è conforme al GDPR e alle normative europee sulla protezione dei dati personali.</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
