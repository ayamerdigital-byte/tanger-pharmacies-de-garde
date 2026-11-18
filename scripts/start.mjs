import { spawn } from 'node:child_process';

const root = new URL('../', import.meta.url);
let syncing = false;
let lastSlot = '';

function casablancaClock() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Casablanca', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date()).map(part => [part.type, part.value]));
  return { key: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}`, hour: Number(parts.hour), minute: Number(parts.minute) };
}

function runSync() {
  if (syncing) return;
  syncing = true;
  const child = spawn(process.execPath, ['scripts/sync-facebook.mjs'], { cwd: root, stdio: 'inherit' });
  child.on('exit', code => { syncing = false; if (code !== 0) console.error(`Facebook sync failed (${code}); previous roster remains available.`); });
  child.on('error', error => { syncing = false; console.error('Facebook sync failed:', error); });
}

const server = spawn(process.execPath, ['dist/server/entry.mjs'], { cwd: root, stdio: 'inherit', env: process.env });
server.on('exit', code => process.exit(code ?? 0));
process.on('SIGINT', () => server.kill('SIGINT'));
process.on('SIGTERM', () => server.kill('SIGTERM'));

runSync();
setInterval(() => {
  const clock = casablancaClock();
  if (clock.hour % 6 === 0 && clock.minute < 5 && clock.key !== lastSlot) {
    lastSlot = clock.key;
    runSync();
  }
}, 60_000).unref();
