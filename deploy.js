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
  const sshKeyPath = path.join(os.homedir(), '.ssh', 'blinker_deploy_key');

  if (!fs.existsSync(sshKeyPath)) {
    warning('SSH key not found!');
    log('Please run: ssh-keygen -t rsa -b 4096 -f ~/.ssh/blinker_deploy_key', 'yellow');
    log('Then copy it to server: ssh-copy-id -i ~/.ssh/blinker_deploy_key.pub user@server', 'yellow');
    error('SSH key setup required');
  }

  success('SSH key found');
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
function testSSH(host, user) {
  try {
    info('Testing SSH connection...');
    const sshKeyPath = path.join(os.homedir(), '.ssh', 'blinker_deploy_key');
    execSync(`ssh -i "${sshKeyPath}" -o ConnectTimeout=10 ${user}@${host} "echo 'SSH OK'"`, { stdio: 'pipe' });
    success('SSH connection successful');
  } catch (err) {
    error(`SSH connection failed: ${err.message}`);
  }
}

// Backup remoto
function backupRemote(host, user) {
  try {
    info('Creating remote backup...');
    const sshKeyPath = path.join(os.homedir(), '.ssh', 'blinker_deploy_key');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    execSync(`ssh -i "${sshKeyPath}" ${user}@${host} "sudo cp -r /var/www/get.blinker-app.com /var/www/get.blinker-app.com.backup.${timestamp}"`, { stdio: 'pipe' });
    success('Remote backup created');
  } catch (err) {
    warning('Backup failed (continuing anyway)');
  }
}

// Crea directory se non esiste
function ensureDirectory(host, user) {
  try {
    info('Ensuring target directory exists...');
    const sshKeyPath = path.join(os.homedir(), '.ssh', 'blinker_deploy_key');
    // Rimuovi directory esistente e ricreala con permessi corretti
    execSync(`ssh -i "${sshKeyPath}" ${user}@${host} "sudo rm -rf /var/www/get.blinker-app.com && sudo mkdir -p /var/www/get.blinker-app.com && sudo chown ${user}:${user} /var/www/get.blinker-app.com"`, { stdio: 'pipe' });
    success('Target directory ready');
  } catch (err) {
    error(`Directory setup failed: ${err.message}`);
  }
}

// Upload file
function uploadFiles(host, user) {
  try {
    info('Uploading files to server...');
    const sshKeyPath = path.join(os.homedir(), '.ssh', 'blinker_deploy_key');
    execSync(`scp -i "${sshKeyPath}" -r dist/. ${user}@${host}:/var/www/get.blinker-app.com/`, { stdio: 'inherit' });
    success('Files uploaded successfully');
  } catch (err) {
    error(`Upload failed: ${err.message}`);
  }
}

// Imposta permessi
function setPermissions(host, user) {
  try {
    info('Setting file permissions...');
    const sshKeyPath = path.join(os.homedir(), '.ssh', 'blinker_deploy_key');
    execSync(`ssh -i "${sshKeyPath}" ${user}@${host} "sudo chown -R www-data:www-data /var/www/get.blinker-app.com && sudo chmod -R 755 /var/www/get.blinker-app.com"`, { stdio: 'inherit' });
    success('Permissions set correctly');
  } catch (err) {
    error(`Permission setting failed: ${err.message}`);
  }
}

// Reload Nginx
function reloadNginx(host, user) {
  try {
    info('Reloading Nginx...');
    const sshKeyPath = path.join(os.homedir(), '.ssh', 'blinker_deploy_key');
    execSync(`ssh -i "${sshKeyPath}" ${user}@${host} "sudo systemctl reload nginx"`, { stdio: 'inherit' });
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
  checkDist();
  checkSSHKey();

  log(`\n📋 Deployment Info:`, 'bright');
  log(`Server: ${config.user}@${config.host}`, 'cyan');
  log(`Target: /var/www/get.blinker-app.com`, 'cyan');
  log(`Site: https://get.blinker-app.com`, 'cyan');

  // Test connessione
  testSSH(config.host, config.user);

  // Assicura che la directory esista
  ensureDirectory(config.host, config.user);

  // Backup
  backupRemote(config.host, config.user);

  // Upload
  uploadFiles(config.host, config.user);

  // Permessi
  setPermissions(config.host, config.user);

  // Reload Nginx
  reloadNginx(config.host, config.user);

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
