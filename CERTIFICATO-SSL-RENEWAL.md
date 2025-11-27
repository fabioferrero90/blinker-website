# Configurazione Auto-Renewal Certificato SSL

## ✅ Configurazione Completa

Il rinnovo automatico dei certificati SSL per **tutti i domini Blinker** è configurato e attivo.

### 1. Timer Systemd
- **Stato**: ✅ Attivo e abilitato
- **Frequenza**: 2 volte al giorno (00:00 e 12:00 UTC)
- **Delay randomizzato**: 43200 secondi (12 ore) per evitare sovraccarico sui server Let's Encrypt
- **Percorso**: `/lib/systemd/system/certbot.timer`

### 2. Deploy Hook (Globale)
- **Script**: `/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh`
- **Funzione**: Ricarica nginx automaticamente dopo ogni rinnovo certificato
- **Esecuzione**: Automatica dopo ogni rinnovo riuscito per **tutti i certificati**
- **Copertura**: Globale per tutti i domini configurati

### 3. Certificati Configurati
- **blinker-app.com** (include: blinker-app.com, www.blinker-app.com, dashboard.blinker-app.com)
  - File renewal: `/etc/letsencrypt/renewal/blinker-app.com.conf`
  - Authenticator: nginx (ricarica nginx automaticamente)
- **get.blinker-app.com**
  - File renewal: `/etc/letsencrypt/renewal/get.blinker-app.com.conf`
  - Authenticator: nginx (ricarica nginx automaticamente)
- **Altri domini**: dashboard, support, bridge, www (se configurati)

**Rinnovo automatico**: Attivo quando mancano meno di 30 giorni alla scadenza per **tutti i certificati**

## 📋 Verifica Stato

Per verificare lo stato del rinnovo automatico:

```bash
# Verifica timer
sudo systemctl status certbot.timer

# Lista prossimi eventi
sudo systemctl list-timers certbot.timer

# Verifica certificati
sudo certbot certificates

# Test rinnovo (dry-run) per un certificato specifico
sudo certbot renew --cert-name get.blinker-app.com --dry-run
sudo certbot renew --cert-name blinker-app.com --dry-run

# Test rinnovo (dry-run) per tutti i certificati
sudo certbot renew --dry-run
```

## 🔄 Come Funziona

1. **Timer esegue certbot** 2 volte al giorno (globale per tutti i certificati)
2. **Certbot controlla** tutti i certificati configurati
3. **Per ogni certificato** che scade tra meno di 30 giorni:
   - Rinnova il certificato automaticamente
   - Esegue il deploy hook per ricaricare nginx
4. **Deploy hook globale** ricarica nginx una volta dopo tutti i rinnovi
5. **Log** vengono registrati in `/var/log/letsencrypt/letsencrypt.log`

## 📅 Scadenze Correnti

### blinker-app.com
- **Domini coperti**: blinker-app.com, www.blinker-app.com, dashboard.blinker-app.com
- **Scadenza**: 6 Febbraio 2026
- **Ultimo rinnovo**: 8 Novembre 2025

### get.blinker-app.com
- **Dominio**: get.blinker-app.com
- **Scadenza**: 24 Febbraio 2026
- **Ultimo rinnovo**: 26 Novembre 2025

## 🛠️ Manutenzione

### Rinnovo manuale (se necessario)
```bash
# Rinnova un certificato specifico
sudo certbot renew --cert-name get.blinker-app.com --force-renewal
sudo certbot renew --cert-name blinker-app.com --force-renewal

# Rinnova tutti i certificati scadenti
sudo certbot renew --force-renewal

# Ricarica nginx dopo rinnovo manuale
sudo systemctl reload nginx
```

### Verifica hook deploy
```bash
sudo bash /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
```

### Log certificati
```bash
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

## ⚠️ Note Importanti

- **Tutti i certificati** vengono rinnovati automaticamente quando mancano meno di 30 giorni
- Il deploy hook **globale** ricarica nginx automaticamente dopo ogni rinnovo
- Il timer è **globale** e gestisce tutti i certificati configurati
- Non è necessario intervento manuale per nessun dominio
- Se ci sono problemi, controllare i log in `/var/log/letsencrypt/letsencrypt.log`

## 🌐 Domini Coperti

Il sistema di auto-renewal gestisce automaticamente:
- ✅ **blinker-app.com** (dominio principale)
- ✅ **www.blinker-app.com** (incluso nel certificato principale)
- ✅ **dashboard.blinker-app.com** (incluso nel certificato principale)
- ✅ **get.blinker-app.com** (certificato separato)
- ✅ Altri sottodomini configurati (support, bridge, ecc.)

