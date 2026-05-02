#!/bin/bash

# Script per aggiungere la chiave SSH al server
# Questo script copia la chiave pubblica sul server

SSH_KEY_PUB="$(cat ~/.ssh/blinker_deploy_key.pub)"
SERVER="debian@51.178.24.27"

echo "=========================================="
echo "Aggiunta chiave SSH al server"
echo "=========================================="
echo ""
echo "Chiave pubblica:"
echo "$SSH_KEY_PUB"
echo ""
echo "Aggiungendo la chiave al server..."
echo ""
echo "Opzione 1: Usa ssh-copy-id (se disponibile)"
echo "  ssh-copy-id -i ~/.ssh/blinker_deploy_key.pub $SERVER"
echo ""
echo "Opzione 2: Aggiungi manualmente"
echo "  Esegui sul server:"
echo "    mkdir -p ~/.ssh"
echo "    echo '$SSH_KEY_PUB' >> ~/.ssh/authorized_keys"
echo "    chmod 700 ~/.ssh"
echo "    chmod 600 ~/.ssh/authorized_keys"
echo ""
echo "Opzione 3: Usa questo comando (inserisce la chiave automaticamente):"
echo "  cat ~/.ssh/blinker_deploy_key.pub | ssh $SERVER 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'"
echo ""
echo "Vuoi eseguire l'opzione 3 automaticamente? (s/n)"
read -r response

if [[ "$response" =~ ^[Ss]$ ]]; then
    echo "Eseguendo il comando..."
    cat ~/.ssh/blinker_deploy_key.pub | ssh $SERVER 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Chiave aggiunta con successo!"
        echo ""
        echo "Ora puoi testare la connessione con:"
        echo "  ssh blinker-server"
        echo "  oppure"
        echo "  ssh get.blinker-app.com"
    else
        echo ""
        echo "❌ Errore durante l'aggiunta della chiave"
        echo "Prova ad aggiungere manualmente usando l'opzione 2"
    fi
else
    echo "Script terminato. Esegui manualmente uno dei comandi sopra."
fi


