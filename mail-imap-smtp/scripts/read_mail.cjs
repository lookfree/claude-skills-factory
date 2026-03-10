#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const { join } = require('node:path');
const { createRequire } = require('node:module');

const runtimeRequire = createRequire(
  join(process.env.DEP_MAIL_RUNTIME_DIR || '/opt/dep-mail-runtime', 'package.json'),
);
const { ImapFlow } = runtimeRequire('imapflow');
const { simpleParser } = runtimeRequire('mailparser');

function parseArgs(argv) {
  const options = {
    asset: '',
    mailbox: 'INBOX',
    limit: 10,
    unread: false,
    from: '',
    subject: '',
    since: '',
    uid: 0,
  };

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];
    const next = argv[index + 1];
    switch (token) {
      case '--asset':
        options.asset = next || '';
        index += 1;
        break;
      case '--mailbox':
        options.mailbox = next || 'INBOX';
        index += 1;
        break;
      case '--limit':
        options.limit = Number(next || '10') || 10;
        index += 1;
        break;
      case '--unread':
        options.unread = true;
        break;
      case '--from':
        options.from = next || '';
        index += 1;
        break;
      case '--subject':
        options.subject = next || '';
        index += 1;
        break;
      case '--since':
        options.since = next || '';
        index += 1;
        break;
      case '--uid':
        options.uid = Number(next || '0') || 0;
        index += 1;
        break;
      default:
        throw new Error(`unknown option: ${token}`);
    }
  }

  if (!options.asset) {
    throw new Error('missing --asset <mail-asset-name>');
  }

  return options;
}

function loadEnv(assetName) {
  const script = join(__dirname, 'mail_asset_env.sh');
  const output = execFileSync('bash', [script, assetName], {
    encoding: 'utf8',
    env: { ...process.env },
  });

  const envMap = {};
  for (const rawLine of output.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
    const separator = line.indexOf('=');
    if (separator <= 0) continue;
    const key = line.slice(0, separator);
    let value = line.slice(separator + 1);
    if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1).replace(/'\\''/g, "'");
    }
    envMap[key] = value;
  }
  return envMap;
}

function parseSince(input) {
  if (!input) return null;
  if (/^\d+d$/.test(input)) {
    const days = Number(input.slice(0, -1));
    return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  }
  const date = new Date(input);
  return Number.isNaN(date.getTime()) ? null : date;
}

async function collectMessage(client, uid) {
  const message = await client.fetchOne(uid, {
    uid: true,
    envelope: true,
    flags: true,
    internalDate: true,
    source: true,
  });
  if (!message) return null;

  const parsed = await simpleParser(message.source);
  return {
    uid: message.uid,
    subject: parsed.subject || message.envelope?.subject || '',
    from: parsed.from?.text || message.envelope?.from?.map((item) => item.address || item.name).join(', ') || '',
    to: parsed.to?.text || '',
    date: (parsed.date || message.internalDate || new Date()).toISOString(),
    unread: !message.flags?.has('\\Seen'),
    preview: (parsed.text || parsed.html || '').trim().slice(0, 500),
    text: (parsed.text || '').trim(),
  };
}

async function main() {
  const options = parseArgs(process.argv);
  const envMap = loadEnv(options.asset);

  const client = new ImapFlow({
    host: envMap.MAIL_IMAP_HOST,
    port: Number(envMap.MAIL_IMAP_PORT || '993'),
    secure: envMap.MAIL_SECURE === 'true',
    auth: {
      user: envMap.MAIL_USERNAME,
      pass: envMap.MAIL_SECRET,
    },
  });

  try {
    await client.connect();
    const lock = await client.getMailboxLock(options.mailbox);
    try {
      if (options.uid > 0) {
        const message = await collectMessage(client, options.uid);
        process.stdout.write(JSON.stringify({
          asset: options.asset,
          mailbox: options.mailbox,
          mode: 'message',
          item: message,
        }, null, 2));
        return;
      }

      const searchQuery = {};
      if (options.unread) searchQuery.seen = false;
      if (options.from) searchQuery.from = options.from;
      if (options.subject) searchQuery.subject = options.subject;
      const since = parseSince(options.since);
      if (since) searchQuery.since = since;

      let uids = await client.search(searchQuery, { uid: true });
      uids = [...uids].sort((left, right) => right - left).slice(0, options.limit);
      const items = [];
      for (const uid of uids) {
        const item = await collectMessage(client, uid);
        if (item) items.push(item);
      }

      process.stdout.write(JSON.stringify({
        asset: options.asset,
        mailbox: options.mailbox,
        mode: 'list',
        total: items.length,
        items,
      }, null, 2));
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => {});
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
