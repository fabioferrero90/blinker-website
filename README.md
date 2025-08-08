# Blinker Website

Sito web one-page moderno e accattivante per l'app mobile Blinker.

## Integrazione Sender.net

Il sito include l'integrazione con Sender.net per la gestione della newsletter e della beta.

### Configurazione

1. **Variabili d'ambiente**: Aggiungi le seguenti variabili al file `.env`:
   ```bash
   VITE_SENDER_API_KEY=your-sender-api-key-here
   VITE_SENDER_LIST_ID=your-sender-list-id-here
   VITE_RELEASED=false
   ```

2. **API Key**: Ottieni la tua API key da [Sender.net](https://sender.net) nel pannello di controllo.

3. **List ID**: Crea una lista in Sender.net e copia l'ID della lista.

4. **RELEASED**: Imposta su `true` per la versione rilasciata, `false` per la beta.

### Funzionalità

- **Iscrizione automatica**: Gli utenti vengono automaticamente iscritti alla newsletter quando compilano il form.
- **Gestione lingue**: Il campo "Language" viene automaticamente popolato con la lingua corrente dell'utente:
  - `it` → Italian
  - `en` → English
  - `es` → Spanish
  - `fr` → French
  - `de` → German
- **Modalità Beta**: Quando `VITE_RELEASED=false`, mostra il form di preregistrazione beta invece della newsletter.

### Struttura del codice

- `src/services/senderService.js`: Servizio per le chiamate API a Sender.net
- `src/components/NewsletterSignup.jsx`: Componente del form di iscrizione newsletter
- `src/components/BetaSignup.jsx`: Componente del form di preregistrazione beta
- `src/pages/Homepage.jsx`: Gestisce la logica di visualizzazione basata su RELEASED

### Gestione errori

Il sistema gestisce automaticamente:
- Errori di rete
- Email non valide
- Configurazione mancante
- Errori API di Sender.net

### GDPR Compliance

Tutte le iscrizioni vengono loggate per la compliance GDPR con:
- Nome e cognome
- Email
- Lingua
- Timestamp
- Consenso
- Fonte (footer-newsletter o beta-signup)