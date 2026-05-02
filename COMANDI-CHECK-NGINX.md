# Comandi per verificare la configurazione nginx sul server

## Opzione 1: Connettiti al server e esegui questi comandi

```bash
# Connettiti al server
ssh debian@51.178.24.27

# Cerca la configurazione nginx
sudo cat /etc/nginx/sites-available/get.blinker-app.com
# oppure
sudo cat /etc/nginx/sites-available/get.blinker-app.com.conf
# oppure
sudo cat /etc/nginx/sites-enabled/get.blinker-app.com
# oppure
sudo cat /etc/nginx/conf.d/get.blinker-app.com.conf

# Lista tutti i file nginx disponibili
sudo ls -la /etc/nginx/sites-available/ | grep blinker
sudo ls -la /etc/nginx/sites-enabled/ | grep blinker
sudo ls -la /etc/nginx/conf.d/ | grep blinker

# Verifica lo stato di nginx
sudo systemctl status nginx

# Controlla gli errori nginx
sudo tail -100 /var/log/nginx/error.log

# Testa la configurazione nginx
sudo nginx -t

# Verifica se il servizio nginx è in esecuzione
sudo systemctl is-active nginx
```

## Opzione 2: Esegui da locale (se hai la chiave SSH configurata)

Esegui questo comando sostituendo `~/.ssh/tua-chiave` con il path alla tua chiave SSH:

```bash
ssh -i ~/.ssh/tua-chiave debian@51.178.24.27 "sudo cat /etc/nginx/sites-available/get.blinker-app.com.conf"
```

## Opzione 3: Se la configurazione non esiste

Se non trovi il file di configurazione, potrebbe essere che:
1. La configurazione non è stata creata
2. Il file è in un'altra posizione
3. Il file è vuoto (come quello locale che abbiamo trovato)

In questo caso, copia il file `get.blinker-app.com.conf` creato localmente sul server:

```bash
# Da locale (con la chiave SSH)
scp -i ~/.ssh/tua-chiave get.blinker-app.com.conf debian@51.178.24.27:/tmp/

# Poi sul server
ssh debian@51.178.24.27
sudo cp /tmp/get.blinker-app.com.conf /etc/nginx/sites-available/get.blinker-app.com.conf
sudo ln -sf /etc/nginx/sites-available/get.blinker-app.com.conf /etc/nginx/sites-enabled/get.blinker-app.com.conf
sudo nginx -t
sudo systemctl reload nginx
```

## Possibili cause del 502 Bad Gateway

1. **Nginx non riesce a trovare la directory root**: verifica che `/var/www/get.blinker-app.com` esista e contenga i file
2. **Permessi errati**: verifica che nginx possa leggere i file
3. **Configurazione nginx mancante o errata**
4. **Certificati SSL mancanti o non validi**
5. **Nginx non è in esecuzione**

## Verifica rapida

```bash
# Sul server
sudo ls -la /var/www/get.blinker-app.com/
sudo systemctl status nginx
sudo nginx -t
sudo tail -50 /var/log/nginx/error.log
```


