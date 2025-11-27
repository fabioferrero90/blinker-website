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
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Verifica se esiste .env
function getServerConfig() {
  if (!fs.existsSync('.env')) {
    log('❌ .env file not found!', 'red');
    process.exit(1);
  }

  const envContent = fs.readFileSync('.env', 'utf8');
  const hostMatch = envContent.match(/VITE_DEPLOY_HOST=(.+)/);
  const userMatch = envContent.match(/VITE_DEPLOY_USER=(.+)/);

  if (!hostMatch || !userMatch) {
    log('❌ .env file must contain VITE_DEPLOY_HOST and VITE_DEPLOY_USER', 'red');
    process.exit(1);
  }

  return {
    host: hostMatch[1].trim(),
    user: userMatch[1].trim()
  };
}

// Verifica SSH key
function getSSHKey() {
  const keyNames = ['blinker_deploy_key_new', 'blinker_deploy_key', 'id_rsa', 'id_ed25519', 'id_ecdsa'];
  
  for (const keyName of keyNames) {
    const keyPath = path.join(os.homedir(), '.ssh', keyName);
    if (fs.existsSync(keyPath)) {
      return keyPath;
    }
  }
  
  log('❌ SSH key not found!', 'red');
  process.exit(1);
}

// Legge la configurazione nginx dal server
function readNginxConfig(host, user, sshKeyPath) {
  const configPaths = [
    '/etc/nginx/sites-available/get.blinker-app.com',
    '/etc/nginx/sites-available/get.blinker-app.com.conf',
    '/etc/nginx/conf.d/get.blinker-app.com.conf',
    '/etc/nginx/sites-enabled/get.blinker-app.com',
    '/etc/nginx/sites-enabled/get.blinker-app.com.conf'
  ];

  log('\n📋 Reading nginx configuration from server...', 'bright');
  log(`Server: ${user}@${host}`, 'cyan');

  for (const configPath of configPaths) {
    try {
      log(`\nTrying: ${configPath}`, 'yellow');
      const command = `ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${user}@${host} "sudo cat ${configPath}"`;
      const config = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
      
      if (config && config.trim()) {
        log(`\n✅ Found configuration at: ${configPath}`, 'green');
        log('\n' + '='.repeat(80), 'bright');
        console.log(config);
        log('='.repeat(80) + '\n', 'bright');
        return config;
      }
    } catch (err) {
      // Try next path
    }
  }

  // Se non trovato, prova a listare i file disponibili
  try {
    log('\n🔍 Listing available nginx config files...', 'yellow');
    const listCommand = `ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${user}@${host} "sudo ls -la /etc/nginx/sites-available/ /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | grep blinker"`;
    const listing = execSync(listCommand, { encoding: 'utf8', stdio: 'pipe' });
    if (listing && listing.trim()) {
      log(listing, 'cyan');
    }
  } catch (err) {
    // Ignore
  }

  log('\n❌ Configuration file not found in common locations', 'red');
  log('Please check manually on the server', 'yellow');
}

// Main
try {
  const config = getServerConfig();
  const sshKeyPath = getSSHKey();
  
  readNginxConfig(config.host, config.user, sshKeyPath);
  
  // Also check nginx status
  try {
    log('\n📊 Checking nginx status...', 'bright');
    const statusCommand = `ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${config.user}@${config.host} "sudo systemctl status nginx --no-pager | head -20"`;
    const status = execSync(statusCommand, { encoding: 'utf8', stdio: 'pipe' });
    log(status, 'cyan');
  } catch (err) {
    log('Could not get nginx status', 'yellow');
  }

  // Check nginx error logs
  try {
    log('\n📋 Checking recent nginx error logs...', 'bright');
    const logCommand = `ssh -i "${sshKeyPath}" -o BatchMode=yes -o StrictHostKeyChecking=no ${config.user}@${config.host} "sudo tail -50 /var/log/nginx/error.log | grep -i blinker || sudo tail -50 /var/log/nginx/error.log"`;
    const logs = execSync(logCommand, { encoding: 'utf8', stdio: 'pipe' });
    if (logs && logs.trim()) {
      log(logs, 'cyan');
    }
  } catch (err) {
    log('Could not get error logs', 'yellow');
  }

} catch (err) {
  log(`\n❌ Error: ${err.message}`, 'red');
  process.exit(1);
}


