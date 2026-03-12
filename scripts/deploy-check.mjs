import fs from 'fs';
import { execSync } from 'child_process';

const checks = [];

function check(name, fn) {
  try {
    fn();
    checks.push({ name, ok: true });
  } catch (e) {
    checks.push({ name, ok: false, err: String(e.message || e) });
  }
}

check('env example exists', () => fs.accessSync('.env.example'));
check('vercel config exists', () => fs.accessSync('vercel.json'));
check('build passes', () => execSync('npm run build', { stdio: 'pipe' }));
check('topic source exists', () => fs.accessSync('lib/topics.ts'));

const failed = checks.filter((c) => !c.ok);
for (const c of checks) {
  console.log(`${c.ok ? '✅' : '❌'} ${c.name}${c.ok ? '' : ` -> ${c.err}`}`);
}

if (failed.length) {
  process.exit(1);
}

console.log('\nAll deploy checks passed.');
