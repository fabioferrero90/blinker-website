#!/bin/bash

# Script per leggere la configurazione nginx dal server
# Eseguire questo script per vedere la configurazione attuale

SERVER_HOST="51.178.24.27"
SERVER_USER="debian"

echo "=========================================="
echo "Lettura configurazione nginx dal server"
echo "=========================================="
echo ""

# Prova a leggere da diverse posizioni comuni
CONFIG_PATHS=(
    "/etc/nginx/sites-available/get.blinker-app.com"
    "/etc/nginx/sites-available/get.blinker-app.com.conf"
    "/etc/nginx/sites-enabled/get.blinker-app.com"
    "/etc/nginx/sites-enabled/get.blinker-app.com.conf"
    "/etc/nginx/conf.d/get.blinker-app.com.conf"
)

for config_path in "${CONFIG_PATHS[@]}"; do
    echo "Tentativo: $config_path"
    ssh ${SERVER_USER}@${SERVER_HOST} "sudo cat $config_path 2>/dev/null" && {
        echo ""
        echo "✅ Configurazione trovata in: $config_path"
        echo "=========================================="
        exit 0
    }
done

echo ""
echo "❌ Configurazione non trovata nelle posizioni standard"
echo ""
echo "Elencando i file nginx disponibili:"
ssh ${SERVER_USER}@${SERVER_HOST} "sudo ls -la /etc/nginx/sites-available/ | grep blinker; sudo ls -la /etc/nginx/sites-enabled/ | grep blinker; sudo ls -la /etc/nginx/conf.d/ | grep blinker"

echo ""
echo "Controllando anche lo stato di nginx:"
ssh ${SERVER_USER}@${SERVER_HOST} "sudo systemctl status nginx --no-pager | head -30"

echo ""
echo "Ultimi errori nginx:"
ssh ${SERVER_USER}@${SERVER_HOST} "sudo tail -50 /var/log/nginx/error.log | grep -i blinker || sudo tail -50 /var/log/nginx/error.log"


