#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const { join } = require('node:path');
const { createRequire } = require('node:module');

const runtimeRequire = createRequire(
  join(process.env.DEP_MAIL_RUNTIME_DIR || '/opt/dep-mail-runtime', 'package.json'),
);
const nodemailer = runtimeRequire('nodemailer');

function parseArgs(argv) {
  const options = {
    asset: '',
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    text: '',
    html: '',
  };

  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];
    const next = argv[index + 1];
    switch (token) {
      case '--asset':
        options.asset = next || '';
        index += 1;
        break;
      case '--to':
        options.to = next || '';
        index += 1;
        break;
      case '--cc':
        options.cc = next || '';
        index += 1;
        break;
      case '--bcc':
        options.bcc = next || '';
        index += 1;
        break;
      case '--subject':
        options.subject = next || '';
        index += 1;
        break;
      case '--text':
        options.text = next || '';
        index += 1;
        break;
      case '--html':
        options.html = next || '';
        index += 1;
        break;
      default:
        throw new Error(`unknown option: ${token}`);
    }
  }

  if (!options.asset) throw new Error('missing --asset <mail-asset-name>');
  if (!options.to) throw new Error('missing --to <recipient>');
  if (!options.subject) throw new Error('missing --subject <subject>');
  if (!options.text && !options.html) throw new Error('missing --text or --html');
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

async function main() {
  const options = parseArgs(process.argv);
  const envMap = loadEnv(options.asset);

  const transporter = nodemailer.createTransport({
    host: envMap.MAIL_SMTP_HOST,
    port: Number(envMap.MAIL_SMTP_PORT || (envMap.MAIL_SECURE === 'true' ? '465' : '587')),
    secure: envMap.MAIL_SECURE === 'true',
    auth: {
      user: envMap.MAIL_USERNAME,
      pass: envMap.MAIL_SECRET,
    },
  });

  const result = await transporter.sendMail({
    from: envMap.MAIL_USERNAME,
    to: options.to,
    cc: options.cc || undefined,
    bcc: options.bcc || undefined,
    subject: options.subject,
    text: options.text || undefined,
    html: options.html || undefined,
  });

  process.stdout.write(JSON.stringify({
    asset: options.asset,
    accepted: result.accepted,
    rejected: result.rejected,
    messageId: result.messageId,
    response: result.response,
  }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
