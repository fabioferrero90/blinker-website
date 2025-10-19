#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Colori per output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ${message}`, 'red');
  process.exit(1);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Verifica se esiste .env
function checkEnv() {
  if (!fs.existsSync('.env')) {
    error('.env file not found! Please create it from env.example');
  }

  const envContent = fs.readFileSync('.env', 'utf8');
  const hostMatch = envContent.match(/VITE_DEPLOY_HOST=(.+)/);
  const userMatch = envContent.match(/VITE_DEPLOY_USER=(.+)/);

  if (!hostMatch || !userMatch) {
    error('.env file must contain VITE_DEPLOY_HOST and VITE_DEPLOY_USER');
  }

  return {
    host: hostMatch[1].trim(),
    user: userMatch[1].trim()
  };
}

// Ottieni versione corrente del service worker
function getCurrentServiceWorkerVersion() {
  const swPath = 'public/sw.js';
  if (!fs.existsSync(swPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(swPath, 'utf8');
    const versionMatch = content.match(/const CACHE_NAME = 'blinker-v(\d+)\.(\d+)\.(\d+)'/);
    return versionMatch ? versionMatch[0].match(/'([^']+)'/)[1] : null;
  } catch (err) {
    return null;
  }
}

// Incrementa versione del service worker
function incrementServiceWorkerVersion() {
  const swPath = 'public/sw.js';
  if (!fs.existsSync(swPath)) {
    warning('Service worker file not found, skipping version increment');
    return;
  }

  try {
    let content = fs.readFileSync(swPath, 'utf8');
    
    // Estrai la versione corrente
    const versionMatch = content.match(/const CACHE_NAME = 'blinker-v(\d+)\.(\d+)\.(\d+)'/);
    if (!versionMatch) {
      warning('Could not parse service worker version, skipping increment');
      return;
    }

    const [, major, minor, patch] = versionMatch;
    const currentVersion = `blinker-v${major}.${minor}.${patch}`;
    const newPatch = parseInt(patch) + 1;
    const newVersion = `blinker-v${major}.${minor}.${newPatch}`;
    
    // Aggiorna entrambe le versioni nel file
    content = content.replace(/const CACHE_NAME = 'blinker-v\d+\.\d+\.\d+'/, `const CACHE_NAME = '${newVersion}'`);
    content = content.replace(/const STATIC_CACHE_NAME = 'blinker-static-v\d+\.\d+\.\d+'/, `const STATIC_CACHE_NAME = '${newVersion}'`);
    
    fs.writeFileSync(swPath, content);
    success(`Service worker version incremented: ${currentVersion} → ${newVersion}`);
  } catch (err) {
    warning(`Failed to increment service worker version: ${err.message}`);
  }
}

// Verifica se esiste dist/
function checkDist() {
  if (!fs.existsSync('dist')) {
    error('dist/ directory not found! Run "npm run build" first');
  }

  const files = fs.readdirSync('dist');
  if (files.length === 0) {
    error('dist/ directory is empty! Run "npm run build" first');
  }

  success(`Found ${files.length} files in dist/`);
}

// Verifica SSH key
function checkSSHKey() {
  // Cerca prima la chiave specifica, poi quelle generiche
  const keyNames = ['blinker_deploy_key_new', 'blinker_deploy_key', 'id_rsa', 'id_ed25519', 'id_ecdsa'];
  let sshKeyPath = null;
  
  for (const keyName of keyNames) {
    const keyPath = path.join(os.homedir(), '.ssh', keyName);
    if (fs.existsSync(keyPath)) {
      sshKeyPath = keyPath;
      break;
    }
  }

  if (!sshKeyPath) {
    warning('SSH key not found!');
    log('Please run: ssh-keygen -t rsa -b 4096 -f ~/.ssh/blinker_deploy_key', 'yellow');
    log('Then copy it to server: ssh-copy-id -i ~/.ssh/blinker_deploy_key.pub user@server', 'yellow');
    error('SSH key setup required');
  }

  success(`SSH key found: ${path.basename(sshKeyPath)}`);
  return sshKeyPath;
}

// Esegue comando con output
function runCommand(command, description) {
  try {
    info(description);
    execSync(command, { stdio: 'inherit' });
    success(`${description} completed`);
  } catch (err) {
    error(`${description} failed: ${err.message}`);
  }
}

// Test connessione SSH
function testSSH(host, user, sshKeyPath) {
  try {
    info('Testing SSH connection...');
    execSync(`ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no -o ConnectTimeout=10 ${user}@${host} "echo 'SSH OK'"`, { stdio: 'pipe' });
    success('SSH connection successful');
  } catch (err) {
    error(`SSH connection failed: ${err.message}`);
  }
}

// Backup remoto
function backupRemote(host, user, sshKeyPath) {
  try {
    info('Creating remote backup...');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    execSync(`ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${user}@${host} "sudo cp -r /var/www/get.blinker-app.com /var/www/get.blinker-app.com.backup.${timestamp}"`, { stdio: 'pipe' });
    success('Remote backup created');
  } catch (err) {
    warning('Backup failed (continuing anyway)');
  }
}

// Crea directory se non esiste
function ensureDirectory(host, user, sshKeyPath) {
  try {
    info('Ensuring target directory exists...');
    // Rimuovi directory esistente e ricreala con permessi corretti
    execSync(`ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${user}@${host} "sudo rm -rf /var/www/get.blinker-app.com && sudo mkdir -p /var/www/get.blinker-app.com && sudo chown ${user}:${user} /var/www/get.blinker-app.com && sudo chmod 755 /var/www/get.blinker-app.com"`, { stdio: 'pipe' });
    success('Target directory ready');
  } catch (err) {
    error(`Directory setup failed: ${err.message}`);
  }
}

// Upload file
function uploadFiles(host, user, sshKeyPath) {
  try {
    info('Uploading files to server...');
    execSync(`scp -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no -r dist/. ${user}@${host}:/var/www/get.blinker-app.com/`, { stdio: 'inherit' });
    success('Files uploaded successfully');
  } catch (err) {
    error(`Upload failed: ${err.message}`);
  }
}

// Imposta permessi
function setPermissions(host, user, sshKeyPath) {
  try {
    info('Setting file permissions...');
    execSync(`ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${user}@${host} "sudo chown -R www-data:www-data /var/www/get.blinker-app.com && sudo chmod -R 755 /var/www/get.blinker-app.com"`, { stdio: 'inherit' });
    success('Permissions set correctly');
  } catch (err) {
    error(`Permission setting failed: ${err.message}`);
  }
}

// Reload Nginx
function reloadNginx(host, user, sshKeyPath) {
  try {
    info('Reloading Nginx...');
    execSync(`ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${user}@${host} "sudo systemctl reload nginx"`, { stdio: 'inherit' });
    success('Nginx reloaded successfully');
  } catch (err) {
    error(`Nginx reload failed: ${err.message}`);
  }
}

// Test sito online
function testSite(host) {
  try {
    info('Testing site availability...');
    execSync(`curl -I https://get.blinker-app.com --connect-timeout 10`, { stdio: 'pipe' });
    success('Site is online and responding');
  } catch (err) {
    warning('Site test failed (may still be working)');
  }
}

// Funzione principale
function main() {
  log('🚀 Blinker Website Deployment', 'bright');
  log('================================', 'bright');

  // Verifiche iniziali
  const config = checkEnv();
  
  // Incrementa versione del service worker prima del build
  incrementServiceWorkerVersion();
  
  // Esegui build di produzione
  log('\n🔨 Building for production...', 'bright');
  runCommand('npm run build:prod', 'Production build');
  
  checkDist();
  const sshKeyPath = checkSSHKey();

  log(`\n📋 Deployment Info:`, 'bright');
  log(`Server: ${config.user}@${config.host}`, 'cyan');
  log(`Target: /var/www/get.blinker-app.com`, 'cyan');
  log(`Site: https://get.blinker-app.com`, 'cyan');
  log(`SSH Key: ${path.basename(sshKeyPath)}`, 'cyan');
  
  const currentVersion = getCurrentServiceWorkerVersion();
  if (currentVersion) {
    log(`Service Worker: ${currentVersion}`, 'cyan');
  }

  // Test connessione
  testSSH(config.host, config.user, sshKeyPath);

  // Assicura che la directory esista
  ensureDirectory(config.host, config.user, sshKeyPath);

  // Backup
  backupRemote(config.host, config.user, sshKeyPath);

  // Upload
  uploadFiles(config.host, config.user, sshKeyPath);

  // Permessi
  setPermissions(config.host, config.user, sshKeyPath);

  // Reload Nginx
  reloadNginx(config.host, config.user, sshKeyPath);

  // Test finale
  testSite(config.host);

  log('\n🎉 Deployment completed successfully!', 'bright');
  log('Your site is now live at: https://get.blinker-app.com', 'green');
}

// Gestione errori
process.on('uncaughtException', (err) => {
  error(`Unexpected error: ${err.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
  error(`Unhandled rejection: ${reason}`);
});

// Esegui
main();
